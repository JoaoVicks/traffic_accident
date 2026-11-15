import type {
  AccidentSummaryDTO,
  AnalyticFilterParams,
  AnalyticsMetricType,
  SeverityDistributionDTO,
  TimeDistributionDTO,
  VehicleDistributionDTO,
  WeatherDistributionDTO,
} from '../types/analytics';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/** Structured error thrown when an analytics API request fails. */
export class AnalyticsApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AnalyticsApiError';
    this.status = status;
  }
}

function buildAnalyticsUrl(path: string, filters?: AnalyticFilterParams): string {
  const params = new URLSearchParams();

  if (filters) {
    const entries: Array<[keyof AnalyticFilterParams, string | undefined]> = [
      ['startDate', filters.startDate],
      ['endDate', filters.endDate],
      ['startTime', filters.startTime],
      ['endTime', filters.endTime],
      ['vehicleType', filters.vehicleType],
      ['accidentClassification', filters.accidentClassification],
      ['searchType', filters.searchType],
      ['searchId', filters.searchId],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== '') {
        params.set(key, value);
      }
    }
  }

  const queryString = params.toString();
  const basePath = `${API_BASE_URL}${path}`;
  return queryString ? `${basePath}?${queryString}` : basePath;
}

async function fetchAnalyticsJson<T>(
  path: string,
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(buildAnalyticsUrl(path, filters), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    let errorDetail = `Erro ${response.status} ao carregar dados analíticos.`;
    try {
      const body = (await response.json()) as { message?: string };
      if (typeof body?.message === 'string' && body.message.trim().length > 0) {
        errorDetail = body.message;
      }
    } catch {
      // Fallback to status message when error body is not JSON.
    }
    throw new AnalyticsApiError(errorDetail, response.status);
  }

  return (await response.json()) as T;
}

/** Fetches overall accident and victim totals from `GET /analytics/summary`. */
export function getAnalyticsSummary(
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<AccidentSummaryDTO> {
  return fetchAnalyticsJson<AccidentSummaryDTO>('/analytics/summary', filters, signal);
}

/** Fetches severity counts by `ACCIDENT` or `VICTIM` from `GET /analytics/severity-distribution/{type}`. */
export function getSeverityDistribution(
  type: AnalyticsMetricType,
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<SeverityDistributionDTO[]> {
  return fetchAnalyticsJson<SeverityDistributionDTO[]>(
    `/analytics/severity-distribution/${type}`,
    filters,
    signal,
  );
}

/** Fetches vehicle counts from `GET /analytics/vehicle-distribution`. */
export function getVehicleDistribution(
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<VehicleDistributionDTO[]> {
  return fetchAnalyticsJson<VehicleDistributionDTO[]>(
    '/analytics/vehicle-distribution',
    filters,
    signal,
  );
}

/** Fetches weather condition counts from `GET /analytics/weather-distribution`. */
export function getWeatherDistribution(
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<WeatherDistributionDTO[]> {
  return fetchAnalyticsJson<WeatherDistributionDTO[]>(
    '/analytics/weather-distribution',
    filters,
    signal,
  );
}

/** Fetches hourly event counts by `ACCIDENT` or `VICTIM` from `GET /analytics/time-distribution/{type}`. */
export function getTimeDistribution(
  type: AnalyticsMetricType,
  filters?: AnalyticFilterParams,
  signal?: AbortSignal,
): Promise<TimeDistributionDTO[]> {
  return fetchAnalyticsJson<TimeDistributionDTO[]>(
    `/analytics/time-distribution/${type}`,
    filters,
    signal,
  );
}

