export interface Account {
  Name: string;
}

export interface Opportunity {
  Id: string;
  Name: string;
  StageName: string;
  Amount: number | null;
  CloseDate: string;
  Account: Account | null;
}

export interface OpportunityResponse {
  records: Opportunity[];
  totalSize: number;
}
