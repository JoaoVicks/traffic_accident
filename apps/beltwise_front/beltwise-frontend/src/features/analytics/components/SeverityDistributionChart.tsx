import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { AnalyticsTabs, type AnalyticsTabMetric } from '@/design-system/primitives';
import { useSeverityDistribution } from '../hooks/useSeverityDistribution';
import type {
  AnalyticFilterParams,
  SeverityChartDatum,
  SeverityDistributionDTO,
} from '../types/analytics';
import { formatMetricCount, transformSeverityDistribution } from '../utils/transformers';
import { AnalyticsCardShell } from './AnalyticsCardShell';

const severityChartConfig = {
  fatal: {
    label: 'Fatal',
    color: 'var(--chart-severity-sequence-1)',
  },
  grave: {
    label: 'Grave',
    color: 'var(--chart-severity-sequence-2)',
  },
  leve: {
    label: 'Leve',
    color: 'var(--chart-severity-sequence-3)',
  },
  semVitimas: {
    label: 'Sem vítimas',
    color: 'var(--chart-severity-sequence-4)',
  },
} satisfies ChartConfig;

export interface SeverityDistributionChartProps {
  
  filters?: AnalyticFilterParams;
  /** Controlled active tab (`accidents` | `victims`). */
  metric?: AnalyticsTabMetric;
  onMetricChange?: (metric: AnalyticsTabMetric) => void;
  /** Optional controlled dataset; when omitted, fetches `/analytics/severity-distribution/{type}`. */
  data?: readonly SeverityDistributionDTO[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  subtitle?: string;
  className?: string;
}

/**
 * Semi-circular severity gauge matching Figma `Analytics/Card/Severity` (23:580)
 * backed by `GET /analytics/severity-distribution/{type}` (`ACCIDENT` | `VICTIM`).
 */
export function SeverityDistributionChart({
  filters,
  metric: controlledMetric,
  onMetricChange,
  data,
  isLoading: controlledLoading,
  error: controlledError,
  onRetry,
  subtitle = 'distribuição de severidade',
  className,
}: SeverityDistributionChartProps) {
  const [internalMetric, setInternalMetric] = useState<AnalyticsTabMetric>('accidents');
  const activeMetric = controlledMetric ?? internalMetric;

  const handleMetricChange = (nextMetric: AnalyticsTabMetric) => {
    if (controlledMetric === undefined) {
      setInternalMetric(nextMetric);
    }
    onMetricChange?.(nextMetric);
  };

  const query = useSeverityDistribution(activeMetric, filters, data === undefined);

  const controlled = useMemo(
    () => (data ? transformSeverityDistribution(data) : null),
    [data],
  );

  const series: SeverityChartDatum[] = controlled?.series ?? query.series;
  const totalCount = controlled?.totalCount ?? query.totalCount;
  const nonZeroSeries = useMemo(() => series.filter((item) => item.count > 0), [series]);
  const isLoading = controlledLoading ?? (data === undefined ? query.isLoading : false);
  const error = controlledError ?? (data === undefined ? query.error : null);

  return (
    <AnalyticsCardShell
      aria-label={subtitle}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry ?? query.refetch}
      isEmpty={!isLoading && !error && totalCount === 0}
      className={className}
      bodyClassName="mt-[18px]"
      header={
        <div className="flex flex-col gap-[12px]">
          <AnalyticsTabs value={activeMetric} onValueChange={handleMetricChange} />
          <div className="h-[1.5px] w-full bg-(--black-420)" />
        </div>
      }
    >
      <div className="relative flex flex-col items-center">
        <ChartContainer
          config={severityChartConfig}
          className="aspect-auto h-[285px] w-full  "
          initialDimension={{ width: 380, height: 176 }}
        >
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={nonZeroSeries}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="104%"
              paddingAngle={3}
              cornerRadius={10}
              stroke="none"
            >
              {nonZeroSeries.map((entry) => (
                <Cell key={entry.key} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _name, item) => {
                    const datum = item.payload as SeverityChartDatum | undefined;
                    const count = Number(value ?? 0);
                    return (
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-(--text-secondary)">
                          <span
                            className="inline-block size-2.5 shrink-0 rounded-[2px]"
                            style={{ backgroundColor: datum?.fill }}
                          />
                          {datum?.label}
                        </span>
                        <span className="font-medium text-(--white-800) tabular-nums">
                          {formatMetricCount(count)}
                          {datum ? ` (${datum.percentage.toFixed(1)}%)` : ''}
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
          </PieChart>
        </ChartContainer>

        <div className="pointer-events-none absolute  bottom-[10px] mb-14 flex flex-col items-center  text-center">
          <span className="type-display-metric-gauge text-(--white-800) tabular-nums">
            {formatMetricCount(totalCount)}
          </span>
          <span className="text-[12px] mt-[-10px] leading-normal font-light text-(--white-250)">
            {subtitle}
          </span>
        </div>
      </div>
    </AnalyticsCardShell>
  );
}

