import type {
  RankingCatalogByCategory,
  RankingEntry,
  RankingMetricId,
  RankingMetricOption,
} from '../types/ranking';

/**
 * Metric options evidenced in Figma S9 (`1:2128`) and S10 (`1:2447` / `1:2605`).
 * Descriptions provide domain-appropriate copy for the inline info disclosure (`1:2445`).
 */
export const RANKING_METRIC_OPTIONS: readonly RankingMetricOption[] = [
  {
    id: 'most-accidents',
    triggerLabel: 'Com mais acidentes',
    menuLabel: 'com mais acidentes',
    description:
      'Ordena as localidades pelo maior número total de sinistros registrados no recorte atual.',
  },
  {
    id: 'least-accidents',
    triggerLabel: 'Com menos acidentes',
    menuLabel: 'com menos acidentes',
    description:
      'Ordena as localidades pelo menor número total de sinistros registrados no recorte atual.',
  },
  {
    id: 'most-fatal-accidents',
    triggerLabel: 'Com acidentes mais fatais',
    menuLabel: 'com acidentes mais fatais',
    description:
      'Prioriza localidades com maior quantidade de ocorrências que resultaram em vítimas fatais.',
  },
  {
    id: 'least-fatal-accidents',
    triggerLabel: 'Com acidentes menos fatais',
    menuLabel: 'com acidentes menos fatais',
    description:
      'Prioriza localidades com menor quantidade de ocorrências com vítimas fatais registradas.',
  },
  {
    id: 'most-deaths',
    triggerLabel: 'Com mais mortos',
    menuLabel: 'com mais mortos',
    description:
      'Ordena pelo maior total acumulado de óbitos decorrentes de sinistros de trânsito.',
  },
  {
    id: 'least-deaths',
    triggerLabel: 'Com menos mortos',
    menuLabel: 'com menos mortos',
    description:
      'Ordena pelo menor total acumulado de óbitos decorrentes de sinistros de trânsito.',
  },
];

export const DEFAULT_RANKING_METRIC_ID: RankingMetricId = 'most-accidents';

interface BaseEntityRow {
  id: string;
  name: string;
  accidents: number;
  fatalAccidents: number;
  deaths: number;
}

const CITY_BASE_ROWS: readonly BaseEntityRow[] = [
  { id: 'city-guarulhos', name: 'Guarulhos', accidents: 25000, fatalAccidents: 1420, deaths: 1680 },
  { id: 'city-suzano', name: 'Suzano', accidents: 21450, fatalAccidents: 1180, deaths: 1390 },
  { id: 'city-sao-paulo', name: 'São Paulo', accidents: 19800, fatalAccidents: 1110, deaths: 1320 },
  { id: 'city-campinas', name: 'Campinas', accidents: 17420, fatalAccidents: 960, deaths: 1140 },
  { id: 'city-sao-jose-campos', name: 'São José dos Campos', accidents: 15890, fatalAccidents: 840, deaths: 990 },
  { id: 'city-ribeirao-preto', name: 'Ribeirão Preto', accidents: 14210, fatalAccidents: 790, deaths: 910 },
  { id: 'city-sorocaba', name: 'Sorocaba', accidents: 12940, fatalAccidents: 710, deaths: 830 },
  { id: 'city-osasco', name: 'Osasco', accidents: 11680, fatalAccidents: 640, deaths: 760 },
  { id: 'city-santo-andre', name: 'Santo André', accidents: 10540, fatalAccidents: 580, deaths: 690 },
  { id: 'city-diadema', name: 'Diadema', accidents: 9420, fatalAccidents: 520, deaths: 615 },
  { id: 'city-aruja', name: 'Arujá', accidents: 8310, fatalAccidents: 465, deaths: 540 },
  { id: 'city-sao-vicente', name: 'São Vicente', accidents: 7190, fatalAccidents: 390, deaths: 460 },
  { id: 'city-jundiai', name: 'Jundiaí', accidents: 6480, fatalAccidents: 340, deaths: 405 },
  { id: 'city-bauru', name: 'Bauru', accidents: 5720, fatalAccidents: 295, deaths: 350 },
  { id: 'city-piracicaba', name: 'Piracicaba', accidents: 4910, fatalAccidents: 245, deaths: 290 },
];

