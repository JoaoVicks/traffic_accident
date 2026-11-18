import { cn } from 'cn';

export interface RankingInfoPanelProps {
  /** Explanatory text describing the active ranking metric (`1:2445`). */
  description: string;
  className?: string;
}

/**
 * Inline expandable information disclosure (`1:2445` in Figma S11 `1:2286`).
 * Renders inline between the metric controls row and the podium divider.
 */
export function RankingInfoPanel({
  description,
  className,
}: RankingInfoPanelProps) {
  return (
    <div
      role="region"
      aria-label="Explicação da métrica de ranking"
      data-slot="ranking-info-panel"
      className={cn(
        'flex w-full shrink-0 items-center overflow-clip rounded-(--radius-12) bg-(--black-430) px-[12px] py-[14px]',
        className,
      )}
    >
      <p className="type-caption-legacy-10-regular leading-[1.35] text-(--white-500)">
        {description}
      </p>
    </div>
  );
}

