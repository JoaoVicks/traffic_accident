import { useMemo, type ReactElement } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  BicycleIcon,
  CarIcon,
  HorseIcon,
  MotorcycleIcon,
  TruckIcon,
} from '@/design-system/primitives';
import { useVehicleDistribution } from '../hooks/useVehicleDistribution';
import type {
  AnalyticFilterParams,
  VehicleCategoryKey,
  VehicleChartDatum,
  VehicleDistributionDTO,
} from '../types/analytics';
import { formatMetricCount, transformVehicleDistribution } from '../utils/transformers';
import { AnalyticsCardShell } from './AnalyticsCardShell';

const vehicleChartConfig = {
  moto: {
    label: 'moto',
    color: 'var(--category-vehicle-motorcycle)',
  },
  carro: {
    label: 'carro',
    color: 'var(--category-vehicle-car)',
  },
  caminhao: {
    label: 'caminhão',
    color: 'var(--category-vehicle-truck)',
  },
  bicicleta: {
    label: 'bicicleta',
    color: 'var(--category-vehicle-bicycle)',
  },
  cavalo: {
    label: 'cavalo',
    color: 'var(--category-vehicle-horse)',
  },
} satisfies ChartConfig;

function renderVehicleIcon(key: VehicleCategoryKey): ReactElement | null {
  switch (key) {
    case 'moto':
      return <MotorcycleIcon className="h-[11px] w-[15px]" />;
    case 'carro':
      return <CarIcon className="h-[10px] w-[14px]" />;
    case 'caminhao':
      return <TruckIcon className="h-[12px] w-[14px]" />;
    case 'bicicleta':
      return <BicycleIcon className="h-[10px] w-[14px]" />;
    case 'cavalo':
      return <HorseIcon className="h-[13px] w-[14px]" />;
    case 'outros':
      return null;
  }
}

export interface VehicleDistributionChartProps {
  filters?: AnalyticFilterParams;
  /** Optional controlled dataset; when omitted, fetches directly from `/analytics/vehicle-distribution`. */
  data?: readonly VehicleDistributionDTO[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

/**
 * Stacked horizontal bar and categorized inset legend matching Figma `Analytics/Card/Vehicles` (23:682)
 * backed by `GET /analytics/vehicle-distribution`.
 */
export function VehicleDistributionChart({
  filters,
  data,
  isLoading: controlledLoading,
  error: controlledError,
  onRetry,
  title = 'tipos de veículos',
  className,
}: VehicleDistributionChartProps) {
  const query = useVehicleDistribution(filters, data === undefined);

  const controlled = useMemo(
    () => (data ? transformVehicleDistribution(data) : null),
    [data],
  );

  const primarySeries: VehicleChartDatum[] = controlled?.primarySeries ?? query.primarySeries;
  const totalCount = controlled?.totalCount ?? query.totalCount;
  const unmappedCount = controlled?.unmappedCount ?? query.unmappedCount;
  const isLoading = controlledLoading ?? (data === undefined ? query.isLoading : false);
  const error = controlledError ?? (data === undefined ? query.error : null);

  const { chartRow, mappedTotal } = useMemo(() => {
    const row: Record<string, number | string> = { category: 'vehicles' };
    let sum = 0;

    for (const item of primarySeries) {
      row[item.key] = item.count;
      sum += item.count;
    }

    return { chartRow: [row], mappedTotal: sum };
  }, [primarySeries]);

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
        <div className="flex items-center gap-[8px]">
          <span className="flex size-[20px] shrink-0 items-center justify-center text-(--white-500)">
            <CarIcon className="h-[13px] w-[18px]" />
          </span>
          <h3 className="text-[14px] leading-normal font-light text-(--white-500)">{title}</h3>
        </div>
      }
    >
      <div className="flex flex-col gap-[16px]">
        {mappedTotal > 0 ? (
          <ChartContainer
            config={vehicleChartConfig}
            className="aspect-auto h-[18px] w-full"
            initialDimension={{ width: 380, height: 18 }}
          >
            <BarChart
              data={chartRow}
              layout="vertical"
              barSize={14}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <XAxis type="number" domain={[0, mappedTotal]} hide />
              <YAxis type="category" dataKey="category" hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => {
                      const key = String(name) as VehicleCategoryKey;
                      const match = primarySeries.find((item) => item.key === key);
                      return (
                        <div className="flex w-full items-center justify-between gap-4">
                          <span className="flex items-center gap-2 text-(--text-secondary)">
                            <span
                              className="inline-block size-2.5 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: match?.color }}
                            />
                            {match?.label ?? name}
                          </span>
                          <span className="font-medium text-(--white-800) tabular-nums">
                            {formatMetricCount(Number(value ?? 0))}
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />
              {primarySeries.map((item) => (
                <Bar
                  key={item.key}
                  dataKey={item.key}
                  stackId="vehicles"
                  fill={`var(--color-${item.key})`}
                  radius={[6, 6, 6, 6]}
                  stroke="var(--black-450)"
                  strokeWidth={1}
                />
              ))}
            </BarChart>
          </ChartContainer>
        ) : null}

        <ul className="flex flex-col overflow-hidden rounded-[19px] bg-(--black-430) px-[12px] py-[4px]">
          {primarySeries.map((item, index) => (
            <li
              key={item.key}
              className={
                index > 0
                  ? 'flex items-center justify-between border-t border-(--black-420) py-[8px]'
                  : 'flex items-center justify-between py-[8px]'
              }
            >
              <div className="flex items-center gap-[8px]">
                <span
                  aria-hidden="true"
                  className="h-[10px] w-[9px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex items-center gap-[5px]">
                  <span className="text-[13px] leading-normal font-normal text-(--white-500)">
                    {item.label}
                  </span>
                  <span className="flex size-[18px] items-center justify-center text-(--white-500)">
                    {renderVehicleIcon(item.key)}
                  </span>
                </div>
              </div>
              <span className="text-[13px] leading-normal font-normal text-(--white-250) tabular-nums">
                {formatMetricCount(item.count)}
              </span>
            </li>
          ))}
          {unmappedCount > 0 ? (
            <li className="flex items-center justify-between border-t border-(--black-420) py-[8px]">
              <div className="flex items-center gap-[8px]">
                <span
                  aria-hidden="true"
                  className="h-[10px] w-[9px] shrink-0 rounded-[2px] bg-(--text-gray-axis)"
                />
                <span className="text-[13px] leading-normal font-normal text-(--text-secondary)">
                  outros / não informados
                </span>
              </div>
              <span className="text-[13px] leading-normal font-normal text-(--white-250) tabular-nums">
                {formatMetricCount(unmappedCount)}
              </span>
            </li>
          ) : null}
        </ul>
      </div>
    </AnalyticsCardShell>
  );
}

