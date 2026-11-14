import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { AccidentBurstIcon, UsersGroupIcon } from '../icons';

export type AnalyticsTabMetric = 'accidents' | 'victims';

export interface AnalyticsTabItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Metric tab variant (`Tabs/Analytics item` — Figma 21:202, 21:207). */
  metric: AnalyticsTabMetric;
  /** Selection state (`aria-selected`). Defaults to the Figma evidenced state (`true` for `accidents`, `false` for `victims`). */
  selected?: boolean;
  /** Optional visible label override. Defaults to Figma specimen text (`acidentes` / `vitimas`). */
  label?: string;
}

interface AnalyticsTabConfig {
  defaultLabel: string;
  defaultSelected: boolean;
  widthClass: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const ANALYTICS_TAB_CONFIG: Record<AnalyticsTabMetric, AnalyticsTabConfig> = {
  accidents: {
    defaultLabel: 'acidentes',
    defaultSelected: true,
    widthClass: 'w-(--size-analytics-metric-tab-width)',
    Icon: AccidentBurstIcon,
  },
  victims: {
    defaultLabel: 'vitimas',
    defaultSelected: false,
    widthClass: 'w-[82px]',
    Icon: UsersGroupIcon,
  },
};

/**
 * Single analytics metric tab trigger (`Tabs/Analytics item` — Figma 21:202, 21:207).
 * Uses `currentColor` SVG icon components so selected (`white - 550`) and unselected
 * (`black - 300`) icon colors follow CSS state classes.
 */
export function AnalyticsTabItem({
  metric,
  selected,
  label,
  type = 'button',
  className = '',
  ...props
}: AnalyticsTabItemProps) {
  const config = ANALYTICS_TAB_CONFIG[metric];
  const { Icon } = config;
  const isSelected = selected ?? config.defaultSelected;
  const resolvedLabel = label ?? config.defaultLabel;
  const stateClasses = isSelected
    ? 'bg-(--observed-color-ff8000) text-(--white-550)'
    : 'bg-transparent text-(--black-300)';

  return (
    <button
      type={type}
      role="tab"
      aria-selected={isSelected}
      className={`flex h-(--size-analytics-metric-tab-height) shrink-0 cursor-pointer items-center justify-center gap-1 rounded-(--radius-6) px-2 py-1 font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${config.widthClass} ${stateClasses} ${className}`.trim()}
      {...props}
    >
      <span className="relative size-[16px] shrink-0" aria-hidden="true">
        <span className="absolute inset-[-3.75%]">
          <Icon />
        </span>
      </span>
      <span>{resolvedLabel}</span>
    </button>
  );
}

