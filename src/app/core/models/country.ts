export type Operation = 'import' | 'export';

export interface Country {
  code: string;
  name: string;
  continent: string;
  note?: string[];
  operation?: Operation;
  flag: string;
}

export interface CountryDict {
  [key: string]: Country
}
