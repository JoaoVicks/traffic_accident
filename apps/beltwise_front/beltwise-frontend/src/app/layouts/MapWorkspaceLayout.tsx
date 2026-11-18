import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import {
  MapControlCluster,
  MapViewportPlaceholder,
  WorkspaceSidebarNav,
} from '@/features/map';

export interface MapWorkspaceLayoutProps {
  children?: ReactNode;
}

/**
 * Persistent desktop workspace layout shell for Beltwise product routes.
 * Owns the background map viewport region, floating left sidebar navigation (`25:2286` / `25:2349`),
 * floating right map controls (`25:2381`), and the scrollable left content slot (`Outlet`).
 */
export function MapWorkspaceLayout({ children }: MapWorkspaceLayoutProps) {
  return (
    <div
      data-slot="map-workspace-layout"
      className="relative h-screen w-screen min-w-[1024px] overflow-hidden bg-(--background-canvas) text-(--text-primary)"
    >
      {/* Persistent Map Workspace Layer (x: 0, y: 0, full viewport) */}
      <MapViewportPlaceholder />

      {/* Portal target for feature-owned map overlays (e.g., IncidentMapCard) */}
      <div
        id="map-overlay-slot"
        data-slot="map-overlay-slot"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      />

      {/* Persistent Floating Sidebar Navigation (Figma x: 20, y: 48) */}
      <div className="fixed top-[48px] left-[20px] z-30">
        <WorkspaceSidebarNav />
      </div>

      {/* Scrollable Left Workspace Content Slot (Figma x: 91, y: 48) */}
      <div className="pointer-events-none relative z-10 h-full w-full overflow-y-auto pt-[48px] pr-[112px] pb-[48px] pl-[91px]">
        <main
          aria-label="Conteúdo da página"
          data-slot="workspace-content-area"
          className="pointer-events-auto w-fit"
        >
          {children ?? <Outlet />}
        </main>
      </div>

      {/* Persistent Floating Map Control Cluster (Figma x: 1343.9 -> right: 40px, y: 549px) */}
      <div className="fixed top-[min(549px,calc(100vh-184px))] right-[40px] z-20">
        <MapControlCluster />
      </div>
    </div>
  );
}

