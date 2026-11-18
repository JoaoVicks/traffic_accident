import {
  CalendarIcon,
  ClockIcon,
  CopyIcon,
  SkullIcon,
  UsersGroupIcon,
} from '@/design-system/primitives';

export interface AccidentMetadataSummaryProps {
  accidentId: string;
  involvedLabel: string;
  fatalitiesLabel: string;
  timePeriodLabel: string;
  dateLabel: string;
  isIdCopied: boolean;
  onCopyId: () => void;
}

/**
 * Incident title, copyable hash identifier, and 4-column metadata bar (`1:2736`).
 */
export function AccidentMetadataSummary({
  accidentId,
  involvedLabel,
  fatalitiesLabel,
  timePeriodLabel,
  dateLabel,
  isIdCopied,
  onCopyId,
}: AccidentMetadataSummaryProps) {
  return (
    <div
      data-slot="accident-metadata-summary"
      className="flex w-full flex-col items-start gap-[16px]"
    >
      <div className="flex w-full flex-col items-start gap-[8px]">
        {/* Title + Hash ID + Copy Action (1:2738) */}
        <div className="flex flex-wrap items-center gap-[6px]">
          <h1 className="type-heading-accident leading-none text-(--white-250)">
            Detalhes acidente
          </h1>

          <button
            type="button"
            onClick={onCopyId}
            aria-label={
              isIdCopied
                ? 'Identificador copiado'
                : `Copiar identificador ${accidentId}`
            }
            title={isIdCopied ? 'Copiado!' : `Copiar ${accidentId}`}
            className="flex cursor-pointer items-center gap-[3px] rounded-(--radius-4-260) text-(--observed-color-6c6c6c) transition-colors hover:text-(--black-300) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
          >
            <span className="max-w-[130px] truncate font-[var(--font-sans)] text-[length:var(--font-size-12-780)] font-(--font-weight-light) italic leading-none">
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

        {/* 4-Stat Metadata Strip (1:2745) */}
        <div className="flex flex-wrap items-center gap-[6.748px] text-(--black-300)">
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
              {timePeriodLabel}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="h-[23.135px] w-px shrink-0 bg-(--black-420)"
          />

          <span className="flex items-center gap-[4.059px]">
            <span
              aria-hidden="true"
              className="relative h-[12.865px] w-[11.578px] shrink-0"
            >
              <span className="absolute inset-[-3.75%_-4.17%]">
                <CalendarIcon />
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-11-796)] font-(--font-weight-medium) leading-none whitespace-nowrap tabular-nums">
              {dateLabel}
            </span>
          </span>
        </div>
      </div>

      {/* Bottom Hairline Divider (1:2765) */}
      <div aria-hidden="true" className="h-px w-full bg-(--black-420)" />
    </div>
  );
}

