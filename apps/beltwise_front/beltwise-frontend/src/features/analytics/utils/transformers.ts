import type {
  AnalyticsMetricType,
  AnalyticsTabValue,
  HourlyChartDatum,
  RoadConfigurationCategoryKey,
  RoadConfigurationChartDatum,
  RoadConfigurationDTO,
  SeverityCategoryKey,
  SeverityChartDatum,
  SeverityDistributionDTO,
  TimeDistributionDTO,
  VehicleCategoryKey,
  VehicleChartDatum,
  VehicleDistributionDTO,
  WeatherCategoryKey,
  WeatherChartDatum,
  WeatherDistributionDTO,
} from '../types/analytics';

function normalizeLookupKey(value: string | null | undefined): string {
  return (value ?? '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Converts frontend `AnalyticsTabs` value to backend path enum. */
export function tabValueToMetricType(tab: AnalyticsTabValue): AnalyticsMetricType {
  return tab === 'victims' ? 'VICTIM' : 'ACCIDENT';
}

/** Formats integer counts using pt-BR thousands separators (e.g., `40.846`). */
export function formatMetricCount(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(Math.round(value));
}

const WEATHER_ORDER: readonly {
  key: WeatherCategoryKey;
  label: string;
  rawCondition: string;
  aliases: readonly string[];
}[] = [
  {
    key: 'nublado',
    label: 'Nublado',
    rawCondition: 'Nublado',
    aliases: ['nublado'],
  },
  {
    key: 'ceuClaro',
    label: 'Céu Claro',
    rawCondition: 'Céu Claro',
    aliases: ['ceu claro'],
  },
  {
    key: 'sol',
    label: 'Sol',
    rawCondition: 'Sol',
    aliases: ['sol'],
  },
  {
    key: 'chuva',
    label: 'Chuva',
    rawCondition: 'Chuva',
    aliases: ['chuva'],
  },
  {
    key: 'garoa',
    label: 'Garoa/Chuvisco',
    rawCondition: 'Garoa/Chuvisco',
    aliases: ['garoa/chuvisco', 'garoa', 'chuvisco'],
  },
  {
    key: 'nevoeiro',
    label: 'Nevoeiro/Neblina',
    rawCondition: 'Nevoeiro/Neblina',
    aliases: ['nevoeiro/neblina', 'nevoeiro', 'neblina'],
  },
  {
    key: 'vento',
    label: 'Vento',
    rawCondition: 'Vento',
    aliases: ['vento'],
  },
  {
    key: 'neve',
    label: 'Neve',
    rawCondition: 'Neve',
    aliases: ['neve', 'granizo'],
  },
];

/**
 * Aligns backend `/analytics/weather-distribution` items into the 8 Figma weather slots.
 * Unknown/ignored records (`Ignorado`) are excluded from the 8 weather glyphs and returned separately.
 */
export function transformWeatherDistribution(rows: readonly WeatherDistributionDTO[]): {
  series: WeatherChartDatum[];
  ignoredCount: number;
  totalCount: number;
} {
  const countsByKey = new Map<WeatherCategoryKey, number>();
  let ignoredCount = 0;

  for (const row of rows) {
    const normalized = normalizeLookupKey(row.weatherCondition);
    const matched = WEATHER_ORDER.find((item) => item.aliases.includes(normalized));

    if (matched) {
      countsByKey.set(matched.key, (countsByKey.get(matched.key) ?? 0) + row.count);
    } else {
      ignoredCount += row.count;
    }
  }

  const series: WeatherChartDatum[] = WEATHER_ORDER.map((item) => ({
    key: item.key,
    label: item.label,
    rawCondition: item.rawCondition,
    count: countsByKey.get(item.key) ?? 0,
  }));

  const totalCount = series.reduce((sum, item) => sum + item.count, 0);

  return { series, ignoredCount, totalCount };
}

const SEVERITY_ORDER: readonly {
  key: SeverityCategoryKey;
  label: string;
  rawSeverity: string;
  fill: string;
  aliases: readonly string[];
}[] = [
  {
    key: 'fatal',
    label: 'Com vítimas fatais',
    rawSeverity: 'Fatal',
    fill: 'var(--chart-severity-sequence-1)',
    aliases: ['fatal', 'com vitimas fatais'],
  },
  {
    key: 'grave',
    label: 'Vítimas graves',
    rawSeverity: 'Grave',
    fill: 'var(--chart-severity-sequence-2)',
    aliases: ['grave', 'vitimas graves'],
  },
  {
    key: 'leve',
    label: 'Vítimas leves',
    rawSeverity: 'Leve',
    fill: 'var(--chart-severity-sequence-3)',
    aliases: ['leve', 'com vitimas feridas', 'vitimas leves'],
  },
  {
    key: 'semVitimas',
    label: 'Sem vítimas',
    rawSeverity: 'Sem vítimas',
    fill: 'var(--chart-severity-sequence-4)',
    aliases: ['sem vitimas'],
  },
];

/**
 * Normalizes `/analytics/severity-distribution/{type}` into the 4 Beltwise severity bands.
 */
export function transformSeverityDistribution(rows: readonly SeverityDistributionDTO[]): {
  series: SeverityChartDatum[];
  totalCount: number;
} {
  const countsByKey = new Map<SeverityCategoryKey, number>();

  for (const row of rows) {
    const normalized = normalizeLookupKey(row.severity);
    const matched = SEVERITY_ORDER.find((item) => item.aliases.includes(normalized));
    if (matched) {
      countsByKey.set(matched.key, (countsByKey.get(matched.key) ?? 0) + row.count);
    }
  }

  const totalCount = Array.from(countsByKey.values()).reduce((sum, count) => sum + count, 0);

  const series: SeverityChartDatum[] = SEVERITY_ORDER.map((item) => {
    const count = countsByKey.get(item.key) ?? 0;
    return {
      key: item.key,
      label: item.label,
      rawSeverity: item.rawSeverity,
      count,
      percentage: totalCount > 0 ? (count / totalCount) * 100 : 0,
      fill: item.fill,
    };
  });

  return { series, totalCount };
}

const VEHICLE_CATEGORY_ORDER: readonly {
  key: VehicleCategoryKey;
  label: string;
  color: string;
  aliases: readonly string[];
}[] = [
  {
    key: 'moto',
    label: 'moto',
    color: 'var(--category-vehicle-motorcycle)',
    aliases: ['motocicleta', 'motoneta', 'ciclomotor', 'triciclo', 'quadriciclo'],
  },
  {
    key: 'carro',
    label: 'carro',
    color: 'var(--category-vehicle-car)',
    aliases: ['automovel', 'caminhonete', 'camioneta', 'utilitario', 'motor-casa'],
  },
  {
    key: 'caminhao',
    label: 'caminhão',
    color: 'var(--category-vehicle-truck)',
    aliases: [
      'caminhao',
      'caminhao-trator',
      'semireboque',
      'reboque',
      'onibus',
      'micro-onibus',
      'trator de rodas',
      'trator de esteiras',
      'trator misto',
    ],
  },
  {
    key: 'bicicleta',
    label: 'bicicleta',
    color: 'var(--category-vehicle-bicycle)',
    aliases: ['bicicleta'],
  },
  {
    key: 'cavalo',
    label: 'cavalo',
    color: 'var(--category-vehicle-horse)',
    aliases: ['carroca-charrete', 'carroca', 'charrete'],
  },
];

/**
 * Aggregates raw PRF `vehicleType` strings into the 5 Beltwise vehicle visual categories.
 * Any remaining unmapped records (`Outros`, `Trem-bonde`, `NOT_INFORMED`) are tracked in `unmappedCount`
 * and optionally included as `outros` if non-zero so totals remain truthful.
 */
export function transformVehicleDistribution(rows: readonly VehicleDistributionDTO[]): {
  primarySeries: VehicleChartDatum[];
  totalCount: number;
  unmappedCount: number;
} {
  const countsByKey = new Map<VehicleCategoryKey, number>();
  let unmappedCount = 0;

  for (const row of rows) {
    const normalized = normalizeLookupKey(row.vehicleType);
    const matched = VEHICLE_CATEGORY_ORDER.find((item) => item.aliases.includes(normalized));

    if (matched) {
      countsByKey.set(matched.key, (countsByKey.get(matched.key) ?? 0) + row.count);
    } else {
      unmappedCount += row.count;
    }
  }

  const mappedTotal = Array.from(countsByKey.values()).reduce((sum, count) => sum + count, 0);
  const totalCount = mappedTotal + unmappedCount;

  const primarySeries: VehicleChartDatum[] = VEHICLE_CATEGORY_ORDER.map((item) => {
    const count = countsByKey.get(item.key) ?? 0;
    return {
      key: item.key,
      label: item.label,
      count,
      percentage: mappedTotal > 0 ? (count / mappedTotal) * 100 : 0,
      color: item.color,
    };
  });

  return { primarySeries, totalCount, unmappedCount };
}

function parseHourFromLocalTime(value: TimeDistributionDTO['time']): number | null {
  if (Array.isArray(value)) {
    const hour = value[0];
    return typeof hour === 'number' && hour >= 0 && hour <= 23 ? hour : null;
  }

  if (typeof value === 'string') {
    const match = /^(\d{1,2})/.exec(value.trim());
    if (!match) return null;
    const hour = Number.parseInt(match[1], 10);
    return Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : null;
  }

  return null;
}

/**
 * Builds a continuous 24-hour series (`0h`..`23h`) from sparse backend `/analytics/time-distribution/{type}` rows.
 */
export function transformTimeDistribution(rows: readonly TimeDistributionDTO[]): {
  series: HourlyChartDatum[];
  totalCount: number;
} {
  const countsByHour = new Map<number, number>();

  for (const row of rows) {
    const hour = parseHourFromLocalTime(row.time);
    if (hour !== null) {
      countsByHour.set(hour, (countsByHour.get(hour) ?? 0) + row.count);
    }
  }

  const series: HourlyChartDatum[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    hourLabel: `${hour}h`,
    count: countsByHour.get(hour) ?? 0,
  }));

  const totalCount = series.reduce((sum, item) => sum + item.count, 0);

  return { series, totalCount };
}

