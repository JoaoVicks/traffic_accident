import { useMemo } from 'react';
import { getWeatherDistribution } from '../services/analyticsService';
import type { AnalyticFilterParams, WeatherChartDatum } from '../types/analytics';
import { transformWeatherDistribution } from '../utils/transformers';
import { useAnalyticsQuery } from './useAnalyticsQuery';

export interface WeatherDistributionState {
  series: WeatherChartDatum[];
  totalCount: number;
  ignoredCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Fetches and normalizes weather distribution data into the 8 Beltwise weather slots. */
export function useWeatherDistribution(
  filters?: AnalyticFilterParams,
  enabled = true,
): WeatherDistributionState {
  const query = useAnalyticsQuery(
    (signal) => getWeatherDistribution(filters, signal),
    'weather-distribution',
    filters,
    enabled,
  );

  const transformed = useMemo(
    () => (query.data ? transformWeatherDistribution(query.data) : null),
    [query.data],
  );

  return {
    series: transformed?.series ?? [],
    totalCount: transformed?.totalCount ?? 0,
    ignoredCount: transformed?.ignoredCount ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

