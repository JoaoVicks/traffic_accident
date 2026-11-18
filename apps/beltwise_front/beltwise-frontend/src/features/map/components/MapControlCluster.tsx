import type { HTMLAttributes } from 'react';
import { MapLocationControl, MapZoomControl } from '@/design-system/primitives';

export interface MapControlClusterProps extends HTMLAttributes<HTMLDivElement> {
  onLocateClick?: () => void;
  onZoomInClick?: () => void;
  onZoomOutClick?: () => void;
}

/**
 * Floating map control group implementing Figma `Map/ControlPattern` (`25:2381`).
 * Composes `MapLocationControl` (`21:64`) and the `white-800` mounting surface (`25:2376`)
 * containing `MapZoomControl` (`zoom-in` `21:73` and `zoom-out` `21:76`).
 */
export function MapControlCluster({
  onLocateClick,
  onZoomInClick,
  onZoomOutClick,
  className = '',
  ...props
}: MapControlClusterProps) {
  return (
    <div
      role="group"
      aria-label="Controles do mapa"
      className={`flex h-(--size-map-controls-group-height) w-[56.104px] flex-col items-center gap-[5.61px] overflow-clip rounded-(--radius-7-481) bg-(--black-450) px-[7.481px] py-[10.286px] shadow-(--shadow-tools) ${className}`.trim()}
      {...props}
    >
      <MapLocationControl onClick={onLocateClick} />

      <div className="flex shrink-0 flex-col items-start gap-[7.481px] overflow-clip rounded-(--radius-11-221) bg-(--white-800) p-[5.61px]">
        <MapZoomControl action="zoom-in" onClick={onZoomInClick} />
        <MapZoomControl action="zoom-out" onClick={onZoomOutClick} />
      </div>
    </div>
  );
}

