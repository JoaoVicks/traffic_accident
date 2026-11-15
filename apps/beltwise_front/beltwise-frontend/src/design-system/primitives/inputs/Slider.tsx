import { useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { SeverityThumbIcon } from '../icons';

const SEVERITY_SEGMENTS = [
  { index: 0, colorClass: 'bg-(--primary-500)' },
  { index: 1, colorClass: 'bg-(--primary-400)' },
  { index: 2, colorClass: 'bg-(--primary-200)' },
  { index: 3, colorClass: 'bg-(--primary-100)' },
] as const;

const THUMB_BASE_OFFSET_PX = 6;
const SEGMENT_STEP_PX = 94.75; // 90.75px segment + 4px gap

export interface SeveritySliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'step' | 'value' | 'defaultValue'
  > {
  /** Controlled severity segment index (`0` to `3`). */
  value?: number;
  /** Uncontrolled initial severity segment index (`0` to `3`). Defaults to `0` per Figma. */
  defaultValue?: number;
}

function clampSeverityIndex(raw: number): number {
  if (Number.isNaN(raw)) return 0;
  return Math.min(3, Math.max(0, Math.round(raw)));
}

/**
 * Four-segment severity threshold slider (`Control/Slider severity` — Figma 21:346).
 * Renders the 4 semantic primary severity segments (`primary - 500`, `400`, `200`, `100`)
 * with full opacity on the selected segment, `0.52` opacity on inactive segments, and the
 * upward pointer thumb backed by a keyboard-accessible native range input.
 */
export function SeveritySlider({
  value,
  defaultValue = 0,
  onChange,
  'aria-label': ariaLabel = 'Severidade',
  className = '',
  ...props
}: SeveritySliderProps) {
  const [internalValue, setInternalValue] = useState<number>(() =>
    clampSeverityIndex(defaultValue),
  );
  const activeIndex = clampSeverityIndex(value ?? internalValue);
  const thumbLeftPx = THUMB_BASE_OFFSET_PX + activeIndex * SEGMENT_STEP_PX;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = clampSeverityIndex(Number(event.currentTarget.value));
    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(event);
  }

  return (
    <div
      className={`relative h-[30px] w-[375px] shrink-0 rounded-(--radius-12) has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--primary-200) ${className}`.trim()}
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 flex h-[8px] w-[375px] -translate-x-1/2 items-center gap-1"
        aria-hidden="true"
      >
        {SEVERITY_SEGMENTS.map((segment) => (
          <div
            key={segment.index}
            className={`h-[8px] w-[90.75px] shrink-0 rounded-(--radius-4) ${segment.colorClass} ${
              segment.index === activeIndex ? 'opacity-100' : 'opacity-[0.52]'
            }`}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8px] h-[22px] w-[14.08px] text-(--white-250) transition-[left] duration-150"
        style={{ left: `${thumbLeftPx}px` }}
      >
        <div className="absolute inset-[4.85%_0_0_0]">
          <SeverityThumbIcon />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={3}
        step={1}
        value={activeIndex}
        aria-label={ariaLabel}
        onChange={handleChange}
        className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}

