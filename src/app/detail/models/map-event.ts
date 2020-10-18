export interface MapEvent {
  countryCode?: string;
  operation: 'import' | 'export' | 'note' | 'delete';
}
