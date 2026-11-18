import type { VehicleChoiceOption } from '@/design-system/primitives';
import type {
  SearchGroupedCatalog,
  WorkspaceFilterState,
} from '../types/search';

/**
 * Static Figma reference dataset (`Search/SearchPattern/Results` `25:234` and
 * `Search/SearchPattern/RoadOptionsExpanded` `25:390`).
 * Kept separate from UI components per Phase 2 architectural constraints.
 */
export const DEFAULT_SEARCH_QUERY = 'São';

export const SEARCH_REFERENCE_CATALOG: SearchGroupedCatalog = {
  states: [
    {
      id: 'state-sp',
      label: 'São Paulo',
      accidentCount: '100.000',
      keywords: ['sao', 'são', 'sao paulo', 'são paulo', 'sp'],
    },
  ],
  municipalities: [
    {
      id: 'city-sao-paulo',
      label: 'São Paulo, sp',
      accidentCount: '100.000',
      keywords: ['sao', 'são', 'sao paulo', 'são paulo', 'sp'],
    },
    {
      id: 'city-sao-jose-dos-campos',
      label: 'São Jo´se dos Campos, sp',
      accidentCount: '100.000',
      keywords: [
        'sao',
        'são',
        'sao jose dos campos',
        'são josé dos campos',
        'são jo´se dos campos',
        'sp',
      ],
    },
    {
      id: 'city-sao-vicente',
      label: 'São Vicente, sp',
      accidentCount: '100.000',
      keywords: ['sao', 'são', 'sao vicente', 'são vicente', 'sp'],
    },
  ],
  roads: [
    {
      id: 'road-br-116-dutra',
      title: 'Br-116',
      codeLabel: '(Dutra)',
      stretchSummaryLabel: '3 trechos',
      wholeRoadLabel: 'selecionar o trecho inteiro',
      wholeRoadAccidentCount: '100.000',
      keywords: [
        'sao',
        'são',
        'dutra',
        'br-116',
        'br 116',
        'guarulhos',
        'aruja',
        'arujá',
        'diadema',
      ],
      stretches: [
        {
          id: 'stretch-guarulhos-br-116',
          stateLabel: 'São paulo',
          municipalityLabel: 'Guarulhos',
          roadCodeLabel: '(br 116)',
          accidentCount: '21.500',
          keywords: ['sao', 'são', 'guarulhos', 'dutra', 'br 116', 'br-116'],
        },
        {
          id: 'stretch-aruja-br-116',
          stateLabel: 'São paulo',
          municipalityLabel: 'Arujá',
          roadCodeLabel: '(br 116)',
          accidentCount: '22.300',
          keywords: ['sao', 'são', 'aruja', 'arujá', 'dutra', 'br 116', 'br-116'],
        },
        {
          id: 'stretch-diadema-br-116',
          stateLabel: 'São paulo',
          municipalityLabel: 'Diadema',
          roadCodeLabel: '(br 116)',
          accidentCount: '26.750',
          keywords: ['sao', 'são', 'diadema', 'dutra', 'br 116', 'br-116'],
        },
      ],
    },
  ],
};

export const FILTER_YEAR_OPTIONS: readonly string[] = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
];

export const FILTER_VEHICLE_ORDER: readonly VehicleChoiceOption[] = [
  'cars',
  'trucks',
  'motorcycles',
  'bicycles',
  'buses',
];

/**
 * Severity threshold labels mapped to the 4 segments of `SeveritySlider` (`21:346`).
 * Segment 0 preserves the Figma specimen text `"grave"` (`25:477`).
 */
export const FILTER_SEVERITY_LABELS: readonly [string, string, string, string] = [
  'grave',
  'muito grave',
  'moderado',
  'leve',
];

/**
 * Initial filter state matching `Filters/FilterPattern` (`25:485` / `1:1291`).
 */
export const DEFAULT_WORKSPACE_FILTER_STATE: WorkspaceFilterState = {
  timeMode: null,
  year: '2026',
  startDate: '22/09/2026',
  endDate: '22/09/2028',
  selectedVehicles: ['cars'],
  severityIndex: 0,
};

