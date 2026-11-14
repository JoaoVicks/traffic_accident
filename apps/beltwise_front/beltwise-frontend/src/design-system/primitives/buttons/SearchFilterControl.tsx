import type { ButtonHTMLAttributes } from 'react';
import { FilterSlidersIcon } from '../icons';

export type SearchFilterContext = 'search' | 'incident-detail';

export interface SearchFilterControlProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Contextual background surface (`Context=Search` -> `primary-200`, `Context=Incident detail` -> `primary-300`). */
  context?: SearchFilterContext;
}

/**
 * Compact filter trigger adjacent to the query input (`Control/Search filter` — Figma 21:89 / 21:95).
 */
export function SearchFilterControl({
  context = 'search',
  type = 'button',
  'aria-label': ariaLabel = 'Abrir filtros de busca',
  className = '',
  ...props
}: SearchFilterControlProps) {
  const isIncidentDetail = context === 'incident-detail';

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`inline-flex size-(--size-search-filter-action) shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-(--radius-6) p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--white-250) disabled:cursor-not-allowed ${
        isIncidentDetail ? 'bg-(--primary-300)' : 'bg-(--primary-200)'
      } ${className}`.trim()}
      {...props}
    >
      <span
        className="flex size-[19px] shrink-0 items-center justify-center text-(--white-550)"
        aria-hidden="true"
      >
        <span className="flex-none rotate-90">
          <span className="relative block size-[19px] overflow-clip">
            <span
              className={`absolute ${
                isIncidentDetail
                  ? 'inset-[16.67%_12.49%_16.67%_12.51%]'
                  : 'inset-[16.67%_12.49%_16.66%_12.51%]'
              }`}
            >
              <span className="absolute inset-[-4.3%_-3.82%]">
                <FilterSlidersIcon />
              </span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

