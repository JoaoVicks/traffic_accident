import type { RankingTabCategory } from '@/design-system/primitives';

/** Supported ranking sort metrics evidenced in Figma S9 (`1:2128`) and S10 (`1:2447`). */
export type RankingMetricId =
  | 'most-accidents'
  | 'least-accidents'
  | 'most-fatal-accidents'
  | 'least-fatal-accidents'
  | 'most-deaths'
  | 'least-deaths';

export interface RankingMetricOption {
  id: RankingMetricId;
  /** Label shown in the closed/open pill trigger (`"Com mais acidentes"`). */
  triggerLabel: string;
  /** Label shown inside the dropdown menu (`1:2605`). */
  menuLabel: string;
  /** Explanatory copy shown in the inline info disclosure (`1:2445`). */
  description: string;
}

export interface RankingEntry {
  id: string;
  position: number;
  name: string;
  value: number;
}

export type RankingCatalogByCategory = Readonly<
  Record<RankingTabCategory, Readonly<Record<RankingMetricId, readonly RankingEntry[]>>>
>;

