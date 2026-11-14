import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { BuildingIcon, MapIcon, RoadRouteIcon } from '../icons';

export type RankingTabCategory = 'cities' | 'states' | 'roads';

export interface RankingTabItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Ranking tab category (`Tabs/Ranking item` — Figma 21:249, 21:253, 21:257). */
  category: RankingTabCategory;
  /** Selection state (`aria-selected`). Defaults to Figma evidenced state (`true` for `cities`). */
  selected?: boolean;
  /** Optional visible label override. Defaults to `cidades` / `estados` / `estradas`. */
  label?: string;
}

interface RankingTabConfig {
  defaultLabel: string;
  defaultSelected: boolean;
  widthClass: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const RANKING_TAB_CONFIG: Record<RankingTabCategory, RankingTabConfig> = {
  cities: {
    defaultLabel: 'cidades',
    defaultSelected: true,
    widthClass: 'w-[76px]',
    Icon: MapIcon,
  },
  states: {
    defaultLabel: 'estados',
    defaultSelected: false,
    widthClass: 'w-[65.5px]',
    Icon: BuildingIcon,
  },
  roads: {
    defaultLabel: 'estradas',
    defaultSelected: false,
    widthClass: 'w-[70.5px]',
    Icon: RoadRouteIcon,
  },
};

/**
 * Single ranking category tab trigger (`Tabs/Ranking item` — Figma 21:249, 21:253, 21:257).
 * Uses `currentColor` SVG icon components so selected (`white - 800`) and unselected
 * (`black - 300`) icon colors follow CSS state classes.
 */
export function RankingTabItem({
  category,
  selected,
  label,
  type = 'button',
  className = '',
  ...props
}: RankingTabItemProps) {
  const config = RANKING_TAB_CONFIG[category];
  const { Icon } = config;
  const isSelected = selected ?? config.defaultSelected;
  const resolvedLabel = label ?? config.defaultLabel;
  const stateClasses = isSelected
    ? 'bg-(--primary-200) text-(--white-800)'
    : 'bg-transparent text-(--black-300)';

  return (
    <button
      type={type}
      role="tab"
      aria-selected={isSelected}
      className={`flex h-[21px] shrink-0 cursor-pointer items-center justify-center
         gap-1 rounded-(--radius-5-972) px-12 py-4 font-[var(--font-sans)] 
         text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-auto) 
         tracking-(--letter-spacing-0) whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 
         focus-visible:outline-(--primary-200) disabled:cursor-not-allowed
          ${config.widthClass} ${stateClasses} ${className}`.trim()}
      {...props}
    >
      {category === 'cities' && (
        <span className="relative size-[16px] shrink-0" aria-hidden="true">
          <span className="absolute inset-[-3.75%]">
            <Icon />
          </span>
        </span>
      )}
      {category === 'states' && (
        <span className="relative h-[14px] w-[15.5px] shrink-0" aria-hidden="true">
          <span className="absolute inset-[-4.17%_-3.75%]">
            <Icon />
          </span>
        </span>
      )}
      {category === 'roads' && (
        <span
          className="flex h-[15px] w-[10.5px] shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          <span className="flex-none rotate-90">
            <span className="relative block h-[10.5px] w-[15px]">
              <span className="absolute inset-[-5.36%_-3.75%]">
                <Icon />
              </span>
            </span>
          </span>
        </span>
      )}
      <span className='font-medium'>{resolvedLabel}</span>
    </button>
  );
}

