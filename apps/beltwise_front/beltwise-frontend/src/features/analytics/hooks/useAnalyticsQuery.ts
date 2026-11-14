import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AnalyticFilterParams } from '../types/analytics';

export interface AnalyticsQueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface QueryResultState<T> {
  key: string | null;
  data: T | null;
  error: string | null;
}

function serializeFilters(filters?: AnalyticFilterParams): string {
  if (!filters) return '';
  return JSON.stringify([
    filters.startDate ?? '',
    filters.endDate ?? '',
    filters.startTime ?? '',
    filters.endTime ?? '',
    filters.vehicleType ?? '',
    filters.accidentClassification ?? '',
    filters.searchType ?? '',
    filters.searchId ?? '',
  ]);
}

/**
 * Shared async query hook for analytics endpoints with `AbortController` cleanup
 * and stable filter-key comparison.
 */
export function useAnalyticsQuery<TResult>(
  fetcher: (signal: AbortSignal) => Promise<TResult>,
  depsKey: string,
  filters?: AnalyticFilterParams,
  enabled = true,
): AnalyticsQueryState<TResult> {
  const filterKey = useMemo(() => serializeFilters(filters), [filters]);
  const [reloadToken, setReloadToken] = useState(0);
  const requestKey = enabled ? `${depsKey}|${filterKey}|${reloadToken}` : null;

  const [result, setResult] = useState<QueryResultState<TResult>>({
    key: null,
    data: null,
    error: null,
  });

  const refetch = useCallback(() => {
    setReloadToken((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!requestKey) {
      return;
    }

    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({ key: requestKey, data, error: null });
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error && err.message.trim().length > 0
            ? err.message
            : 'Não foi possível carregar os dados analíticos.';
        setResult({ key: requestKey, data: null, error: message });
      });

    return () => {
      controller.abort();
    };
    // `fetcher` closes over the active request parameters encoded in `requestKey`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const isCurrent = requestKey !== null && result.key === requestKey;

  return {
    data: isCurrent ? result.data : null,
    isLoading: requestKey !== null && !isCurrent,
    error: isCurrent ? result.error : null,
    refetch,
  };
}
