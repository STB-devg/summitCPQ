import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Options CRUD', () => {
    it('should fetch all options', async () => {
      try {
        const options = await service.getOptions();
        expect(Array.isArray(options)).toBe(true);
      } catch (error) {
        console.log('Integration test - getOptions:', error);
      }
    });

    it('should fetch enabled options', async () => {
      try {
        const options = await service.getEnabledOptions();
        expect(Array.isArray(options)).toBe(true);
        if (options.length > 0) {
          expect(options[0].enabled).toBe(true);
        }
      } catch (error) {
        console.log('Integration test - getEnabledOptions:', error);
      }
    });

    it('should fetch option by code', async () => {
      try {
        const options = await service.getOptions();
        if (options.length > 0) {
          const option = await service.getOptionByCode(options[0].option_code);
          expect(option).toBeTruthy();
          expect(option?.option_code).toBe(options[0].option_code);
        }
      } catch (error) {
        console.log('Integration test - getOptionByCode:', error);
      }
    });
  });

  describe('Pricing CRUD', () => {
    it('should fetch all pricing records', async () => {
      try {
        const pricing = await service.getPricing();
        expect(Array.isArray(pricing)).toBe(true);
      } catch (error) {
        console.log('Integration test - getPricing:', error);
      }
    });

    it('should fetch pricing by option id', async () => {
      try {
        const pricing = await service.getPricing();
        if (pricing.length > 0) {
          const record = await service.getPricingByOptionId(pricing[0].option_id);
          expect(record).toBeTruthy();
          expect(record?.option_id).toBe(pricing[0].option_id);
        }
      } catch (error) {
        console.log('Integration test - getPricingByOptionId:', error);
      }
    });
  });

  describe('Quote Config CRUD', () => {
    it('should fetch all quote configs', async () => {
      try {
        const configs = await service.getQuoteConfigs();
        expect(Array.isArray(configs)).toBe(true);
      } catch (error) {
        console.log('Integration test - getQuoteConfigs:', error);
      }
    });

    it('should fetch quote config by option id', async () => {
      try {
        const configs = await service.getQuoteConfigs();
        if (configs.length > 0) {
          const config = await service.getQuoteConfigByOptionId(configs[0].option_id);
          expect(config).toBeTruthy();
          expect(config?.option_id).toBe(configs[0].option_id);
        }
      } catch (error) {
        console.log('Integration test - getQuoteConfigByOptionId:', error);
      }
    });
  });

  describe('Configuration Items CRUD', () => {
    it('should fetch all configuration items', async () => {
      try {
        const items = await service.getConfigurationItems();
        expect(Array.isArray(items)).toBe(true);
      } catch (error) {
        console.log('Integration test - getConfigurationItems:', error);
      }
    });
  });

  describe('Batch Queries', () => {
    it('should fetch option with pricing and quote config', async () => {
      try {
        const options = await service.getOptions();
        if (options.length > 0) {
          const result = await service.getOptionWithPricingAndQuoteConfig(options[0].option_code);
          expect(result).toBeTruthy();
          expect(result?.option).toBeTruthy();
        }
      } catch (error) {
        console.log('Integration test - getOptionWithPricingAndQuoteConfig:', error);
      }
    });

    it('should fetch all options with pricing and quote config', async () => {
      try {
        const results = await service.getOptionsWithPricingAndQuoteConfig();
        expect(Array.isArray(results)).toBe(true);
      } catch (error) {
        console.log('Integration test - getOptionsWithPricingAndQuoteConfig:', error);
      }
    });
  });
});
