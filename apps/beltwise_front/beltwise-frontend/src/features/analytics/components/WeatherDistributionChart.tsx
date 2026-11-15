import { useMemo, type ReactElement } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  CloudDrizzleIcon,
  CloudFogIcon,
  CloudRainIcon,
  SnowflakeIcon,
  SunClearIcon,
  SunCloudIcon,
  SunWarmIcon,
  WeatherSunIcon,
  WindFastIcon,
} from '@/design-system/primitives';
import { useWeatherDistribution } from '../hooks/useWeatherDistribution';
import type {
  AnalyticFilterParams,
  WeatherCategoryKey,
  WeatherChartDatum,
  WeatherDistributionDTO,
} from '../types/analytics';
import { formatMetricCount, transformWeatherDistribution } from '../utils/transformers';
import { AnalyticsCardShell } from './AnalyticsCardShell';

const weatherChartConfig = {
  count: {
    label: 'Acidentes',
    color: 'var(--primary-300)',
  },
} satisfies ChartConfig;

const WEATHER_LABELS: Record<WeatherCategoryKey, string> = {
  nublado: 'Nublado',
  ceuClaro: 'Céu Claro',
  sol: 'Sol',
  chuva: 'Chuva',
  garoa: 'Garoa/Chuvisco',
  nevoeiro: 'Nevoeiro/Neblina',
  vento: 'Vento',
  neve: 'Neve',
};

function renderWeatherIconGlyph(key: WeatherCategoryKey): ReactElement {
  const iconProps = { width: 22, height: 22, className: 'text-(--white-500)' };

  switch (key) {
    case 'nublado':
      return <SunCloudIcon {...iconProps} />;
    case 'ceuClaro':
      return <SunClearIcon {...iconProps} />;
    case 'sol':
      return <SunWarmIcon {...iconProps} />;
    case 'chuva':
      return <CloudRainIcon {...iconProps} />;
    case 'garoa':
      return <CloudDrizzleIcon {...iconProps} />;
    case 'nevoeiro':
      return <CloudFogIcon {...iconProps} />;
    case 'vento':
      return <WindFastIcon {...iconProps} />;
    case 'neve':
      return <SnowflakeIcon {...iconProps} />;
  }
}

interface AxisTickProps {
  x?: number | string;
  y?: number | string;
  payload?: { value?: string };
}

function renderWeatherAxisTick({ x = 0, y = 0, payload }: AxisTickProps): ReactElement {
  const key = (payload?.value ?? 'nublado') as WeatherCategoryKey;
  const numX = typeof x === 'number' ? x : Number(x);
  const numY = typeof y === 'number' ? y : Number(y);
  const label = WEATHER_LABELS[key] ?? key;

  return (
    <g transform={`translate(${numX - 11}, ${numY + 6})`} className="text-(--white-500)">
      <title>{label}</title>
      {renderWeatherIconGlyph(key)}
    </g>
  );
}

export interface WeatherDistributionChartProps {
  filters?: AnalyticFilterParams;
  /** Optional controlled dataset; when omitted, fetches directly from `/analytics/weather-distribution`. */
  data?: readonly WeatherDistributionDTO[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

/**
 * Eight-category weather bar chart matching Figma `Analytics/Card/Weather` (23:518)
 * backed by `GET /analytics/weather-distribution`.
 */
export function WeatherDistributionChart({
  filters,
  data,
  isLoading: controlledLoading,
  error: controlledError,
  onRetry,
  title = 'clima envolvido no acidente',
  className,
}: WeatherDistributionChartProps) {
  const query = useWeatherDistribution(filters, data === undefined);

  const controlled = useMemo(
    () => (data ? transformWeatherDistribution(data) : null),
    [data],
  );

  const series: WeatherChartDatum[] = controlled?.series ?? query.series;
  const totalCount = controlled?.totalCount ?? query.totalCount;
  const isLoading = controlledLoading ?? (data === undefined ? query.isLoading : false);
  const error = controlledError ?? (data === undefined ? query.error : null);

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
        <div className="flex items-center gap-[4px]">
          <span className="flex size-[24px] shrink-0 items-center justify-center text-(--white-500)">
            <WeatherSunIcon className="size-[21px]" />
          </span>
          <h3 className="text-[13px] leading-normal font-normal text-(--white-500)">{title}</h3>
        </div>
      }
    >
      <ChartContainer
        config={weatherChartConfig}
        className="aspect-auto h-[186px] w-full"
        initialDimension={{ width: 401, height: 186 }}
      >
        <BarChart data={series} margin={{ top: 6, right: 0, bottom: 2, left: 0 }}>
          <XAxis
            dataKey="key"
            axisLine={{ stroke: 'var(--black-430)', strokeWidth: 1.5 }}
            tickLine={false}
            interval={0}
            height={36}
            tick={renderWeatherAxisTick}
          />
          <YAxis hide domain={[0, 'dataMax']} />
          <ChartTooltip
            cursor={{ fill: 'var(--black-430)', opacity: 0.45 }}
            content={
              <ChartTooltipContent
                labelFormatter={(_, payloadItems) => {
                  const datum = payloadItems?.[0]?.payload as WeatherChartDatum | undefined;
                  return datum?.label ?? '';
                }}
                formatter={(value) => (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-(--text-secondary)">Ocorrências</span>
                    <span className="font-medium text-(--white-800) tabular-nums">
                      {formatMetricCount(Number(value ?? 0))}
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[10, 10, 10, 10]}
            maxBarSize={33}
          />
        </BarChart>
      </ChartContainer>
    </AnalyticsCardShell>
  );
}

