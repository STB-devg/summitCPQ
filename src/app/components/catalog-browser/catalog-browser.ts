import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { AuthService } from '../../services/auth.service';
import { Option, OptionPricing, OptionQuoteConfig } from '../../models/catalog';

@Component({
  selector: 'app-catalog-browser',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-browser.html',
  styleUrl: './catalog-browser.scss'
})
export class CatalogBrowserComponent {
  private catalogSvc = inject(CatalogService);
  auth = inject(AuthService);

  options = signal<Option[]>([]);
  pricingMap = signal<Map<number, OptionPricing>>(new Map());
  configMap = signal<Map<number, OptionQuoteConfig>>(new Map());

  loading = signal(false);
  error = signal<string | null>(null);

  searchControl = new FormControl('');
  filterControl = new FormControl('enabled');

  filteredOptions = computed(() => {
    const search = this.searchControl.value?.toLowerCase() || '';
    const filter = this.filterControl.value;
    let items = this.options();

    if (filter === 'enabled') {
      items = items.filter(opt => opt.enabled);
    }

    if (search) {
      items = items.filter(opt =>
        opt.option_code.toLowerCase().includes(search) ||
        opt.description.toLowerCase().includes(search) ||
        opt.group_name?.toLowerCase().includes(search)
      );
    }

    return items;
  });

  constructor() {
    this.loadCatalog();
  }

  private async loadCatalog() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const [optionsData, configurationsData] = await Promise.all([
        this.catalogSvc.getOptions(),
        this.catalogSvc.getQuoteConfigs(),
      ]);

      // Load pricing for each option
      const pricingMap = new Map<number, OptionPricing>();
      const configMap = new Map<number, OptionQuoteConfig>();

      for (const option of optionsData) {
        const pricing = await this.catalogSvc.getPricingByOptionId(option.id);
        if (pricing) {
          pricingMap.set(option.id, pricing);
        }
      }

      for (const config of configurationsData) {
        configMap.set(config.option_id, config);
      }

      this.options.set(optionsData);
      this.pricingMap.set(pricingMap);
      this.configMap.set(configMap);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to load catalog');
      console.error('Catalog load error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  getPricing(optionId: number): OptionPricing | undefined {
    return this.pricingMap().get(optionId);
  }

  getQuoteConfig(optionId: number): OptionQuoteConfig | undefined {
    return this.configMap().get(optionId);
  }

  refreshCatalog() {
    this.loadCatalog();
  }
}
