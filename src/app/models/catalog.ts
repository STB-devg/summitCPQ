export interface Option {
  id: number;
  option_code: string;
  description: string;
  series: string | null;
  screen_item: string | null;
  control_type: string | null;
  option_parent: string | null;
  group_name: string | null;
  section: string | null;
  enabled: boolean;
  image_url: string | null;
  show_image: boolean;
  min_qty: number | null;
  max_qty: number | null;
  help_text: string | null;
  sort_order: number | null;
  additional_info_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface OptionPricing {
  option_id: number;
  option_code: string;
  last_cost_date: string | null;
  cost: number | null;
  weight_lbs: number | null;
  hcg: number | null;
  vcg: number | null;
  updated_at: string;
}

export interface OptionQuoteConfig {
  option_id: number;
  option_code: string;
  quote_label: string | null;
  modified_label: string | null;
  strikethrough: boolean;
  font_color: string | null;
  url: string | null;
  list_style_type: string | null;
  margin_left: number | null;
  quote_order: number | null;
  quote_parent: string | null;
  is_header: boolean;
}

export interface ConfigurationItem {
  id: string;
  option_code: string;
  configuration_id: string;
  option_id: number;
  qty: number;
  show_image_on_quote: boolean;
  location: string | null;
  location_other?: string | null;
  created_at: string;
}

export type OptionCreateInput = Omit<Option, 'id' | 'created_at' | 'updated_at'>;
export type OptionUpdateInput = Partial<Omit<Option, 'id' | 'option_code' | 'created_at' | 'updated_at'>>;

export type OptionPricingCreateInput = Omit<OptionPricing, 'updated_at'>;
export type OptionPricingUpdateInput = Partial<Omit<OptionPricing, 'option_id' | 'option_code' | 'updated_at'>>;

export type OptionQuoteConfigCreateInput = Omit<OptionQuoteConfig, 'updated_at' | 'created_at'>;
export type OptionQuoteConfigUpdateInput = Partial<Omit<OptionQuoteConfig, 'option_id' | 'option_code' | 'updated_at' | 'created_at'>>;

export type ConfigurationItemCreateInput = Omit<ConfigurationItem, 'id' | 'created_at'>;
export type ConfigurationItemUpdateInput = Partial<Omit<ConfigurationItem, 'id' | 'created_at'>>;
