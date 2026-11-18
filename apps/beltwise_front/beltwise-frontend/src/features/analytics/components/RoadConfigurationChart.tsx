import { useId, useMemo, type ReactElement } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { cn } from 'cn';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { RoadHighwayIcon } from '@/design-system/primitives';
import type {
  RoadConfigurationChartDatum,
  RoadConfigurationDTO,
} from '../types/analytics';
import {
  formatMetricCount,
  transformRoadConfigurationDistribution,
} from '../utils/transformers';
import { AnalyticsCardShell } from './AnalyticsCardShell';

const roadConfigurationChartConfig = {
  count: {
    label: 'Acidentes',
    color: 'var(--primary-200)',
  },
} satisfies ChartConfig;

interface RoadConfigurationBarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  fill?: string;
  payload?: RoadConfigurationChartDatum;
}

function renderRoadConfigurationBar({
  x = 0,
  y = 0,
  width = 0,
  index = 0,
  fill,
  payload,
}: RoadConfigurationBarShapeProps): ReactElement {
  // Figma 23:226 specifies three 40px rows with 11px vertical gap (0, 51, 102 inside 142px height).
  const rowTop = index >= 0 && index < 3 ? index * 51 : y;
  const barY = rowTop + 15;
  const barHeight = 25;
  const barWidth =
    payload && payload.count > 0 ? Math.max(8, width) : 0;
  const label = payload?.label ?? '';
  const formattedCount = formatMetricCount(payload?.count ?? 0);

  return (
    <g data-road-config-key={payload?.key}>
      <text
        x={x}
        y={rowTop + 9}
        fill="var(--white-500)"
        fontFamily="var(--font-sans)"
        fontSize={13}
        fontWeight={400}
      >
        {label}
      </text>
      <rect
        x={x}
        y={barY}
        width={barWidth}
        height={barHeight}
        rx={8.356}
        ry={8.356}
        fill={fill}
      />
      <text
        x={x + barWidth + 7}
        y={barY + barHeight / 2}
        dominantBaseline="central"
        fill="var(--primary-200)"
        fontFamily="var(--font-sans)"
        fontSize={13}
        fontWeight={400}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {formattedCount}
      </text>
    </g>
  );
}

export interface RoadConfigurationChartProps {
  /** Controlled dataset of road configuration counts (`única`, `dupla`, `multipla`). */
  data?: readonly RoadConfigurationDTO[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

/**
 * Horizontal road configuration distribution chart matching Figma `Analytics/Card/RoadConfiguration` (`23:856`)
 * and `Charts/RoadConfigurationDistribution` (`23:226`).
 *
 * Renders the `437 × 238 px` card shell, `RoadHighwayIcon` + `13px Light` heading at `(16, 15)`,
 * and three labeled horizontal gradient bars (`única`, `dupla`, `multipla`) inside a `395 × 142 px` body.
 */
export function RoadConfigurationChart({
  data,
  isLoading = false,
  error = null,
  onRetry,
  title = 'Configuração da via',
  className,
}: RoadConfigurationChartProps) {
  const rawGradientId = useId().replace(/:/g, '');
  const barGradientId = `road-config-bar-gradient-${rawGradientId}`;

  const transformed = useMemo(
    () => (data ? transformRoadConfigurationDistribution(data) : null),
    [data],
  );

  const series: RoadConfigurationChartDatum[] = transformed?.series ?? [];
  const totalCount = transformed?.totalCount ?? 0;

  return (
    <AnalyticsCardShell
      aria-label={title}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      isEmpty={!isLoading && !error && totalCount === 0}
      className={cn('px-[16px] pt-[15px] pb-[29px]', className)}
      bodyClassName="mt-[28px]"
      header={
        <div className="flex items-center gap-[3px]">
          <span
            aria-hidden="true"
            className="relative size-[24px] shrink-0 overflow-clip text-(--white-500)"
          >
            <span className="absolute inset-[8.34%_8.33%]">
              <span className="absolute inset-[-3.75%]">
                <RoadHighwayIcon />
              </span>
            </span>
          </span>
          <h3 className="type-body-compact-light text-(--white-500)">
            {title}
          </h3>
        </div>
      }
    >
      <ChartContainer
        config={roadConfigurationChartConfig}
        className="aspect-auto h-[142px] w-[395px] max-w-full"
        initialDimension={{ width: 395, height: 142 }}
      >
        <BarChart
          data={series}
          layout="vertical"
          margin={{ top: 0, right: 135, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={barGradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary-100)" />
              <stop offset="100%" stopColor="var(--primary-200)" />
            </linearGradient>
          </defs>
          <XAxis type="number" domain={[0, 'dataMax']} hide />
          <YAxis type="category" dataKey="key" width={0} hide />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(_, payloadItems) => {
                  const datum = payloadItems?.[0]?.payload as
                    | RoadConfigurationChartDatum
                    | undefined;
                  return datum ? `Via ${datum.label}` : '';
                }}
                formatter={(value, _name, item) => {
                  const datum = item.payload as
                    | RoadConfigurationChartDatum
                    | undefined;
                  const count = Number(value ?? 0);
                  return (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-(--text-secondary)">Acidentes</span>
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
          <Bar
            dataKey="count"
            fill={`url(#${barGradientId})`}
            isAnimationActive={false}
            shape={renderRoadConfigurationBar}
          />
        </BarChart>
      </ChartContainer>
    </AnalyticsCardShell>
  );
}