const ROAD_CONFIGURATION_ORDER: readonly {
  key: RoadConfigurationCategoryKey;
  label: string;
  rawConfiguration: string;
  aliases: readonly string[];
}[] = [
  {
    key: 'unica',
    label: 'única',
    rawConfiguration: 'Simples',
    aliases: ['unica', 'pista simples', 'simples', 'via unica'],
  },
  {
    key: 'dupla',
    label: 'dupla',
    rawConfiguration: 'Dupla',
    aliases: ['dupla', 'pista dupla', 'via dupla'],
  },
  {
    key: 'multipla',
    label: 'multipla',
    rawConfiguration: 'Múltipla',
    aliases: ['multipla', 'multifaixas', 'pista multipla', 'via multipla'],
  },
];

/**
 * Normalizes road configuration rows into the 3 Beltwise road configuration categories
 * (`única`, `dupla`, `multipla` — Figma `Charts/RoadConfigurationDistribution` `23:226`).
 */
export function transformRoadConfigurationDistribution(
  rows: readonly RoadConfigurationDTO[],
): {
  series: RoadConfigurationChartDatum[];
  totalCount: number;
  unmappedCount: number;
} {
  const countsByKey = new Map<RoadConfigurationCategoryKey, number>();
  let unmappedCount = 0;

  for (const row of rows) {
    const normalized = normalizeLookupKey(row.roadConfiguration);
    const matched = ROAD_CONFIGURATION_ORDER.find((item) =>
      item.aliases.includes(normalized),
    );

    if (matched) {
      countsByKey.set(
        matched.key,
        (countsByKey.get(matched.key) ?? 0) + row.count,
      );
    } else {
      unmappedCount += row.count;
    }
  }

  const mappedTotal = Array.from(countsByKey.values()).reduce(
    (sum, count) => sum + count,
    0,
  );
  const totalCount = mappedTotal + unmappedCount;

  const series: RoadConfigurationChartDatum[] = ROAD_CONFIGURATION_ORDER.map(
    (item) => {
      const count = countsByKey.get(item.key) ?? 0;
      return {
        key: item.key,
        label: item.label,
        rawConfiguration: item.rawConfiguration,
        count,
        percentage: mappedTotal > 0 ? (count / mappedTotal) * 100 : 0,
      };
    },
  );

  return { series, totalCount, unmappedCount };
}