const STATE_BASE_ROWS: readonly BaseEntityRow[] = [
  { id: 'state-sp', name: 'São Paulo', accidents: 40846, fatalAccidents: 3124, deaths: 3680 },
  { id: 'state-mg', name: 'Minas Gerais', accidents: 36420, fatalAccidents: 2890, deaths: 3410 },
  { id: 'state-pr', name: 'Paraná', accidents: 29850, fatalAccidents: 2240, deaths: 2650 },
  { id: 'state-sc', name: 'Santa Catarina', accidents: 26410, fatalAccidents: 1840, deaths: 2150 },
  { id: 'state-rj', name: 'Rio de Janeiro', accidents: 23190, fatalAccidents: 1710, deaths: 1980 },
  { id: 'state-rs', name: 'Rio Grande do Sul', accidents: 20480, fatalAccidents: 1490, deaths: 1740 },
  { id: 'state-ba', name: 'Bahia', accidents: 18320, fatalAccidents: 1420, deaths: 1690 },
  { id: 'state-go', name: 'Goiás', accidents: 15940, fatalAccidents: 1180, deaths: 1380 },
  { id: 'state-pe', name: 'Pernambuco', accidents: 13210, fatalAccidents: 990, deaths: 1160 },
  { id: 'state-es', name: 'Espírito Santo', accidents: 11480, fatalAccidents: 840, deaths: 970 },
  { id: 'state-ce', name: 'Ceará', accidents: 9840, fatalAccidents: 760, deaths: 890 },
  { id: 'state-mt', name: 'Mato Grosso', accidents: 8120, fatalAccidents: 690, deaths: 820 },
  { id: 'state-ms', name: 'Mato Grosso do Sul', accidents: 6750, fatalAccidents: 540, deaths: 630 },
  { id: 'state-pa', name: 'Pará', accidents: 5420, fatalAccidents: 460, deaths: 545 },
  { id: 'state-df', name: 'Distrito Federal', accidents: 4290, fatalAccidents: 310, deaths: 360 },
];

const ROAD_BASE_ROWS: readonly BaseEntityRow[] = [
  { id: 'road-br-116', name: 'BR-116 (Dutra)', accidents: 18450, fatalAccidents: 1340, deaths: 1590 },
  { id: 'road-br-101', name: 'BR-101', accidents: 16920, fatalAccidents: 1210, deaths: 1430 },
  { id: 'road-br-381', name: 'BR-381 (Fernão Dias)', accidents: 14380, fatalAccidents: 1090, deaths: 1295 },
  { id: 'road-br-040', name: 'BR-040', accidents: 12640, fatalAccidents: 950, deaths: 1120 },
  { id: 'road-br-277', name: 'BR-277', accidents: 10890, fatalAccidents: 810, deaths: 945 },
  { id: 'road-br-153', name: 'BR-153', accidents: 9740, fatalAccidents: 740, deaths: 880 },
  { id: 'road-br-376', name: 'BR-376', accidents: 8620, fatalAccidents: 630, deaths: 745 },
  { id: 'road-br-163', name: 'BR-163', accidents: 7510, fatalAccidents: 590, deaths: 705 },
  { id: 'road-br-282', name: 'BR-282', accidents: 6430, fatalAccidents: 495, deaths: 580 },
  { id: 'road-br-060', name: 'BR-060', accidents: 5390, fatalAccidents: 410, deaths: 485 },
  { id: 'road-br-050', name: 'BR-050', accidents: 4620, fatalAccidents: 355, deaths: 415 },
  { id: 'road-br-470', name: 'BR-470', accidents: 3980, fatalAccidents: 310, deaths: 365 },
  { id: 'road-br-262', name: 'BR-262', accidents: 3410, fatalAccidents: 270, deaths: 320 },
  { id: 'road-br-364', name: 'BR-364', accidents: 2890, fatalAccidents: 230, deaths: 275 },
  { id: 'road-br-230', name: 'BR-230', accidents: 2140, fatalAccidents: 175, deaths: 210 },
];

function buildMetricEntries(
  rows: readonly BaseEntityRow[],
  metricId: RankingMetricId,
): readonly RankingEntry[] {
  const selector = (row: BaseEntityRow): number => {
    switch (metricId) {
      case 'most-accidents':
      case 'least-accidents':
        return row.accidents;
      case 'most-fatal-accidents':
      case 'least-fatal-accidents':
        return row.fatalAccidents;
      case 'most-deaths':
      case 'least-deaths':
        return row.deaths;
    }
  };

  const ascending =
    metricId === 'least-accidents' ||
    metricId === 'least-fatal-accidents' ||
    metricId === 'least-deaths';

  return [...rows]
    .sort((a, b) =>
      ascending ? selector(a) - selector(b) : selector(b) - selector(a),
    )
    .map((row, index) => ({
      id: `${row.id}-${metricId}`,
      position: index + 1,
      name: row.name,
      value: selector(row),
    }));
}

function buildCategoryCatalog(
  rows: readonly BaseEntityRow[],
): Readonly<Record<RankingMetricId, readonly RankingEntry[]>> {
  return {
    'most-accidents': buildMetricEntries(rows, 'most-accidents'),
    'least-accidents': buildMetricEntries(rows, 'least-accidents'),
    'most-fatal-accidents': buildMetricEntries(rows, 'most-fatal-accidents'),
    'least-fatal-accidents': buildMetricEntries(rows, 'least-fatal-accidents'),
    'most-deaths': buildMetricEntries(rows, 'most-deaths'),
    'least-deaths': buildMetricEntries(rows, 'least-deaths'),
  };
}

/**
 * Representative local ranking fixtures separated from production components.
 * Supports all 3 tabs (`cities`, `states`, `roads`) and all 6 Figma metrics (`1:2128` / `1:2447`).
 */
export const RANKING_REFERENCE_CATALOG: RankingCatalogByCategory = {
  cities: buildCategoryCatalog(CITY_BASE_ROWS),
  states: buildCategoryCatalog(STATE_BASE_ROWS),
  roads: buildCategoryCatalog(ROAD_BASE_ROWS),
};

