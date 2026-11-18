import {
  AccidentBurstIcon,
  BuildingIcon,
  ChevronDownIcon,
  MapIcon,
  RoadRouteIcon,
} from '@/design-system/primitives';
import type {
  SearchGroupedCatalog,
  SearchMunicipalityOption,
  SearchRoadOption,
  SearchRoadStretchOption,
  SearchSelectedItem,
  SearchStateOption,
} from '../types/search';

export interface SearchResultsPopoverProps {
  /** Grouped catalog of states, municipalities, and roads to display. */
  catalog: SearchGroupedCatalog;
  /** IDs of roads whose stretch sub-options are currently expanded. */
  expandedRoadIds: ReadonlySet<string>;
  /** Toggles a road item between collapsed (`25:234`) and expanded (`25:390`) states. */
  onToggleRoadExpanded: (roadId: string) => void;
  /** Invoked when a user selects a state, municipality, whole road, or road stretch. */
  onSelectResult: (item: SearchSelectedItem) => void;
}

/**
 * Grouped search results overlay body implementing Figma `Search/SearchPattern/Results` (`25:234`)
 * and `Search/SearchPattern/RoadOptionsExpanded` (`25:390`).
 */
export function SearchResultsPopover({
  catalog,
  expandedRoadIds,
  onToggleRoadExpanded,
  onSelectResult,
}: SearchResultsPopoverProps) {
  const hasAnyResults =
    catalog.states.length > 0 ||
    catalog.municipalities.length > 0 ||
    catalog.roads.length > 0;

  const handleStateClick = (state: SearchStateOption) => {
    onSelectResult({
      id: state.id,
      category: 'state',
      queryText: state.label,
      displayLabel: state.label,
    });
  };

  const handleMunicipalityClick = (city: SearchMunicipalityOption) => {
    onSelectResult({
      id: city.id,
      category: 'municipality',
      queryText: city.label,
      displayLabel: city.label,
    });
  };

  const handleWholeRoadClick = (road: SearchRoadOption) => {
    onSelectResult({
      id: `${road.id}-whole`,
      category: 'road-whole',
      queryText: road.title,
      displayLabel: `${road.title} ${road.codeLabel}`,
    });
  };

  const handleRoadStretchClick = (
    road: SearchRoadOption,
    stretch: SearchRoadStretchOption,
  ) => {
    onSelectResult({
      id: stretch.id,
      category: 'road-stretch',
      queryText: `${stretch.municipalityLabel} ${stretch.roadCodeLabel}`,
      displayLabel: `${stretch.stateLabel} > ${stretch.municipalityLabel} (${road.title})`,
    });
  };

  if (!hasAnyResults) {
    return (
      <div
        role="status"
        data-slot="search-results-empty"
        className="flex w-[415px] items-center justify-center py-4 text-center"
      >
        <p className="type-body-compact-light text-(--black-300)">
          Nenhum resultado encontrado para a busca.
        </p>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Resultados de busca"
      data-slot="search-results-popover"
      className="flex w-[415px] shrink-0 flex-col items-start gap-[14px]"
    >
      {/* 1. States Group (25:48 / 25:262) */}
      {catalog.states.length > 0 ? (
        <div
          data-slot="search-group-states"
          className="flex w-full shrink-0 flex-col items-start"
        >
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            estados
          </span>

          {catalog.states.map((state) => (
            <button
              key={state.id}
              type="button"
              onClick={() => handleStateClick(state)}
              className="flex h-[24px] w-full shrink-0 cursor-pointer items-center justify-between rounded-(--radius-4) text-left transition-colors hover:bg-(--black-430)/60 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
            >
              <span className="flex shrink-0 items-center gap-[2px]">
                <span
                  aria-hidden="true"
                  className="relative h-[8px] w-[8.889px] shrink-0 text-(--white-250)"
                >
                  <span className="absolute inset-[-4.17%_-3.75%]">
                    <MapIcon />
                  </span>
                </span>
                <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--white-250)">
                  {state.label}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-[2px]">
                <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                  {state.accidentCount}
                </span>
                <span
                  aria-hidden="true"
                  className="relative size-[10px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                >
                  <span className="absolute inset-[8.33%_8.29%_8.33%_8.37%]">
                    <span className="absolute inset-[-3.75%]">
                      <AccidentBurstIcon />
                    </span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {/* 2. Municipalities Group (25:61 / 25:275) */}
      {catalog.municipalities.length > 0 ? (
        <div
          data-slot="search-group-municipalities"
          className="flex w-full shrink-0 flex-col items-start gap-[8px]"
        >
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            municípios
          </span>

          <div className="flex w-full shrink-0 flex-col items-start gap-[4px]">
            {catalog.municipalities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleMunicipalityClick(city)}
                className="flex w-full shrink-0 cursor-pointer items-center justify-between rounded-(--radius-4) py-[6px] text-left transition-colors hover:bg-(--black-430)/60 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
              >
                <span className="flex shrink-0 items-center gap-[2px]">
                  <span
                    aria-hidden="true"
                    className="relative size-[10px] shrink-0 overflow-clip text-(--white-250)"
                  >
                    <span className="absolute inset-[8.33%_8.34%_8.34%_8.33%]">
                      <span className="absolute inset-[-3.75%]">
                        <BuildingIcon />
                      </span>
                    </span>
                  </span>
                  <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--white-250)">
                    {city.label}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-[2px]">
                  <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                    {city.accidentCount}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative size-[10px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                  >
                    <span className="absolute inset-[8.33%_8.29%_8.33%_8.37%]">
                      <span className="absolute inset-[-3.75%]">
                        <AccidentBurstIcon />
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* 3. Roads Group (1:846 collapsed in 1:776 / 1:400 expanded in 1:330) */}
      {catalog.roads.length > 0 ? (
        <div
          data-slot="search-group-roads"
          className="flex w-full shrink-0 flex-col items-start gap-[8px]"
        >
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            rodovias
          </span>

          <div className="flex w-[415px] shrink-0 flex-col items-end justify-center">
            {catalog.roads.map((road) => {
              const isExpanded = expandedRoadIds.has(road.id);

              return (
                <div
                  key={road.id}
                  data-road-expanded={isExpanded}
                  className="flex w-full shrink-0 flex-col items-end justify-center gap-[8px]"
                >
                  {/* Unified Road Header Row (107:1146 in 1:776 / 1:404 in 1:330) */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => onToggleRoadExpanded(road.id)}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-between rounded-(--radius-4) py-[6px] text-left transition-colors hover:bg-(--black-430)/60 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
                  >
                    <span className="flex shrink-0 items-center gap-[2px] whitespace-nowrap">
                      <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) text-(--white-250)">
                        {road.title}
                      </span>
                      <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) text-(--observed-color-d6d6cb)">
                        {road.codeLabel}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-[14px]">
                      <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation)">
                        {road.stretchSummaryLabel}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex shrink-0 items-center justify-center"
                      >
                        <span className="flex-none rotate-180">
                          <span className="relative block h-[4.167px] w-[10.001px] text-(--primary-200)">
                            <span className="absolute inset-[-15%_-6.25%]">
                              <ChevronDownIcon strokeWidth={0.875} />
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Indented Road Stretch Options (1:414 — w: 398px) */}
                  {isExpanded ? (
                    <div
                      data-slot="road-stretch-options"
                      className="flex w-[398px] shrink-0 flex-col items-center justify-center gap-[14px]"
                    >
                      {/* Select Entire Road Option Row (1:416) */}
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleWholeRoadClick(road)}
                          className="flex shrink-0 cursor-pointer items-center rounded-(--radius-4) bg-(--black-420) px-[9px] py-[6px] transition-colors hover:bg-(--black-400) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
                        >
                          <span className="type-context-italic-10-light whitespace-nowrap text-(--white-250)">
                            {road.wholeRoadLabel}
                          </span>
                        </button>

                        <span className="flex shrink-0 items-center gap-[2px]">
                          <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                            {road.wholeRoadAccidentCount}
                          </span>
                          <span
                            aria-hidden="true"
                            className="relative size-[10px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                          >
                            <span className="absolute inset-[8.33%_8.3%_8.33%_8.37%]">
                              <span className="absolute inset-[-3.75%]">
                                <AccidentBurstIcon />
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>

                      {/* Individual Municipality Road Stretches (1:425, 1:440, 1:455) */}
                      {road.stretches.map((stretch) => (
                        <button
                          key={stretch.id}
                          type="button"
                          onClick={() => handleRoadStretchClick(road, stretch)}
                          className="flex w-full shrink-0 cursor-pointer flex-col items-start gap-[6px] rounded-(--radius-4) text-left transition-colors hover:bg-(--black-430)/60 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
                        >
                          <span className="type-context-italic-10-light whitespace-nowrap text-(--black-300)">
                            {stretch.stateLabel}
                          </span>

                          <span className="flex w-full items-center justify-between">
                            <span className="flex shrink-0 items-center gap-[2px]">
                              <span
                                aria-hidden="true"
                                className="flex h-[8px] w-[5.598px] shrink-0 items-center justify-center text-(--text-gray-navigation)"
                              >
                                <span className="flex-none rotate-90">
                                  <span className="relative block h-[5.598px] w-[8px]">
                                    <span className="absolute inset-[-5.36%_-3.75%]">
                                      <RoadRouteIcon />
                                    </span>
                                  </span>
                                </span>
                              </span>

                              <span className="flex shrink-0 items-center gap-[2px] whitespace-nowrap">
                                <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) text-(--white-250)">
                                  {stretch.municipalityLabel}
                                </span>
                                <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) text-(--observed-color-d6d6cb)">
                                  {stretch.roadCodeLabel}
                                </span>
                              </span>
                            </span>

                            <span className="flex shrink-0 items-center gap-[2px]">
                              <span className="font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                                {stretch.accidentCount}
                              </span>
                              <span
                                aria-hidden="true"
                                className="relative size-[10px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                              >
                                <span className="absolute inset-[8.33%_8.3%_8.33%_8.37%]">
                                  <span className="absolute inset-[-3.75%]">
                                    <AccidentBurstIcon />
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

