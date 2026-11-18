import { AccidentBurstIcon } from '@/design-system/primitives';

export interface AccidentCauseSectionProps {
  accidentType: string;
  accidentCause: string;
}

/**
 * Accident classification row and highlighted orange `Causa` card (`1:2766`).
 */
export function AccidentCauseSection({
  accidentType,
  accidentCause,
}: AccidentCauseSectionProps) {
  return (
    <div
      data-slot="accident-cause-section"
      className="flex w-full items-stretch gap-[8px]"
    >
      {/* Left Vertical Accent Line (1:2767) */}
      <div
        aria-hidden="true"
        className="mt-[3px] w-[1.5px] shrink-0 rounded-full bg-(--black-420)"
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[13px]">
        {/* Type Row (1:2769) */}
        <div className="flex flex-wrap items-center gap-[6px]">
          <span className="flex items-center gap-[4px]">
            <span
              aria-hidden="true"
              className="relative size-[16px] shrink-0 overflow-clip text-(--observed-color-bababa)"
            >
              <span className="absolute inset-[8.33%]">
                <span className="absolute inset-[-3.75%]">
                  <AccidentBurstIcon />
                </span>
              </span>
            </span>
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-medium) leading-none text-(--observed-color-bababa)">
              Tipo de acidente
            </span>
          </span>

          <span className="type-context-italic-14-regular leading-none text-(--white-250)">
            {accidentType}
          </span>
        </div>

        {/* Highlighted Cause Panel (1:2777 — Accident/CausePanel 23:1055) */}
        <div className="flex w-full flex-col items-start gap-[10px] rounded-(--radius-12) bg-(--primary-300) px-[12px] py-[16px]">
          <h3 className="type-label-cause leading-none text-(--observed-color-ffffff)">
            Causa
          </h3>
          <p className="type-body-control-medium leading-snug text-(--observed-color-ffffff)">
            {accidentCause}
          </p>
        </div>
      </div>
    </div>
  );
}

