import type { ButtonHTMLAttributes } from 'react';
import { FilterLinesIcon } from '../icons';

export type RankingFilterControlProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

/**
 * Unsurfaced ranking filter icon action (`Control/Ranking filter` — Figma 21:118).
 */
export function RankingFilterControl({
  type = 'button',
  'aria-label': ariaLabel = 'Filtrar ranking',
  className = '',
  ...props
}: RankingFilterControlProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`relative size-[19px] shrink-0 cursor-pointer bg-transparent text-(--observed-color-cfc9c9) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${className}`.trim()}
      {...props}
    >
      <FilterLinesIcon className="absolute inset-0" />
    </button>
  );
}

