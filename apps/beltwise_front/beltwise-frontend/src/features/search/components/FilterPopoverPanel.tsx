import {
  BrokenBoneIcon,
  CarIcon,
  ChevronDownIcon,
  ClockIcon,
  SeveritySlider,
  VehicleChoiceChip,
  type VehicleChoiceOption,
} from '@/design-system/primitives';
import {
  FILTER_SEVERITY_LABELS,
  FILTER_VEHICLE_ORDER,
  FILTER_YEAR_OPTIONS,
} from '../data/searchReferenceData';
import type { FilterTimeMode, WorkspaceFilterState } from '../types/search';

export interface FilterPopoverPanelProps {
  filters: WorkspaceFilterState;
  onTimeModeChange: (mode: FilterTimeMode) => void;
  onYearChange: (year: string) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
  onToggleVehicle: (vehicle: VehicleChoiceOption) => void;
  onSeverityChange: (severityIndex: number) => void;
}

/**
 * Filter overlay panel implementing Figma `Filters/FilterPattern` (`25:485` / `1:1291`).
 * Composes Time (`ano` / `período`), Vehicle category chips (`VehicleChoiceChip`),
 * and Severity threshold slider (`SeveritySlider`) within the `415 × 404 px` frame.
 */
export function FilterPopoverPanel({
  filters,
  onTimeModeChange,
  onYearChange,
  onStartDateChange,
  onEndDateChange,
  onToggleVehicle,
  onSeverityChange,
}: FilterPopoverPanelProps) {
  const selectedVehicleCount = filters.selectedVehicles.length;
  const selectedCountLabel =
    selectedVehicleCount === 1
      ? '1 selecionado'
      : `${selectedVehicleCount} selecionados`;

  const severityLabel =
    FILTER_SEVERITY_LABELS[filters.severityIndex] ?? FILTER_SEVERITY_LABELS[0];

  const isYearMode = filters.timeMode === 'year';
  const isPeriodMode = filters.timeMode === 'period';

  const handleToggleTimeMode = (targetMode: 'year' | 'period') => {
    onTimeModeChange(filters.timeMode === targetMode ? null : targetMode);
  };

  return (
    <div
      role="region"
      aria-label="Filtros · Tempo, veículos e gravidade"
      data-slot="filter-popover-panel"
      className="flex h-[404px] w-[415px] shrink-0 flex-col items-start gap-[24px] rounded-(--radius-16) border border-solid border-(--black-420) bg-(--black-450) p-[20px]"
    >
      {/* 1. Time-Period Controls (25:407 — 375 × 120px) */}
      <div
        data-slot="filter-section-time"
        className="flex h-[120px] w-[375px] shrink-0 flex-col items-start gap-[16px]"
      >
        <div className="flex h-[20px] w-[375px] shrink-0 items-center gap-[8px]">
          <span
            aria-hidden="true"
            className="relative size-[10.667px] shrink-0 text-(--black-300)"
          >
            <span className="absolute inset-[-3.75%]">
              <ClockIcon />
            </span>
          </span>
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--white-250)">
            Tempo
          </span>
        </div>

        <div className="flex h-[84px] w-[375px] shrink-0 flex-col items-start gap-[12px]">
          {/* Row 1: Year option (25:415) */}
          <div className="flex h-[36px] w-[375px] shrink-0 items-center justify-between">
            <button
              type="button"
              role="radio"
              aria-checked={isYearMode}
              onClick={() => handleToggleTimeMode('year')}
              className="flex h-[36px] w-[53px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-(--radius-6) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200)"
            >
              <span
                aria-hidden="true"
                className={`flex size-[16px] shrink-0 items-center justify-center rounded-(--radius-8) border-[1.5px] border-solid transition-colors ${
                  isYearMode ? 'border-(--primary-200)' : 'border-(--black-380)'
                }`}
              >
                {isYearMode ? (
                  <span className="size-[8px] rounded-full bg-(--primary-200)" />
                ) : null}
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--white-550)">
                ano
              </span>
            </button>

            <div className="relative flex h-[36px] w-[100px] shrink-0 items-center">
              <select
                aria-label="Selecionar ano"
                value={filters.year}
                onChange={(event) => {
                  onYearChange(event.currentTarget.value);
                  onTimeModeChange('year');
                }}
                className="h-[36px] w-[100px] cursor-pointer appearance-none rounded-(--radius-8) border border-solid border-(--black-380) bg-(--black-420) py-[6px] pr-[28px] pl-[12px] font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) text-(--white-250) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200)"
              >
                {FILTER_YEAR_OPTIONS.map((yearOption) => (
                  <option
                    key={yearOption}
                    value={yearOption}
                    className="bg-(--black-450) text-(--white-250)"
                  >
                    {yearOption}
                  </option>
                ))}
              </select>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-[12px] h-[5px] w-[11.429px] shrink-0 text-(--primary-200)"
              >
                <span className="absolute inset-[-8.33%_-3.65%]">
                  <ChevronDownIcon strokeWidth={1.16667} />
                </span>
              </span>
            </div>
          </div>

          {/* Row 2: Date period option (25:423) */}
          <div className="flex h-[36px] w-[375px] shrink-0 items-center justify-between">
            <button
              type="button"
              role="radio"
              aria-checked={isPeriodMode}
              onClick={() => handleToggleTimeMode('period')}
              className="flex h-[36px] w-[75px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-(--radius-6) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200)"
            >
              <span
                aria-hidden="true"
                className={`flex size-[16px] shrink-0 items-center justify-center rounded-(--radius-8) border-[1.5px] border-solid transition-colors ${
                  isPeriodMode ? 'border-(--primary-200)' : 'border-(--black-380)'
                }`}
              >
                {isPeriodMode ? (
                  <span className="size-[8px] rounded-full bg-(--primary-200)" />
                ) : null}
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--white-550)">
                período
              </span>
            </button>

            <div className="flex h-[36px] shrink-0 items-center gap-[8px]">
              <div className="flex h-[36px] w-[106px] shrink-0 items-center justify-center overflow-clip rounded-(--radius-8) border border-solid border-(--black-380) bg-(--black-420) p-[8px] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--primary-200)">
                <input
                  type="text"
                  aria-label="Data inicial do período"
                  value={filters.startDate}
                  onFocus={() => onTimeModeChange('period')}
                  onChange={(event) => {
                    onStartDateChange(event.currentTarget.value);
                    onTimeModeChange('period');
                  }}
                  className="w-full bg-transparent text-center font-[var(--font-sans)] text-[length:var(--font-size-13)] font-(--font-weight-regular) leading-(--line-height-20) text-(--white-250) outline-none"
                />
              </div>

              <span className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--black-300)">
                até
              </span>

              <div className="flex h-[36px] w-[106px] shrink-0 items-center justify-center overflow-clip rounded-(--radius-8) border border-solid border-(--black-380) bg-(--black-420) p-[8px] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--primary-200)">
                <input
                  type="text"
                  aria-label="Data final do período"
                  value={filters.endDate}
                  onFocus={() => onTimeModeChange('period')}
                  onChange={(event) => {
                    onEndDateChange(event.currentTarget.value);
                    onTimeModeChange('period');
                  }}
                  className="w-full bg-transparent text-center font-[var(--font-sans)] text-[length:var(--font-size-13)] font-(--font-weight-regular) leading-(--line-height-20) text-(--white-250) outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Vehicle-Category Controls (25:433 — 375 × 108px) */}
      <div
        data-slot="filter-section-vehicles"
        className="flex h-[108px] w-[375px] shrink-0 flex-col items-start gap-[16px] rounded-(--radius-12)"
      >
        <div className="flex h-[20px] w-[375px] shrink-0 items-center justify-between">
          <div className="flex h-[20px] w-[95px] shrink-0 items-center gap-[8px]">
            <span
              aria-hidden="true"
              className="relative h-[9.653px] w-[13.791px] shrink-0 text-(--black-300)"
            >
              <span className="absolute inset-[-5.36%_-3.75%]">
                <CarIcon />
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--white-250)">
              Veículos
            </span>
          </div>

          <span
            data-slot="filter-vehicles-count"
            className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--black-300)"
          >
            {selectedCountLabel}
          </span>
        </div>

        <div className="flex h-[72px] w-[375px] shrink-0 flex-wrap content-center items-center gap-[8px]">
          {FILTER_VEHICLE_ORDER.map((vehicleOption) => (
            <VehicleChoiceChip
              key={vehicleOption}
              option={vehicleOption}
              selected={filters.selectedVehicles.includes(vehicleOption)}
              onClick={() => onToggleVehicle(vehicleOption)}
            />
          ))}
        </div>
      </div>

      {/* 3. Severity Heading and Slider (25:471 — 375 × 88px) */}
      <div
        data-slot="filter-section-severity"
        className="relative h-[88px] w-[375px] shrink-0 rounded-(--radius-12)"
      >
        <div className="absolute top-0 right-0 left-0 flex h-[24px] items-center justify-between">
          <div className="flex h-[24px] w-[115px] shrink-0 items-center gap-[8px]">
            <span
              aria-hidden="true"
              className="relative size-[18.874px] shrink-0 text-(--black-300)"
            >
              <BrokenBoneIcon />
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--white-250)">
              gravidade
            </span>
          </div>

          <span
            data-slot="filter-severity-label"
            className="font-[var(--font-sans)] text-[length:var(--font-size-13)] font-(--font-weight-regular) leading-(--line-height-20) whitespace-nowrap text-(--primary-200)"
          >
            {severityLabel}
          </span>
        </div>

        <SeveritySlider
          value={filters.severityIndex}
          onChange={(event) => onSeverityChange(Number(event.currentTarget.value))}
          className="absolute top-[44px] left-0"
        />
      </div>
    </div>
  );
}

