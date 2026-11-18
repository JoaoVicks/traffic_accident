import { useEffect, useRef, useState } from 'react';
import { cn } from 'cn';
import { RankingSelect } from '@/design-system/primitives';
import type { RankingMetricId, RankingMetricOption } from '../types/ranking';

export interface RankingMetricSelectorProps {
  /** Available ranking sort metric options. */
  options: readonly RankingMetricOption[];
  /** Currently selected metric ID. */
  value: RankingMetricId;
  /** Callback fired when the user picks a metric option. */
  onChange: (metricId: RankingMetricId) => void;
  className?: string;
}

/**
 * Ranking metric dropdown (`Control/Select ranking` + `1:2605` overlay menu).
 * Opens an overlay listbox without pushing underlying podium/list content down.
 */
export function RankingMetricSelector({
  options,
  value,
  onChange,
  className,
}: RankingMetricSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.id === value) ?? options[0];
  const menuOptions = options.filter((option) => option.id !== value);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectOption = (metricId: RankingMetricId) => {
    onChange(metricId);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      data-slot="ranking-metric-selector"
      className={cn('relative inline-flex shrink-0', className)}
    >
      <RankingSelect
        context={isOpen ? 'open' : 'closed'}
        label={selectedOption?.triggerLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={isOpen ? 'w-auto min-w-[154px]' : 'w-auto min-w-[144px]'}
      />

      {isOpen ? (
        <div
          role="listbox"
          aria-label="Métricas do ranking"
          data-slot="ranking-metric-menu"
          className="absolute top-[calc(100%+8px)] left-0 z-20 flex w-[214px] flex-col items-start gap-[10px] overflow-clip rounded-(--radius-9) bg-(--black-430) px-[10px] pt-[6px] pb-[12px] shadow-(--shadow-contextual-5)"
        >
          {menuOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => handleSelectOption(option.id)}
              className="flex w-full shrink-0 cursor-pointer items-center justify-start rounded-(--radius-4) py-[6px] text-left font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) text-(--observed-color-c2c2c2) transition-colors hover:text-(--white-250) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
            >
              {option.menuLabel}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

