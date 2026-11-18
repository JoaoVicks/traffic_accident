import type { VehicleChoiceOption } from '@/design-system/primitives';

export type ActiveSearchPopover = 'search' | 'filter' | null;

export interface SearchStateOption {
  id: string;
  label: string;
  accidentCount: string;
  keywords: readonly string[];
}

export interface SearchMunicipalityOption {
  id: string;
  label: string;
  accidentCount: string;
  keywords: readonly string[];
}

export interface SearchRoadStretchOption {
  id: string;
  stateLabel: string;
  municipalityLabel: string;
  roadCodeLabel: string;
  accidentCount: string;
  keywords: readonly string[];
}

export interface SearchRoadOption {
  id: string;
  title: string;
  codeLabel: string;
  stretchSummaryLabel: string;
  wholeRoadLabel: string;
  wholeRoadAccidentCount: string;
  stretches: readonly SearchRoadStretchOption[];
  keywords: readonly string[];
}

export interface SearchGroupedCatalog {
  states: readonly SearchStateOption[];
  municipalities: readonly SearchMunicipalityOption[];
  roads: readonly SearchRoadOption[];
}

export type SearchSelectionCategory =
  | 'state'
  | 'municipality'
  | 'road-whole'
  | 'road-stretch';

export interface SearchSelectedItem {
  id: string;
  category: SearchSelectionCategory;
  queryText: string;
  displayLabel: string;
}

export type FilterTimeMode = 'year' | 'period' | null;

export interface WorkspaceFilterState {
  timeMode: FilterTimeMode;
  year: string;
  startDate: string;
  endDate: string;
  selectedVehicles: readonly VehicleChoiceOption[];
  severityIndex: number;
}

