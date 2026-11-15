import type { ButtonHTMLAttributes } from 'react';
import { InfoQuestionIcon } from '../icons';

export type RankingInfoContext = 'info-closed' | 'info-shown';

export interface RankingInfoControlProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Evidenced info-panel visibility state (`Context=Info closed` | `Context=Info shown`). */
  context?: RankingInfoContext;
}

/**
 * Small information trigger beside the ranking selector (`Control/Ranking info` — Figma 21:105 / 21:108).
 */
export function RankingInfoControl({
  context = 'info-closed',
  type = 'button',
  'aria-label': ariaLabel = 'Informações sobre o ranking',
  'aria-expanded': ariaExpanded,
  className = '',
  ...props
}: RankingInfoControlProps) {
  const isInfoShown = context === 'info-shown';

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded ?? isInfoShown}
      className={`relative size-[15px] shrink-0 cursor-pointer rounded-(--radius-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${
        isInfoShown
          ? 'bg-(--primary-200) text-(--observed-color-383838)'
          : 'bg-(--observed-color-383838) text-(--primary-200)'
      } ${className}`.trim()}
      {...props}
    >
      <InfoQuestionIcon className="absolute inset-0" />
    </button>
  );
}

