import type { ButtonHTMLAttributes } from 'react';
import { ZoomInIcon, ZoomOutIcon } from '../icons';

export type MapZoomAction = 'zoom-in' | 'zoom-out';

export interface MapZoomControlProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Zoom direction variant (`Action=Zoom in` | `Action=Zoom out`). */
  action?: MapZoomAction;
}

/**
 * Individual map zoom control (`Control/Map zoom` — Figma 21:73 / 21:76).
 * Transparent zoom-in assumes a `white-800` parent mounting surface; zoom-out retains its `#FFFC8F` inset.
 */
export function MapZoomControl({
  action = 'zoom-in',
  type = 'button',
  'aria-label': ariaLabel,
  className = '',
  ...props
}: MapZoomControlProps) {
  const isZoomOut = action === 'zoom-out';
  const defaultLabel = isZoomOut ? 'Diminuir zoom' : 'Aumentar zoom';

  return (
    <button
      type={type}
      aria-label={ariaLabel ?? defaultLabel}
      className={`relative size-(--size-map-zoom-control) shrink-0 cursor-pointer 
         rounded-(--radius-7-481) focus-visible:outline-2 focus-visible:outline-offset-1
         focus-visible:outline-(--black-500) disabled:cursor-not-allowed ${
        isZoomOut ? 'bg-(--observed-color-fffc8f) text-(--black-420)' : 'text-(--black-450)'
      } ${className}`.trim()}
      {...props}
    >
      {isZoomOut ? (
        <ZoomOutIcon className="absolute inset-0  text-black" />
      ) : (
        <ZoomInIcon className="absolute inset-0 text-black" />
      )}
    </button>
  );
}

