import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import {
  SearchFilterControl,
  TextField,
  type SearchFilterContext,
  type VehicleChoiceOption,
} from '@/design-system/primitives';
import {
  DEFAULT_SEARCH_QUERY,
  DEFAULT_WORKSPACE_FILTER_STATE,
  SEARCH_REFERENCE_CATALOG,
} from '../data/searchReferenceData';
import type {
  ActiveSearchPopover,
  FilterTimeMode,
  SearchGroupedCatalog,
  SearchSelectedItem,
  WorkspaceFilterState,
} from '../types/search';
import { FilterPopoverPanel } from './FilterPopoverPanel';
import { SearchResultsPopover } from './SearchResultsPopover';

function normalizeSearchToken(value: string): string {
  return value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/´/g, '')
    .toLowerCase();
}

function filterSearchCatalog(
  catalog: SearchGroupedCatalog,
  rawQuery: string,
): SearchGroupedCatalog {
  const query = normalizeSearchToken(rawQuery);
  if (!query || query === 'sao') {
    return catalog;
  }

  const matchesKeyword = (
    label: string,
    keywords: readonly string[],
  ): boolean => {
    if (normalizeSearchToken(label).includes(query)) {
      return true;
    }
    return keywords.some((keyword) =>
      normalizeSearchToken(keyword).includes(query),
    );
  };

  const states = catalog.states.filter((item) =>
    matchesKeyword(item.label, item.keywords),
  );

  const municipalities = catalog.municipalities.filter((item) =>
    matchesKeyword(item.label, item.keywords),
  );

  const roads = catalog.roads
    .map((road) => {
      const roadHeaderMatches =
        matchesKeyword(road.title, road.keywords) ||
        matchesKeyword(road.codeLabel, road.keywords);

      const matchingStretches = road.stretches.filter((stretch) =>
        matchesKeyword(stretch.municipalityLabel, stretch.keywords),
      );

      if (roadHeaderMatches) {
        return road;
      }

      if (matchingStretches.length > 0) {
        return {
          ...road,
          stretches: matchingStretches,
        };
      }

      return null;
    })
    .filter((road): road is NonNullable<typeof road> => road !== null);

  return { states, municipalities, roads };
}

export interface SearchAndFilterBarProps {
  /** Initial search input value. Defaults to `"São"` per Figma (`1:470`, `1:24`, `1:974`). */
  defaultQuery?: string;
  /** Initial open popover state for testing/showcase inspection. Defaults to `null` (collapsed). */
  defaultActivePopover?: ActiveSearchPopover;
  /** Optional override for the filter button surface context (`search` vs `incident-detail`). */
  filterContext?: SearchFilterContext;
  /** Optional callback fired when a search result option is selected. */
  onSelectSearchResult?: (selection: SearchSelectedItem) => void;
  /** Optional callback fired when local filter values change. */
  onFilterStateChange?: (filters: WorkspaceFilterState) => void;
  className?: string;
}

/**
 * Shared 437px search and filter bar (`Frame 427318927`) used across Search, Analytics,
 * and Accident Detail routes inside `SearchableWorkspaceLayout`.
 *
 * Reserves a fixed `437 × 49 px` layout box so opening the Search Results (`25:234` / `25:390`)
 * or Filter Popover (`25:485` / `1:1280`) overlays underlying page content without pushing it down.
 */
