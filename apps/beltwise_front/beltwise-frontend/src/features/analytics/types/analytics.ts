/** Geographic scope supported by `AnalyticFilterDTO`. */
export type AnalyticsSearchType = 'STATES' | 'CITIES' | 'ROADS';

/** Metric toggle supported by `/analytics/severity-distribution/{type}` and `/analytics/time-distribution/{type}`. */
export type AnalyticsMetricType = 'ACCIDENT' | 'VICTIM';

/** Frontend tab metric used by `AnalyticsTabs` in the design system. */
export type AnalyticsTabValue = 'accidents' | 'victims';

/** Query parameters accepted by `AnalyticsController` (`AnalyticFilterDTO`). */
export interface AnalyticFilterParams {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  vehicleType?: string;
  accidentClassification?: string;
  searchType?: AnalyticsSearchType;
  searchId?: string;
}

/** Response DTO from `GET /analytics/summary`. */
export interface AccidentSummaryDTO {
  totalAccident: number;
  totalVictims: number;
}

/** Response DTO item from `GET /analytics/severity-distribution/{type}`. */
export interface SeverityDistributionDTO {
  severity: string;
  count: number;
}

/** Response DTO item from `GET /analytics/vehicle-distribution`. */
export interface VehicleDistributionDTO {
  vehicleType: string;
  count: number;
}

/** Response DTO item from `GET /analytics/weather-distribution`. */
export interface WeatherDistributionDTO {
  weatherCondition: string;
  count: number;
}

/** Response DTO item from `GET /analytics/time-distribution/{type}`. */
export interface TimeDistributionDTO {
  /** ISO `LocalTime` string from Spring/Jackson (e.g. `"14:00:00"`), or numeric tuple fallback. */
  time: string | readonly [number, number, number?];
  count: number;
}

/** Normalized weather datum rendered by `WeatherDistributionChart`. */
export type WeatherCategoryKey =
  | 'nublado'
  | 'ceuClaro'
  | 'sol'
  | 'chuva'
  | 'garoa'
  | 'nevoeiro'
  | 'vento'
  | 'neve';

export interface WeatherChartDatum {
  key: WeatherCategoryKey;
  label: string;
  rawCondition: string;
  count: number;
}

/** Normalized severity datum rendered by `SeverityDistributionChart`. */
export type SeverityCategoryKey = 'fatal' | 'grave' | 'leve' | 'semVitimas';

export interface SeverityChartDatum {
  key: SeverityCategoryKey;
  label: string;
  rawSeverity: string;
  count: number;
  percentage: number;
  fill: string;
}

/** Normalized vehicle category datum rendered by `VehicleDistributionChart`. */
export type VehicleCategoryKey =
  | 'moto'
  | 'carro'
  | 'caminhao'
  | 'bicicleta'
  | 'cavalo'
  | 'outros';

export interface VehicleChartDatum {
  key: VehicleCategoryKey;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

/** Normalized 24-hour bucket rendered by `HourlyDistributionChart`. */
export interface HourlyChartDatum {
  hour: number;
  hourLabel: string;
  count: number;
}

/** Input DTO item for `RoadConfigurationChart` (`Analytics/Card/RoadConfiguration` `23:856`). */
export interface RoadConfigurationDTO {
  roadConfiguration: string;
  count: number;
}

/** Normalized road configuration category key (`Charts/RoadConfigurationDistribution` `23:226`). */
export type RoadConfigurationCategoryKey = 'unica' | 'dupla' | 'multipla';

/** Normalized road configuration datum rendered by `RoadConfigurationChart`. */
export interface RoadConfigurationChartDatum {
  key: RoadConfigurationCategoryKey;
  label: string;
  rawConfiguration: string;
  count: number;
  percentage: number;
}

/** Active geographic context variant for the analytics workspace (`Search` S1, `State` S4, `Road` S5). */
export type AnalyticsContextMode = 'search' | 'state' | 'road';

/** Structured summary payload for `AnalyticsContextSummary` (`23:347`, `23:397`, `23:451`). */
export interface AnalyticsContextSummaryData {
  context: AnalyticsContextMode;
  parentContext?: string;
  secondaryContext?: string;
  contextTitle: string;
  contextIndicatorValue: string | number;
  totalVictims: number;
  totalAccidents: number;
}


