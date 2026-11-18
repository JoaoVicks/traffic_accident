import { cn } from 'cn';
import type { RankingEntry } from '../types/ranking';

export interface RankingPodiumProps {
  /** Ranked entries; uses positions 1, 2, and 3 (`entries[0]`, `entries[1]`, `entries[2]`). */
  entries: readonly RankingEntry[];
  className?: string;
}

/**
 * Top-3 podium visualization matching Figma `Ranking/Podium` (`23:886` / `1:2212`).
 * Renders 2nd place on the left (`#484848`), 1st place in the center (`gradient-contextual-7`
 * + `shadow-contextual-4`), and 3rd place on the right (`#383838`) inside a `310 × 117 px` card.
 */
export function RankingPodium({ entries, className }: RankingPodiumProps) {
  const first = entries[0];
  const second = entries[1];
  const third = entries[2];

  if (!first) {
    return null;
  }

  return (
    <div
      aria-label="Pódio do ranking"
      data-slot="ranking-podium"
      className={cn(
        'relative h-[117px] w-full shrink-0 overflow-clip rounded-(--radius-10) bg-(--black-430)',
        className,
      )}
    >
      {/* 2nd Place (Left Column) */}
      {second ? (
        <>
          <span
            title={second.name}
            className="absolute top-[54px] left-[calc(50%-70.5px)] max-w-[74px] -translate-x-1/2 -translate-y-1/2 truncate text-center font-[var(--font-sans)] text-[length:var(--font-size-11-700)] font-(--font-weight-regular) leading-none text-(--white-250)"
          >
            {second.name}
          </span>
          <div className="absolute top-[65px] left-[calc(50%-70.5px)] h-[82px] w-[63px] -translate-x-1/2 rounded-(--radius-8) bg-(--black-380)" />
          <span className="absolute top-[82px] left-[calc(50%-70.5px)] -translate-x-1/2 -translate-y-1/2 font-[var(--font-sans)] text-[length:var(--font-size-20)] font-(--font-weight-semibold) leading-none text-(--white-250)">
            {second.position}°
          </span>
        </>
      ) : null}

      {/* 3rd Place (Right Column) */}
      {third ? (
        <>
          <span
            title={third.name}
            className="absolute top-[69.5px] left-[calc(50%+69.5px)] max-w-[74px] -translate-x-1/2 -translate-y-1/2 truncate text-center font-[var(--font-sans)] text-[length:var(--font-size-9-778)] font-(--font-weight-regular) leading-none text-(--white-250)"
          >
            {third.name}
          </span>
          <div className="absolute top-[79px] left-[calc(50%+69.5px)] h-[79px] w-[63px] -translate-x-1/2 rounded-(--radius-8) bg-(--black-400)" />
          <span className="absolute top-[95px] left-[calc(50%+69.5px)] -translate-x-1/2 -translate-y-1/2 font-[var(--font-sans)] text-[length:var(--font-size-17-679)] font-(--font-weight-semibold) leading-none text-(--observed-color-ffffff)">
            {third.position}°
          </span>
        </>
      ) : null}

      {/* 1st Place (Center Column) */}
      <span
        title={first.name}
        className="absolute top-[28px] left-[calc(50%-0.5px)] max-w-[92px] -translate-x-1/2 -translate-y-1/2 truncate text-center font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-none text-(--white-250)"
      >
        {first.name}
      </span>
      <div className="absolute top-[38px] left-[calc(50%-0.5px)] h-[92px] w-[71px] -translate-x-1/2 rounded-(--radius-8) bg-[image:var(--gradient-contextual-7)] shadow-(--shadow-contextual-4)" />
      <span className="absolute top-[62px] left-[calc(50%-0.5px)] -translate-x-1/2 -translate-y-1/2 font-[var(--font-sans)] text-[length:var(--font-size-26)] font-(--font-weight-semibold) leading-none text-(--white-250)">
        {first.position}°
      </span>
    </div>
  );
}

