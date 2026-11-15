import type { ButtonHTMLAttributes } from 'react';
import { HomeIcon, RankingPodiumIcon, SettingsGearIcon } from '../icons';

export type NavigationItemDestination = 'home' | 'ranking' | 'settings';
export type NavigationItemContext = 'compact' | 'expanded';

export interface NavigationItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Navigation destination (`Navigation/Item` — Figma 21:358..21:384). */
  destination: NavigationItemDestination;
  /** Rail layout context (`compact`: 31px icon rail, `expanded`: 227px labeled row). */
  context?: NavigationItemContext;
  /** Active page state (`aria-current="page"`). Defaults to `true` for `home`, `false` otherwise. */
  active?: boolean;
  /** Optional visible label override. Defaults to `home` / `ranking` / `configuração`. */
  label?: string;
}

interface NavDestinationConfig {
  defaultLabel: string;
  defaultActive: boolean;
  heightClass: string;
  fontWeightClass: string;
  compactTextClass: string;
  expandedTextClass: string;
  labelWidthClass?: string;
}

const NAV_CONFIG: Record<NavigationItemDestination, NavDestinationConfig> = {
  home: {
    defaultLabel: 'home',
    defaultActive: true,
    heightClass: 'h-[31.5px]',
    fontWeightClass: 'font-(--font-weight-regular)',
    compactTextClass: 'text-(--observed-color-989898)',
    expandedTextClass: 'text-(--white-250)',
  },
  ranking: {
    defaultLabel: 'ranking',
    defaultActive: false,
    heightClass: 'h-[31.5px]',
    fontWeightClass: 'font-(--font-weight-light)',
    compactTextClass: 'text-(--observed-color-c5c5c5)',
    expandedTextClass: 'text-(--black-300)',
    labelWidthClass: 'w-[63px]',
  },
  settings: {
    defaultLabel: 'configuração',
    defaultActive: false,
    heightClass: 'h-[32px]',
    fontWeightClass: 'font-(--font-weight-light)',
    compactTextClass: 'text-(--white-500)',
    expandedTextClass: 'text-(--black-300)',
  },
};

/**
 * Primary sidebar navigation item (`Navigation/Item` — Figma 21:358, 21:362, 21:368, 21:374, 21:378, 21:384).
 * Supports both `compact` (31 px clipped icon rail) and `expanded` (227 px full row)
 * geometries, preserving the Figma token pairings and destination-specific icons.
 */
export function NavigationItem({
  destination,
  context = 'expanded',
  active,
  label,
  type = 'button',
  'aria-label': ariaLabel,
  className = '',
  ...props
}: NavigationItemProps) {
  const config = NAV_CONFIG[destination];
  const isActive = active ?? config.defaultActive;
  const resolvedLabel = label ?? config.defaultLabel;
  const widthClass = context === 'compact' ? 'w-[31px]' : 'w-[227px]';
  const surfaceClass = isActive ? 'bg-(--primary-200)' : 'bg-transparent';
  const textColorClass =
    context === 'compact' ? config.compactTextClass : config.expandedTextClass;
  const iconColorClass = isActive
    ? context === 'compact'
      ? 'text-(--white-550)'
      : 'text-(--white-250)'
    : 'text-(--black-300)';

  return (
    <button
      type={type}
      aria-current={isActive ? 'page' : undefined}
      aria-label={ariaLabel ?? (context === 'compact' ? resolvedLabel : undefined)}
      className={`flex shrink-0 cursor-pointer items-center gap-2 overflow-clip rounded-(--radius-8) p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${widthClass} ${config.heightClass} ${surfaceClass} ${className}`.trim()}
      {...props}
    >
      {destination === 'home' && (
        <span
          className={`relative h-[15.375px] w-[14.566px] shrink-0 ${iconColorClass}`}
          aria-hidden="true"
        >
          <span className="absolute inset-[-3.95%_-4.17%]">
            <HomeIcon />
          </span>
        </span>
      )}
      {destination === 'ranking' && (
        <span
          className={`relative size-[15.25px] shrink-0 ${iconColorClass}`}
          aria-hidden="true"
        >
          <span className="absolute inset-[-3.75%]">
            <RankingPodiumIcon />
          </span>
        </span>
      )}
      {destination === 'settings' && (
        <span
          className={`relative size-[16px] shrink-0 ${iconColorClass}`}
          aria-hidden="true"
        >
          <span className="absolute inset-[-3.75%]">
            <SettingsGearIcon />
          </span>
        </span>
      )}
      <span
        className={`shrink-0 text-left font-[var(--font-sans)] text-[length:var(--font-size-16)] leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap ${config.fontWeightClass} ${textColorClass} ${config.labelWidthClass ?? ''}`.trim()}
      >
        {resolvedLabel}
      </span>
    </button>
  );
}

