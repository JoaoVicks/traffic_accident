import { useMemo } from 'react';
import { getTimeDistribution } from '../services/analyticsService';
import type {
  AnalyticFilterParams,
  AnalyticsTabValue,
  HourlyChartDatum,
} from '../types/analytics';
import { tabValueToMetricType, transformTimeDistribution } from '../utils/transformers';
import { useAnalyticsQuery } from './useAnalyticsQuery';

export interface TimeDistributionState {
  series: HourlyChartDatum[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Fetches and pads 24-hour distribution buckets (`0h`–`23h`) for accidents or victims. */
export function useTimeDistribution(
  metric: AnalyticsTabValue,
  filters?: AnalyticFilterParams,
  enabled = true,
): TimeDistributionState {
  const metricType = tabValueToMetricType(metric);

  const query = useAnalyticsQuery(
    (signal) => getTimeDistribution(metricType, filters, signal),
    `time-distribution:${metricType}`,
    filters,
    enabled,
  );

  const transformed = useMemo(
    () => (query.data ? transformTimeDistribution(query.data) : null),
    [query.data],
  );

  return {
    series: transformed?.series ?? [],
    totalCount: transformed?.totalCount ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

