import type { AnalyticsTabMetric } from '@/design-system/primitives';
import type {
  AnalyticsContextMode,
  AnalyticsContextSummaryData,
  RoadConfigurationDTO,
  SeverityDistributionDTO,
  TimeDistributionDTO,
  VehicleDistributionDTO,
  WeatherDistributionDTO,
} from '../types/analytics';

/**
 * Separated Figma reference fixtures for Search (S1 `1:470`), State (S4 `1:1370`),
 * and Road (S5 `1:2850`) analytics contexts.
 *
 * Kept outside production chart and summary components per Phase 3 architectural boundaries.
 */
export const ANALYTICS_CONTEXT_SUMMARY_FIXTURES: Readonly<
  Record<AnalyticsContextMode, AnalyticsContextSummaryData>
> = {
  search: {
    context: 'search',
    parentContext: 'São Paulo',
    secondaryContext: '(trecho)Guarulhos',
    contextTitle: 'Via Dutra',
    contextIndicatorValue: '30',
    totalVictims: 80428,
    totalAccidents: 40846,
  },
  state: {
    context: 'state',
    contextTitle: 'São Paulo',
    contextIndicatorValue: '30',
    totalVictims: 80428,
    totalAccidents: 40846,
  },
  road: {
    context: 'road',
    parentContext: 'São Paulo',
    secondaryContext: '(trecho)Guarulhos',
    contextTitle: 'BR-116',
    contextIndicatorValue: '30',
    totalVictims: 80428,
    totalAccidents: 40846,
  },
};

export const SAMPLE_WEATHER_DISTRIBUTION: readonly WeatherDistributionDTO[] = [
  { weatherCondition: 'Nublado', count: 9820 },
  { weatherCondition: 'Céu Claro', count: 5140 },
  { weatherCondition: 'Sol', count: 10940 },
  { weatherCondition: 'Chuva', count: 3010 },
  { weatherCondition: 'Garoa/Chuvisco', count: 6520 },
  { weatherCondition: 'Nevoeiro/Neblina', count: 8340 },
  { weatherCondition: 'Vento', count: 8290 },
  { weatherCondition: 'Neve', count: 680 },
];

export const SAMPLE_SEVERITY_DISTRIBUTION_BY_METRIC: Readonly<
  Record<AnalyticsTabMetric, readonly SeverityDistributionDTO[]>
> = {
  accidents: [
    { severity: 'Fatal', count: 3124 },
    { severity: 'Grave', count: 10240 },
    { severity: 'Leve', count: 19412 },
    { severity: 'Sem vítimas', count: 8070 },
  ],
  victims: [
    { severity: 'Fatal', count: 5680 },
    { severity: 'Grave', count: 18890 },
    { severity: 'Leve', count: 39450 },
    { severity: 'Sem vítimas', count: 16408 },
  ],
};

/** Exact Figma vehicle counts from `Analytics/Card/Vehicles` (`23:682` / `1:612`). */
export const SAMPLE_VEHICLE_DISTRIBUTION: readonly VehicleDistributionDTO[] = [
  { vehicleType: 'Motocicleta', count: 15000 },
  { vehicleType: 'Automóvel', count: 18000 },
  { vehicleType: 'Caminhão', count: 2500 },
  { vehicleType: 'Bicicleta', count: 600 },
  { vehicleType: 'Carroça-charrete', count: 50 },
];

export const SAMPLE_TIME_DISTRIBUTION_BY_METRIC: Readonly<
  Record<AnalyticsTabMetric, readonly TimeDistributionDTO[]>
> = {
  accidents: [
    { time: '00:00:00', count: 980 },
    { time: '01:00:00', count: 760 },
    { time: '02:00:00', count: 640 },
    { time: '03:00:00', count: 590 },
    { time: '04:00:00', count: 720 },
    { time: '05:00:00', count: 1120 },
    { time: '06:00:00', count: 1840 },
    { time: '07:00:00', count: 2490 },
    { time: '08:00:00', count: 2210 },
    { time: '09:00:00', count: 1930 },
    { time: '10:00:00', count: 1850 },
    { time: '11:00:00', count: 1970 },
    { time: '12:00:00', count: 2040 },
    { time: '13:00:00', count: 2110 },
    { time: '14:00:00', count: 2290 },
    { time: '15:00:00', count: 2450 },
    { time: '16:00:00', count: 2740 },
    { time: '17:00:00', count: 3120 },
    { time: '18:00:00', count: 3340 },
    { time: '19:00:00', count: 2960 },
    { time: '20:00:00', count: 2420 },
    { time: '21:00:00', count: 1890 },
    { time: '22:00:00', count: 1510 },
    { time: '23:00:00', count: 1210 },
  ],
  victims: [
    { time: '00:00:00', count: 1410 },
    { time: '01:00:00', count: 1090 },
    { time: '02:00:00', count: 940 },
    { time: '03:00:00', count: 870 },
    { time: '04:00:00', count: 1020 },
    { time: '05:00:00', count: 1640 },
    { time: '06:00:00', count: 2560 },
    { time: '07:00:00', count: 3420 },
    { time: '08:00:00', count: 3050 },
    { time: '09:00:00', count: 2680 },
    { time: '10:00:00', count: 2590 },
    { time: '11:00:00', count: 2750 },
    { time: '12:00:00', count: 2890 },
    { time: '13:00:00', count: 3010 },
    { time: '14:00:00', count: 3250 },
    { time: '15:00:00', count: 3480 },
    { time: '16:00:00', count: 3890 },
    { time: '17:00:00', count: 4410 },
    { time: '18:00:00', count: 4720 },
    { time: '19:00:00', count: 4190 },
    { time: '20:00:00', count: 3420 },
    { time: '21:00:00', count: 2680 },
    { time: '22:00:00', count: 2150 },
    { time: '23:00:00', count: 1730 },
  ],
};

/** Exact Figma road configuration counts from `Charts/RoadConfigurationDistribution` (`23:226`). */
export const SAMPLE_ROAD_CONFIGURATION_DISTRIBUTION: readonly RoadConfigurationDTO[] =
  [
    { roadConfiguration: 'Simples', count: 2000 },
    { roadConfiguration: 'Dupla', count: 1400 },
    { roadConfiguration: 'Múltipla', count: 2500 },
  ];

