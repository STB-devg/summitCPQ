import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationItem, Option } from '../../models/catalog';

@Component({
  selector: 'app-configuration-builder',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './configuration-builder.html',
  styleUrl: './configuration-builder.scss'
})
export class ConfigurationBuilderComponent {
  private catalogSvc = inject(CatalogService);
  auth = inject(AuthService);

  configurationId = signal<string>('');
  configItems = signal<ConfigurationItem[]>([]);
  optionsMap = signal<Map<number, Option>>(new Map());
  allOptions = signal<Option[]>([]);

  loading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  addItemForm = new FormGroup({
    optionCode: new FormControl('', Validators.required),
    qty: new FormControl(1, [Validators.required, Validators.min(1)]),
    showImageOnQuote: new FormControl(true),
    location: new FormControl('')
  });

  totalCost = computed(() => {
    const items = this.configItems();
    let total = 0;

    for (const item of items) {
      const option = this.optionsMap().get(item.option_id);
      if (option) {
        // In real app, fetch pricing via catalogSvc
        // For now, just count items
      }
    }

    return total;
  });

  constructor() {
    this.initializeConfiguration();
  }

  private async initializeConfiguration() {
    this.loading.set(true);
    this.error.set(null);

    try {
      // Generate a unique configuration ID (in real app, would come from parent/route)
      const configId = `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.configurationId.set(configId);

      // Load all options
      const options = await this.catalogSvc.getEnabledOptions();
      const optionsMap = new Map<number, Option>();
      for (const option of options) {
        optionsMap.set(option.id, option);
      }

      this.allOptions.set(options);
      this.optionsMap.set(optionsMap);

      // Load any existing config items for this configuration
      const items = await this.catalogSvc.getConfigurationItemsByConfigId(configId);
      this.configItems.set(items);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to initialize configuration');
      console.error('Configuration init error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async addItem() {
    if (this.addItemForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    try {
      const formValue = this.addItemForm.value;
      const optionCode = formValue.optionCode!;
      const option = this.allOptions().find(opt => opt.option_code === optionCode);

      if (!option) {
        this.error.set('Option not found');
        return;
      }

      const newItem = await this.catalogSvc.createConfigurationItem({
        option_code: optionCode,
        configuration_id: this.configurationId(),
        option_id: option.id,
        qty: formValue.qty || 1,
        show_image_on_quote: formValue.showImageOnQuote || true,
        location: formValue.location || null
      });

      this.configItems.update(items => [...items, newItem]);
      this.addItemForm.reset({ qty: 1, showImageOnQuote: true });
      this.successMessage.set(`Added ${optionCode} to configuration`);

      setTimeout(() => this.successMessage.set(null), 3000);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to add item');
      console.error('Add item error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async removeItem(itemId: string) {
    if (!confirm('Remove this item from configuration?')) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.catalogSvc.deleteConfigurationItem(itemId);
      this.configItems.update(items => items.filter(item => item.id !== itemId));
      this.successMessage.set('Item removed');
      setTimeout(() => this.successMessage.set(null), 3000);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to remove item');
      console.error('Remove item error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async updateItemQty(itemId: string, newQty: number) {
    if (newQty < 1) return;

    try {
      await this.catalogSvc.updateConfigurationItem(itemId, { qty: newQty });
      this.configItems.update(items =>
        items.map(item => item.id === itemId ? { ...item, qty: newQty } : item)
      );
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to update quantity');
      console.error('Update qty error:', err);
    }
  }

  getOptionForItem(item: ConfigurationItem): Option | undefined {
    return this.optionsMap().get(item.option_id);
  }

  copyConfigId() {
    navigator.clipboard.writeText(this.configurationId()).then(() => {
      this.successMessage.set('Configuration ID copied to clipboard');
      setTimeout(() => this.successMessage.set(null), 2000);
    });
  }
}
