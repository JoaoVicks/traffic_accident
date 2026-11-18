import type { HTMLAttributes, ReactNode } from 'react';

export interface MapViewportPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Structural placeholder reserving the full-viewport map canvas (`Basemap image` +
 * `Rectangle 4145` dimming overlay `--gradient-contextual-4` in Figma `Page 1`).
 * Keeps the map surface independent from analytics, ranking, and accident feature modules.
 */
export function MapViewportPlaceholder({
  children,
  className = '',
  ...props
}: MapViewportPlaceholderProps) {
  return (
    <div
      role="region"
      aria-label="Área do mapa"
      data-slot="map-workspace-region"
      className={`absolute inset-0 z-0 overflow-hidden bg-(--background-canvas) select-none ${className}`.trim()}
      {...props}
    >
      {/* Dedicated mount slot for future map engine integration */}
      <div
        data-slot="map-canvas"
        aria-hidden="true"
        className="size-full bg-(--black-450)"
        style={{
          backgroundImage:
            'radial-gradient(circle at 65% 42%, var(--black-430) 0%, var(--black-450) 60%, var(--black-500) 100%)',
        }}
      />

      {/* Figma map dimming overlay (Rectangle 4145 — 1:329) */}
      <div
        aria-hidden="true"
        data-slot="map-dimming-overlay"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'var(--gradient-contextual-4)',
        }}
      />

      {children}
    </div>
  );
}

