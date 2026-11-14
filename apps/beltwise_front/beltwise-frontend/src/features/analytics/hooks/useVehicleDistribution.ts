import { useMemo } from 'react';
import { getVehicleDistribution } from '../services/analyticsService';
import type { AnalyticFilterParams, VehicleChartDatum } from '../types/analytics';
import { transformVehicleDistribution } from '../utils/transformers';
import { useAnalyticsQuery } from './useAnalyticsQuery';

export interface VehicleDistributionState {
  primarySeries: VehicleChartDatum[];
  totalCount: number;
  unmappedCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Fetches and aggregates raw PRF vehicle types into the Beltwise vehicle categories. */
export function useVehicleDistribution(
  filters?: AnalyticFilterParams,
  enabled = true,
): VehicleDistributionState {
  const query = useAnalyticsQuery(
    (signal) => getVehicleDistribution(filters, signal),
    'vehicle-distribution',
    filters,
    enabled,
  );

  const transformed = useMemo(
    () => (query.data ? transformVehicleDistribution(query.data) : null),
    [query.data],
  );

  return {
    primarySeries: transformed?.primarySeries ?? [],
    totalCount: transformed?.totalCount ?? 0,
    unmappedCount: transformed?.unmappedCount ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