export function SearchAndFilterBar({
  defaultQuery = DEFAULT_SEARCH_QUERY,
  defaultActivePopover = null,
  filterContext,
  onSelectSearchResult,
  onFilterStateChange,
  className = '',
}: SearchAndFilterBarProps) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedFilterContext: SearchFilterContext =
    filterContext ??
    (location.pathname.startsWith('/accidents') ? 'incident-detail' : 'search');

  const [query, setQuery] = useState<string>(() => {
    const contextParam = searchParams.get('context');
    if (
      location.pathname.startsWith('/accidents') ||
      contextParam === 'state' ||
      contextParam === 'road'
    ) {
      return 'Dutra';
    }
    return defaultQuery;
  });
  const [activePopover, setActivePopover] =
    useState<ActiveSearchPopover>(defaultActivePopover);
  const [expandedRoadIds, setExpandedRoadIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [filters, setFilters] = useState<WorkspaceFilterState>(
    DEFAULT_WORKSPACE_FILTER_STATE,
  );

  const filteredCatalog = useMemo(
    () => filterSearchCatalog(SEARCH_REFERENCE_CATALOG, query),
    [query],
  );

  // Close active popover when clicking outside or pressing Escape
  useEffect(() => {
    if (activePopover === null) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setActivePopover(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePopover(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePopover]);

  const updateFilters = (
    updater: (prev: WorkspaceFilterState) => WorkspaceFilterState,
  ) => {
    setFilters((prev) => {
      const next = updater(prev);
      onFilterStateChange?.(next);
      return next;
    });
  };

  const handleToggleRoadExpanded = (roadId: string) => {
    setExpandedRoadIds((prev) => {
      const next = new Set(prev);
      if (next.has(roadId)) {
        next.delete(roadId);
      } else {
        next.add(roadId);
      }
      return next;
    });
  };

  const handleSelectResult = (item: SearchSelectedItem) => {
    setQuery(item.queryText);
    setActivePopover(null);

    if (location.pathname === '/') {
      const nextContext =
        item.category === 'state'
          ? 'state'
          : item.category === 'road-whole' || item.category === 'road-stretch'
            ? 'road'
            : 'search';

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('context', nextContext);
          return next;
        },
        { replace: true },
      );
    }

    onSelectSearchResult?.(item);
  };

  const handleTimeModeChange = (timeMode: FilterTimeMode) => {
    updateFilters((prev) => ({ ...prev, timeMode }));
  };

  const handleYearChange = (year: string) => {
    updateFilters((prev) => ({ ...prev, year }));
  };

  const handleStartDateChange = (startDate: string) => {
    updateFilters((prev) => ({ ...prev, startDate }));
  };

  const handleEndDateChange = (endDate: string) => {
    updateFilters((prev) => ({ ...prev, endDate }));
  };

  const handleToggleVehicle = (vehicle: VehicleChoiceOption) => {
    updateFilters((prev) => {
      const exists = prev.selectedVehicles.includes(vehicle);
      const selectedVehicles = exists
        ? prev.selectedVehicles.filter((item) => item !== vehicle)
        : [...prev.selectedVehicles, vehicle];
      return { ...prev, selectedVehicles };
    });
  };

  const handleSeverityChange = (severityIndex: number) => {
    updateFilters((prev) => ({ ...prev, severityIndex }));
  };

  const isSearchOpen = activePopover === 'search';
  const isFilterOpen = activePopover === 'filter';
  const isAnyPopoverOpen = isSearchOpen || isFilterOpen;

  return (
    <div
      ref={containerRef}
      data-slot="search-and-filter-bar-anchor"
      data-active-popover={activePopover ?? 'none'}
      className={`relative z-20 h-[49px] w-(--size-panel-analytics-summary-width) shrink-0 ${className}`.trim()}
    >
      {/* Unified floating surface (Frame 427318927): 437×49px collapsed, expands as overlay when open */}
      <div
        data-slot="search-and-filter-surface"
        className={`absolute top-0 left-0 flex w-(--size-panel-analytics-summary-width) flex-col items-center rounded-(--radius-10) bg-(--black-450) px-[8px] pt-[8px] shadow-(--shadow-tools) ${
          isAnyPopoverOpen ? 'gap-[16px] pb-[30px]' : 'pb-[8px]'
        }`}
      >
        {/* Query and Filter Action Row (421 × 33 px at x: 8, y: 8) */}
        <div
          data-slot="search-query-row"
          className="flex h-(--size-search-action-row-height) w-(--size-search-action-row-width) shrink-0 items-center gap-[12px]"
        >
          <TextField
            value={query}
            aria-expanded={isSearchOpen}
            aria-haspopup="listbox"
            onFocus={() => setActivePopover('search')}
            onClick={() => setActivePopover('search')}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setActivePopover('search');
            }}
          />

          <SearchFilterControl
            context={resolvedFilterContext}
            aria-expanded={isFilterOpen}
            aria-haspopup="dialog"
            onClick={() =>
              setActivePopover((prev) => (prev === 'filter' ? null : 'filter'))
            }
          />
        </div>

        {/* Search Results Overlay Body (25:234 / 25:390 — 415px wide at y: 57) */}
        {isSearchOpen ? (
          <SearchResultsPopover
            catalog={filteredCatalog}
            expandedRoadIds={expandedRoadIds}
            onToggleRoadExpanded={handleToggleRoadExpanded}
            onSelectResult={handleSelectResult}
          />
        ) : null}

        {/* Filter Popover Overlay Body (25:485 / 1:1291 — 415 × 404px at y: 57) */}
        {isFilterOpen ? (
          <FilterPopoverPanel
            filters={filters}
            onTimeModeChange={handleTimeModeChange}
            onYearChange={handleYearChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onToggleVehicle={handleToggleVehicle}
            onSeverityChange={handleSeverityChange}
          />
        ) : null}
      </div>
    </div>
  );
}

