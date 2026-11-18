import { cn } from 'cn';
import {
  AccidentBurstIcon,
  UsersGroupIcon,
} from '@/design-system/primitives';
import { formatMetricCount } from '../utils/transformers';

export type AnalyticsKpiTileVariant = 'victims' | 'accidents';

export interface AnalyticsKpiTileProps {
  /** KPI metric variant (`victims` `23:43` | `accidents` `23:59`). */
  variant: AnalyticsKpiTileVariant;
  /** Metric count value (formatted automatically when passed as a number). */
  value: number | string;
  /** Optional custom metric label. Defaults to Figma specimen strings (`"vitimas"` / `"acidentes"`). */
  label?: string;
  className?: string;
}

/**
 * Domain KPI metric tile (`Analytics/KPITile/Victims` `23:43` and `Analytics/KPITile/Accidents` `23:59`).
 * Preserves the exact `196.5 × 80 px` inset surface, variant-specific horizontal padding (`px-[8px]` vs `px-[10px]`),
 * `16px` domain icon, `14px Light` `primary-300` label, and `46px SemiBold` vertical gradient value.
 */
export function AnalyticsKpiTile({
  variant,
  value,
  label,
  className,
}: AnalyticsKpiTileProps) {
  const isVictims = variant === 'victims';
  const resolvedLabel = label ?? (isVictims ? 'vitimas' : 'acidentes');
  const formattedValue =
    typeof value === 'number' ? formatMetricCount(value) : value;

  return (
    <div
      data-slot={`analytics-kpi-tile-${variant}`}
      className={cn(
        'flex h-(--size-analytics-kpi-tile-height) w-(--size-analytics-kpi-tile-width) shrink-0 items-center justify-center rounded-(--radius-10) bg-(--black-430) py-[12px]',
        isVictims ? 'px-[8px]' : 'px-[10px]',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[8px]">
        <div
          className={cn(
            'flex shrink-0 items-center gap-[2px]',
            !isVictims && 'w-full',
          )}
        >
          {isVictims ? (
            <span
              aria-hidden="true"
              className="relative size-[16px] shrink-0 text-(--primary-300)"
            >
              <UsersGroupIcon />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="relative size-[16px] shrink-0 overflow-clip text-(--primary-300)"
            >
              <span className="absolute inset-[8.33%]">
                <span className="absolute inset-[-3.75%]">
                  <AccidentBurstIcon />
                </span>
              </span>
            </span>
          )}

          <span className="type-body-control-light whitespace-nowrap text-(--primary-300)">
            {resolvedLabel}
          </span>
        </div>

        <div className="flex h-[32px] w-full shrink-0 items-center">
          <span
            className={cn(
              'type-display-metric-semibold bg-clip-text leading-none whitespace-nowrap text-transparent tabular-nums',
              isVictims
                ? 'bg-[image:var(--gradient-contextual-1)]'
                : 'bg-[image:var(--gradient-contextual-2)]',
            )}
          >
            {formattedValue}
          </span>
        </div>
      </div>
    </div>
  );
}

