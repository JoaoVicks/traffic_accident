import { useMemo } from 'react';
import { getAnalyticsSummary } from '../services/analyticsService';
import type { AccidentSummaryDTO, AnalyticFilterParams } from '../types/analytics';
import { useAnalyticsQuery, type AnalyticsQueryState } from './useAnalyticsQuery';

/** Fetches accident and victim totals from `/analytics/summary`. */
export function useAnalyticsSummary(
  filters?: AnalyticFilterParams,
  enabled = true,
): AnalyticsQueryState<AccidentSummaryDTO> {
  const fetcher = useMemo(
    () => (signal: AbortSignal) => getAnalyticsSummary(filters, signal),
    [filters],
  );

  return useAnalyticsQuery(fetcher, 'summary', filters, enabled);
}

