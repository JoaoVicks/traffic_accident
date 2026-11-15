import type { HTMLAttributes, KeyboardEvent } from 'react';
import { AnalyticsTabItem, type AnalyticsTabMetric } from './AnalyticsTabItem';

const ANALYTICS_ORDER: readonly AnalyticsTabMetric[] = ['accidents', 'victims'];

export interface AnalyticsTabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Active analytics metric tab. Defaults to `accidents` per Figma (`Tabs/Analytics` — 21:226). */
  value?: AnalyticsTabMetric;
  /** Optional handler invoked when a tab is clicked or changed via Left/Right arrow keys. */
  onValueChange?: (metric: AnalyticsTabMetric) => void;
}

/**
 * Analytics metric tab list (`Tabs/Analytics` — Figma 21:226).
 */
export function AnalyticsTabs({
  value = 'accidents',
  onValueChange,
  'aria-label': ariaLabel = 'Métrica de análise',
  className = '',
  ...props
}: AnalyticsTabsProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onValueChange) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const currentIndex = ANALYTICS_ORDER.indexOf(value);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + offset + ANALYTICS_ORDER.length) % ANALYTICS_ORDER.length;
    onValueChange(ANALYTICS_ORDER[nextIndex]);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={`flex h-(--size-analytics-metric-tab-height) w-[187px] shrink-0 items-center gap-2 ${className}`.trim()}
      {...props}
    >
      <AnalyticsTabItem
        metric="accidents"
        selected={value === 'accidents'}
        onClick={() => onValueChange?.('accidents')}
      />
      <AnalyticsTabItem
        metric="victims"
        selected={value === 'victims'}
        onClick={() => onValueChange?.('victims')}
      />
    </div>
  );
}

