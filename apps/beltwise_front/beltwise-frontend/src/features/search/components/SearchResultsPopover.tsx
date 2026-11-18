import {
  AccidentBurstIcon,
  BuildingIcon,
  ChevronDownIcon,
  MapIcon,
  RoadRouteIcon,
} from "@/design-system/primitives";
import type {
  SearchGroupedCatalog,
  SearchMunicipalityOption,
  SearchRoadOption,
  SearchRoadStretchOption,
  SearchSelectedItem,
  SearchStateOption,
} from "../types/search";

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

const RESULT_ROW_BASE_CLASS =
  "group flex w-full shrink-0 cursor-pointer rounded-(--radius-4) text-left transition-[background-color,transform] duration-150 ease-out hover:bg-(--black-430)/70 active:scale-[0.99] active:bg-(--black-430) focus-visible:outline-2 focus-visible:outline-(--primary-200)";

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
      category: "state",
      queryText: state.label,
      displayLabel: state.label,
    });
  };

  const handleMunicipalityClick = (city: SearchMunicipalityOption) => {
    onSelectResult({
      id: city.id,
      category: "municipality",
      queryText: city.label,
      displayLabel: city.label,
    });
  };

  const handleWholeRoadClick = (road: SearchRoadOption) => {
    onSelectResult({
      id: `${road.id}-whole`,
      category: "road-whole",
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
      category: "road-stretch",
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
          className="flex w-full shrink-0 flex-col gap-1.5 items-start"
        >
          <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            estados
          </span>

          {catalog.states.map((state) => (
            <button
              key={state.id}
              type="button"
              onClick={() => handleStateClick(state)}
              className={`${RESULT_ROW_BASE_CLASS} items-center justify-between px-2 py-2.5`}
            >
              <span className="flex shrink-0 items-center gap-[6px]">
                <span
                  aria-hidden="true"
                  className=" h-[18px] w-[18px] shrink-0 text-(--white-250)"
                >
                  <span className="absolute ">
                    <MapIcon className="w-[16px]" />
                  </span>
                </span>
                <span className="font-[var(--font-sans)] text-[16px] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--white-250)">
                  {state.label}
                </span>
              </span>

              <span className="flex shrink-0 items-center justify-center gap-[6px]">
                <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light)  whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                  {state.accidentCount}
                </span>
                <span
                  aria-hidden="true"
                  className="relative size-[18px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                >
                  <span className="absolute">
                    <span className="absolute">
                      <AccidentBurstIcon className="w-[16px]" />
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
          className="flex w-full shrink-0 flex-col items-start gap-1.5"
        >
          <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            municípios
          </span>

          <div className="flex w-full shrink-0 flex-col items-start gap-[4px]">
            {catalog.municipalities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleMunicipalityClick(city)}
                className={`${RESULT_ROW_BASE_CLASS} items-center justify-between px-2 py-2.5`}
              >
                <span className="flex shrink-0 items-center gap-[6px]">
                  <span
                    aria-hidden="true"
                    className="relative size-[18px] shrink-0 overflow-clip text-(--white-250)"
                  >
                    <span className="absolute ">
                      <span className="absolute ">
                        <BuildingIcon className="w-[16px]" />
                      </span>
                    </span>
                  </span>
                  <span className="font-[var(--font-sans)] text-[16px] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--white-250)">
                    {city.label}
                  </span>
                </span>

                <span className="flex shrink-0 items-center justify-center gap-[6px]">
                  <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light)  whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                    {city.accidentCount}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative size-[18px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                  >
                    <span className="absolute">
                      <span className="absolute">
                        <AccidentBurstIcon className="w-[16px]" />
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
          <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-regular) leading-(--line-height-auto) whitespace-nowrap text-(--black-300)">
            rodovias
          </span>

          <div className="flex w-[415px] shrink-0 flex-col items-end justify-center">
            {catalog.roads.map((road) => {
              const isExpanded = expandedRoadIds.has(road.id);

              return (
                <div
                  key={road.id}
                  data-road-expanded={isExpanded}
                  className="flex w-full shrink-0 flex-col items-end justify-center"
                >
                  {/* Unified Road Header Row (107:1146 in 1:776 / 1:404 in 1:330) */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => onToggleRoadExpanded(road.id)}
                    className={`${RESULT_ROW_BASE_CLASS} items-center justify-between px-2 py-2.5 ${
                      isExpanded ? "bg-(--black-430)/35" : ""
                    }`.trim()}
                  >
                    <span className="flex shrink-0 items-center gap-[2px] whitespace-nowrap">
                      <span className="font-[var(--font-sans)] text-[16px] font-(--font-weight-regular) leading-(--line-height-auto) text-(--white-250)">
                        {road.title}
                      </span>
                      <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light) leading-(--line-height-auto) text-(--observed-color-d6d6cb)">
                        {road.codeLabel}
                      </span>
                    </span>

                    <span className="flex  items-center  gap-[14px]">
                      <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation)">
                        {road.stretchSummaryLabel}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-[9px] w-[18px] shrink-0 items-center justify-center text-(--primary-200) transition-transform duration-200 ease-out ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDownIcon />
                      </span>
                    </span>
                  </button>

                  {/* Indented Road Stretch Options (1:414 — w: 398px) */}
                  <div
                    data-slot="road-stretch-options"
                    aria-hidden={!isExpanded}
                    inert={!isExpanded}
                    className={`grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="flex w-full justify-end overflow-hidden">
                      <div className="flex w-[385px] shrink-0 flex-col items-center justify-center gap-[12px] pt-[12px]">
                        {/* Select Entire Road Option Row (1:416) */}
                        <div className="flex w-full shrink-0 items-center pr-3 justify-between">
                          <button
                            type="button"
                            onClick={() => handleWholeRoadClick(road)}
                            className="flex shrink-0 cursor-pointer items-center rounded-(--radius-4) bg-(--black-420) px-[9px] py-[6px] transition-[background-color,transform] duration-150 ease-out hover:bg-(--black-400) active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-(--primary-200)"
                          >
                            <span className=" text-[14px]  whitespace-nowrap text-(--white-250)">
                              selecionar o trecho inteiro
                            </span>
                          </button>

                        <span className="flex shrink-0 items-center gap-[6px]">
                          <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light) leading-(--line-height-auto) whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                            {road.wholeRoadAccidentCount}
                          </span>
                          <span
                            aria-hidden="true"
                            className="relative size-[16px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                          >
                            <span className="absolute ">
                              <span className="absolute ">
                                <AccidentBurstIcon  className="w-[16px]"/>
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
                          className={`${RESULT_ROW_BASE_CLASS} flex-col items-start gap-[6px] px-2.5 py-2.5`}
                        >
                          <span className="text-[14px] whitespace-nowrap text-(--black-300)">
                            {stretch.stateLabel}
                          </span>

                          <span className="flex w-full items-center justify-between">
                            <span className="flex shrink-0 items-center gap-[2px]">
                              <span
                                aria-hidden="true"
                                className="flex h-[8px] w-[5.598px] shrink-0 items-center justify-center text-(--text-gray-navigation)"
                              >
                                <span className="flex-none rotate-90">
                                  <span className="relative block w-[16px]">
                                    <span className="absolute">
                                      <RoadRouteIcon  className="w-[16px]"/>
                                    </span>
                                  </span>
                                </span>
                              </span>

                              <span className="flex shrink-0 items-center gap-[2px] whitespace-nowrap">
                                <span className="font-[var(--font-sans)] text-[16px] font-(--font-weight-regular) leading-(--line-height-auto) text-(--white-250)">
                                  {stretch.municipalityLabel}
                                </span>
                                <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light) leading-(--line-height-auto) text-(--observed-color-d6d6cb)">
                                  {stretch.roadCodeLabel}
                                </span>
                              </span>
                            </span>

                            <span className="flex shrink-0 items-center justify-center gap-[6px]">
                              <span className="font-[var(--font-sans)] text-[14px] font-(--font-weight-light)  whitespace-nowrap text-(--text-gray-navigation) tabular-nums">
                                {stretch.accidentCount}
                              </span>
                              <span
                                aria-hidden="true"
                                className="relative size-[18px] shrink-0 overflow-clip text-(--text-gray-navigation)"
                              >
                                <span className="absolute">
                                  <span className="absolute">
                                    <AccidentBurstIcon className="w-[16px]" />
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </button>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
