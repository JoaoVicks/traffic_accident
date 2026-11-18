import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { SearchAndFilterBar } from '@/features/search';

export interface SearchableWorkspaceLayoutProps {
  children?: ReactNode;
}

/**
 * Nested structural layout inside `MapWorkspaceLayout` for routes that share
 * the top `437px` Search and Filter bar (Explore/Analytics and Accident Detail).
 *
 * Positions `SearchAndFilterBar` at `(91, 48)` with a `14px` vertical gap before
 * the route `<Outlet />` (`y: 111px` in Figma `1:24`, `1:470`, `1:974`, `1:2850`),
 * allowing search and filter popovers to overlay `<Outlet />` without pushing it down.
 */
export function SearchableWorkspaceLayout({
  children,
}: SearchableWorkspaceLayoutProps) {
  return (
    <div
      data-slot="searchable-workspace-layout"
      className="relative flex w-(--size-panel-analytics-summary-width) flex-col items-start gap-[14px]"
    >
      <SearchAndFilterBar />

      <div
        data-slot="searchable-workspace-outlet"
        className="relative z-10 w-full"
      >
        {children ?? <Outlet />}
      </div>
    </div>
  );
}

