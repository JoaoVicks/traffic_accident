import { useId } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  CopyIcon,
  IncidentDetailsButton,
  SkullIcon,
  UsersGroupIcon,
} from '@/design-system/primitives';

export interface IncidentMapCardProps {
  accidentId: string;
  dateLabel: string;
  involvedLabel: string;
  fatalitiesLabel: string;
  periodLabel: string;
  isFatal?: boolean;
  isIdCopied?: boolean;
  onCopyId?: () => void;
  onDetailsClick?: () => void;
}

/**
 * Floating map-anchored incident summary card (`Accident/IncidentCard` `23:1041` / `1:2693`)
 * with its adjacent map marker ring (`1:2725`), mounted via `MapOverlaySlot`.
 */
export function IncidentMapCard({
  accidentId,
  dateLabel,
  involvedLabel,
  fatalitiesLabel,
  periodLabel,
  isFatal = true,
  isIdCopied = false,
  onCopyId,
  onDetailsClick,
}: IncidentMapCardProps) {
  const gradientId = `incident-map-card-car-${useId().replace(/:/g, '')}`;

  return (
    <div
      data-slot="incident-map-overlay"
      className="pointer-events-auto absolute top-[151px] left-[clamp(556px,59.8vw,861px)] flex items-start gap-[8px]"
    >
      {/* 280 × 238 px Floating Card (23:1041) */}
      <aside
        aria-label={`Resumo do acidente ${accidentId} no mapa`}
        data-slot="incident-map-card"
        className="relative h-(--size-incident-card-height) w-(--size-incident-card-width) shrink-0 overflow-clip rounded-(--radius-18) bg-(--black-450) shadow-(--shadow-tools)"
      >
        {/* Top Illustration Surface (262 × 98 px — 23:1010) */}
        <div className="absolute top-[9px] left-[9px] h-[98px] w-[262px] overflow-clip rounded-[17px] bg-(--black-430)">
          <svg
            aria-hidden="true"
            viewBox="0 0 262 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="202.23"
                y1="28"
                x2="202.23"
                y2="150.575"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--primary-300)" />
                <stop offset="1" stopColor="#D0761A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M271.266 55.7398H229.161M253.209 94.5755C270.303 92.2453 271.025 88.9166 271.241 84.922C271.386 72.6056 271.266 60.0672 271.266 55.7398C269.966 46.0864 264.318 34.6576 261.431 30.3302M229.161 55.7398H175.027M229.161 55.7398V28M229.161 28H271.169M229.161 28H209.715C209.715 28 206.467 28 203.58 28.2663C198.172 28.7324 193.631 30.9959 189.084 36.6548C184.272 42.6466 180.573 50.2362 175.671 54.2973C167.52 61.0436 152.014 58.9576 151.148 73.2713C150.931 80.5946 150.931 88.5837 151.292 89.9152C151.87 93.8376 155.148 94.4756 159.226 94.5755C162.763 94.6642 167.027 94.4201 169.108 94.5755M193.132 94.5755H229.191M229.165 94.5755C229.165 97.5184 230.432 100.341 232.688 102.422C234.944 104.502 238.004 105.671 241.194 105.671C244.385 105.671 247.445 104.502 249.701 102.422C251.957 100.341 253.224 97.5184 253.224 94.5755C253.224 91.6327 251.957 88.8104 249.701 86.7296C247.445 84.6487 244.385 83.4796 241.194 83.4796C238.004 83.4796 234.944 84.6487 232.688 86.7296C230.432 88.8104 229.165 91.6327 229.165 94.5755ZM169.015 94.5755C169.015 97.5184 170.283 100.341 172.539 102.422C174.795 104.502 177.855 105.671 181.045 105.671C184.236 105.671 187.296 104.502 189.552 102.422C191.808 100.341 193.075 97.5184 193.075 94.5755C193.075 91.6327 191.808 88.8104 189.552 86.7296C187.296 84.6487 184.236 83.4796 181.045 83.4796C177.855 83.4796 174.795 84.6487 172.539 86.7296C170.283 88.8104 169.015 91.6327 169.015 94.5755Z"
              stroke={`url(#${gradientId})`}
              strokeWidth="8.73376"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Fatal Marker Dot (23:1021) */}
        {isFatal ? (
          <div
            aria-hidden="true"
            className="absolute top-[79px] left-[5px] flex size-[43px] items-center justify-center rounded-full bg-(--black-450)"
          >
            <span className="size-[25px] rounded-full bg-(--incident-fatal-background)" />
          </div>
        ) : null}

        {/* Date & Hash ID Row (23:1012) */}
        <div className="absolute top-[116px] left-[117px] flex w-[150px] items-center justify-between text-(--observed-color-9f9f9f-fill)">
          <span className="flex items-center gap-[2px]">
            <span
              aria-hidden="true"
              className="relative h-[9.311px] w-[8.38px] shrink-0"
            >
              <span className="absolute inset-[-3.75%_-4.17%]">
                <CalendarIcon />
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-10-551)] font-(--font-weight-light) italic leading-none tabular-nums">
              {dateLabel}
            </span>
          </span>

          <button
            type="button"
            onClick={onCopyId}
            aria-label={
              isIdCopied
                ? 'Identificador copiado'
                : `Copiar identificador ${accidentId}`
            }
            className="flex cursor-pointer items-center gap-[2px] rounded-(--radius-4-260) transition-colors hover:text-(--white-250) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
          >
            <span className="w-[58.843px] truncate font-[var(--font-sans)] text-[length:var(--font-size-12-780)] font-(--font-weight-light) italic leading-none">
              {accidentId}
            </span>
            <span
              aria-hidden="true"
              className="relative h-[11.36px] w-[10.228px] shrink-0"
            >
              <span className="absolute inset-[-3.75%_-4.17%]">
                <CopyIcon />
              </span>
            </span>
          </button>
        </div>

        {/* 3-Stat Metadata Row (23:1022) */}
        <div className="absolute top-[145px] left-1/2 flex -translate-x-1/2 items-center gap-[6.748px] text-(--white-500)">
          <span className="flex items-center gap-[3.418px]">
            <span
              aria-hidden="true"
              className="relative h-[13.496px] w-[14.995px] shrink-0"
            >
              <UsersGroupIcon />
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-12-532)] font-(--font-weight-medium) leading-none whitespace-nowrap">
              {involvedLabel}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="h-[23.135px] w-px shrink-0 bg-(--black-420)"
          />

          <span className="flex items-center gap-[4.059px]">
            <span
              aria-hidden="true"
              className="relative size-[13.496px] shrink-0"
            >
              <span className="absolute inset-[-4.17%]">
                <SkullIcon />
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-11-796)] font-(--font-weight-medium) leading-none whitespace-nowrap">
              {fatalitiesLabel}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="h-[23.135px] w-px shrink-0 bg-(--black-420)"
          />

          <span className="flex items-center gap-[4.059px]">
            <span
              aria-hidden="true"
              className="relative size-[11.568px] shrink-0"
            >
              <span className="absolute inset-[-3.75%]">
                <ClockIcon />
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-11-796)] font-(--font-weight-medium) leading-none whitespace-nowrap">
              {periodLabel}
            </span>
          </span>
        </div>

        {/* Details Action Button (21:41) */}
        <IncidentDetailsButton
          onClick={onDetailsClick}
          className="absolute top-[189px] left-[73px]"
        />
      </aside>

      {/* Highlighted Incident Map Marker Ring (1:2725) */}
      <div
        aria-hidden="true"
        data-slot="incident-map-marker-ring"
        className="mt-[3px] flex size-[25px] shrink-0 items-center justify-center rounded-(--radius-18) border border-solid border-(--primary-300)"
      >
        <span className="size-[21px] rounded-(--radius-6000) bg-(--incident-fatal-background)" />
      </div>
    </div>
  );
}

