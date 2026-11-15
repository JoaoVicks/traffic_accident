import type { ButtonHTMLAttributes } from 'react';
import { LocationUserIcon } from '../icons';

export type MapLocationControlProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

/**
 * Square map location icon action (`Control/Map location` — Figma 21:64).
 * Renders an orange (`primary-200`) 41 × 41 px surface with `location-user` glyph.
 */
export function MapLocationControl({
  type = 'button',
  'aria-label': ariaLabel = 'Centralizar localização no mapa',
  className = '',
  ...props
}: MapLocationControlProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`relative size-[41px] shrink-0 cursor-pointer overflow-clip rounded-(--radius-11-221) bg-(--primary-200) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--white-250) disabled:cursor-not-allowed ${className}`.trim()}
      {...props}
    >
      <span
        className="absolute top-1/2 left-1/2 size-[24.312px] -translate-x-1/2 -translate-y-1/2 overflow-clip text-(--white-800)"
        aria-hidden="true"
      >
        <span className="absolute inset-[8.33%_16.68%_8.33%_16.66%]">
          <span className="absolute inset-[-3.46%_-4.33%]">
            <LocationUserIcon />
          </span>
        </span>
      </span>
    </button>
  );
}

