import { useId, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { AnalyticsTabs, type AnalyticsTabMetric } from '@/design-system/primitives';
import { useTimeDistribution } from '../hooks/useTimeDistribution';
import type {
  AnalyticFilterParams,
  HourlyChartDatum,
  TimeDistributionDTO,
} from '../types/analytics';
import { formatMetricCount, transformTimeDistribution } from '../utils/transformers';
import { AnalyticsCardShell } from './AnalyticsCardShell';

const hourlyChartConfig = {
  count: {
    label: 'Ocorrências',
    color: 'var(--primary-200)',
  },
} satisfies ChartConfig;

export interface HourlyDistributionChartProps {
  filters?: AnalyticFilterParams;
  /** Controlled active tab (`accidents` | `victims`). */
  metric?: AnalyticsTabMetric;
  onMetricChange?: (metric: AnalyticsTabMetric) => void;
  /** Optional controlled dataset; when omitted, fetches `/analytics/time-distribution/{type}`. */
  data?: readonly TimeDistributionDTO[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}

/**
 * Hourly time-series line chart matching Figma `Analytics/Card/Hourly` (23:797)
 * backed by `GET /analytics/time-distribution/{type}` (`ACCIDENT` | `VICTIM`).
 */
export function HourlyDistributionChart({
  filters,
  metric: controlledMetric,
  onMetricChange,
  data,
  isLoading: controlledLoading,
  error: controlledError,
  onRetry,
  className,
}: HourlyDistributionChartProps) {
  const [internalMetric, setInternalMetric] = useState<AnalyticsTabMetric>('accidents');
  const activeMetric = controlledMetric ?? internalMetric;
  const areaFillId = `hourly-area-fill-${useId().replace(/:/g, '')}`;

  const handleMetricChange = (nextMetric: AnalyticsTabMetric) => {
    if (controlledMetric === undefined) {
      setInternalMetric(nextMetric);
    }
    onMetricChange?.(nextMetric);
  };

  const query = useTimeDistribution(activeMetric, filters, data === undefined);

  const controlled = useMemo(
    () => (data ? transformTimeDistribution(data) : null),
    [data],
  );

  const series: HourlyChartDatum[] = controlled?.series ?? query.series;
  const totalCount = controlled?.totalCount ?? query.totalCount;
  const isLoading = controlledLoading ?? (data === undefined ? query.isLoading : false);
  const error = controlledError ?? (data === undefined ? query.error : null);

  const title =
    activeMetric === 'victims'
      ? 'número de vítimas por hora'
      : 'número de acidentes por hora';

  const seriesLabel = activeMetric === 'victims' ? 'Vítimas' : 'Acidentes';

  return (
    <AnalyticsCardShell
      aria-label={title}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry ?? query.refetch}
      isEmpty={!isLoading && !error && totalCount === 0}
      className={className}
      bodyClassName="mt-[20px]"
      header={
        <div className="flex flex-col gap-[12px]">
          <AnalyticsTabs value={activeMetric} onValueChange={handleMetricChange} />
          <div className="h-[1.5px] w-full bg-(--black-420)" />
        </div>
      }
    >
      <div className="flex flex-col gap-[12px]">
        <h3 className="text-[13px] leading-normal font-normal text-(--white-500)">{title}</h3>

        <div className="rounded-[9px] bg-(--black-430) px-[10px] pt-[12px] pb-[8px]">
          <ChartContainer
            config={hourlyChartConfig}
            className="aspect-auto h-[168px] w-full"
            initialDimension={{ width: 381, height: 168 }}
          >
            <AreaChart data={series} margin={{ top: 8, right: 8, bottom: 2, left: 8 }}>
              <defs>
                <linearGradient id={areaFillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--black-420)" />
              <XAxis
                dataKey="hourLabel"
                axisLine={{ stroke: 'var(--black-400)', strokeWidth: 1 }}
                tickLine={false}
                interval={2}
                tick={{ fill: 'var(--text-gray-axis)', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis hide domain={[0, 'dataMax']} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) => `Horário: ${String(value)}`}
                    formatter={(value) => (
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="text-(--text-secondary)">{seriesLabel}</span>
                        <span className="font-medium text-(--white-800) tabular-nums">
                          {formatMetricCount(Number(value ?? 0))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--color-count)"
                strokeWidth={2}
                fill={`url(#${areaFillId})`}
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--primary-200)',
                  stroke: 'var(--black-430)',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </AnalyticsCardShell>
  );
}

