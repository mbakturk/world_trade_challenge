export const MapEventConst = {
  EXPORT: 'export',
  IMPORT: 'import',
  NOTE: 'note',
  DELETE: 'delete'
};

export interface MapEvent {
  countryCode?: string;
  operation: 'import' | 'export' | 'note' | 'delete';
}
