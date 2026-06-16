import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import {
  Option,
  OptionPricing,
  OptionQuoteConfig,
  ConfigurationItem,
  OptionCreateInput,
  OptionUpdateInput,
  OptionPricingCreateInput,
  OptionPricingUpdateInput,
  OptionQuoteConfigCreateInput,
  OptionQuoteConfigUpdateInput,
  ConfigurationItemCreateInput,
  ConfigurationItemUpdateInput
} from '../models/catalog';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // ============ OPTIONS CRUD ============

  async getOptions(): Promise<Option[]> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async getOptionById(id: number): Promise<Option | null> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async getOptionByCode(optionCode: string): Promise<Option | null> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*')
      .eq('option_code', optionCode)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async getOptionsByGroup(groupName: string): Promise<Option[]> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*')
      .eq('group_name', groupName)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getOptionsBySection(section: string): Promise<Option[]> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*')
      .eq('section', section)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getEnabledOptions(): Promise<Option[]> {
    const { data, error } = await this.supabase
      .from('options')
      .select('*')
      .eq('enabled', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async createOption(input: OptionCreateInput): Promise<Option> {
    const { data, error } = await this.supabase
      .from('options')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOption(id: number, input: OptionUpdateInput): Promise<Option> {
    const { data, error } = await this.supabase
      .from('options')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteOption(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('options')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ============ OPTION PRICING CRUD ============

  async getPricing(): Promise<OptionPricing[]> {
    const { data, error } = await this.supabase
      .from('option_pricing')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async getPricingByOptionId(optionId: number): Promise<OptionPricing | null> {
    const { data, error } = await this.supabase
      .from('option_pricing')
      .select('*')
      .eq('option_id', optionId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async getPricingByOptionCode(optionCode: string): Promise<OptionPricing | null> {
    const { data, error } = await this.supabase
      .from('option_pricing')
      .select('*')
      .eq('option_code', optionCode)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async createPricing(input: OptionPricingCreateInput): Promise<OptionPricing> {
    const { data, error } = await this.supabase
      .from('option_pricing')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePricing(optionId: number, input: OptionPricingUpdateInput): Promise<OptionPricing> {
    const { data, error } = await this.supabase
      .from('option_pricing')
      .update(input)
      .eq('option_id', optionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deletePricing(optionId: number): Promise<void> {
    const { error } = await this.supabase
      .from('option_pricing')
      .delete()
      .eq('option_id', optionId);

    if (error) throw error;
  }

  // ============ OPTION QUOTE CONFIG CRUD ============

  async getQuoteConfigs(): Promise<OptionQuoteConfig[]> {
    const { data, error } = await this.supabase
      .from('option_quote_config')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async getQuoteConfigByOptionId(optionId: number): Promise<OptionQuoteConfig | null> {
    const { data, error } = await this.supabase
      .from('option_quote_config')
      .select('*')
      .eq('option_id', optionId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async getQuoteConfigByOptionCode(optionCode: string): Promise<OptionQuoteConfig | null> {
    const { data, error } = await this.supabase
      .from('option_quote_config')
      .select('*')
      .eq('option_code', optionCode)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async createQuoteConfig(input: OptionQuoteConfigCreateInput): Promise<OptionQuoteConfig> {
    const { data, error } = await this.supabase
      .from('option_quote_config')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateQuoteConfig(optionId: number, input: OptionQuoteConfigUpdateInput): Promise<OptionQuoteConfig> {
    const { data, error } = await this.supabase
      .from('option_quote_config')
      .update(input)
      .eq('option_id', optionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteQuoteConfig(optionId: number): Promise<void> {
    const { error } = await this.supabase
      .from('option_quote_config')
      .delete()
      .eq('option_id', optionId);

    if (error) throw error;
  }

  // ============ CONFIGURATION ITEMS CRUD ============

  async getConfigurationItems(): Promise<ConfigurationItem[]> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async getConfigurationItemById(id: string): Promise<ConfigurationItem | null> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async getConfigurationItemsByConfigId(configurationId: string): Promise<ConfigurationItem[]> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .select('*')
      .eq('configuration_id', configurationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getConfigurationItemsByOptionCode(optionCode: string): Promise<ConfigurationItem[]> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .select('*')
      .eq('option_code', optionCode);

    if (error) throw error;
    return data || [];
  }

  async createConfigurationItem(input: ConfigurationItemCreateInput): Promise<ConfigurationItem> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async createConfigurationItems(items: ConfigurationItemCreateInput[]): Promise<ConfigurationItem[]> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .insert(items)
      .select();

    if (error) throw error;
    return data || [];
  }

  async updateConfigurationItem(id: string, input: ConfigurationItemUpdateInput): Promise<ConfigurationItem> {
    const { data, error } = await this.supabase
      .from('configuration_items')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteConfigurationItem(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('configuration_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async deleteConfigurationItemsByConfigId(configurationId: string): Promise<void> {
    const { error } = await this.supabase
      .from('configuration_items')
      .delete()
      .eq('configuration_id', configurationId);

    if (error) throw error;
  }

  // ============ BATCH & JOINED QUERIES ============

  async getOptionWithPricingAndQuoteConfig(optionCode: string): Promise<{
    option: Option;
    pricing: OptionPricing | null;
    quoteConfig: OptionQuoteConfig | null;
  } | null> {
    const option = await this.getOptionByCode(optionCode);
    if (!option) return null;

    const [pricing, quoteConfig] = await Promise.all([
      this.getPricingByOptionId(option.id),
      this.getQuoteConfigByOptionId(option.id)
    ]);

    return { option, pricing, quoteConfig };
  }

  async getOptionsWithPricingAndQuoteConfig(): Promise<Array<{
    option: Option;
    pricing: OptionPricing | null;
    quoteConfig: OptionQuoteConfig | null;
  }>> {
    const options = await this.getOptions();

    const results = await Promise.all(
      options.map(async (option) => {
        const [pricing, quoteConfig] = await Promise.all([
          this.getPricingByOptionId(option.id),
          this.getQuoteConfigByOptionId(option.id)
        ]);

        return { option, pricing, quoteConfig };
      })
    );

    return results;
  }
}
