import { useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const subscribeNoop = () => () => {};
const getOverlayHost = () => document.getElementById('map-overlay-slot');
const getServerOverlayHost = () => null;

export interface MapOverlaySlotProps {
  children: ReactNode;
}

/**
 * Structural portal slot mounting feature-owned map overlays into
 * `#map-overlay-slot` inside `MapWorkspaceLayout`, keeping map overlay
 * presentation decoupled from the workspace shell.
 */
export function MapOverlaySlot({ children }: MapOverlaySlotProps) {
  const hostElement = useSyncExternalStore(
    subscribeNoop,
    getOverlayHost,
    getServerOverlayHost,
  );

  if (!hostElement) {
    return null;
  }

  return createPortal(children, hostElement);
}
