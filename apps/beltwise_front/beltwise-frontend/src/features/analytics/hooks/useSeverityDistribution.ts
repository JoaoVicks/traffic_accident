import { useMemo } from 'react';
import { getSeverityDistribution } from '../services/analyticsService';
import type {
  AnalyticFilterParams,
  AnalyticsTabValue,
  SeverityChartDatum,
} from '../types/analytics';
import {
  tabValueToMetricType,
  transformSeverityDistribution,
} from '../utils/transformers';
import { useAnalyticsQuery } from './useAnalyticsQuery';

export interface SeverityDistributionState {
  series: SeverityChartDatum[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Fetches and normalizes severity distribution data for accidents or victims. */
export function useSeverityDistribution(
  metric: AnalyticsTabValue,
  filters?: AnalyticFilterParams,
  enabled = true,
): SeverityDistributionState {
  const metricType = tabValueToMetricType(metric);

  const query = useAnalyticsQuery(
    (signal) => getSeverityDistribution(metricType, filters, signal),
    `severity-distribution:${metricType}`,
    filters,
    enabled,
  );

  const transformed = useMemo(
    () => (query.data ? transformSeverityDistribution(query.data) : null),
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

