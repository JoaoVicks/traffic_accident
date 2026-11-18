import { cn } from 'cn';
import { SourceBadge } from '@/design-system/primitives';
import type { AccidentDetailData } from '../types/accident';
import { AccidentCauseSection } from './AccidentCauseSection';
import { AccidentHeaderHero } from './AccidentHeaderHero';
import { AccidentLocationCard } from './AccidentLocationCard';
import { AccidentMetadataSummary } from './AccidentMetadataSummary';
import { AccidentVehiclesSection } from './AccidentVehiclesSection';

export interface AccidentDetailPanelProps {
  accident: AccidentDetailData;
  selectedVehicleId: string;
  onSelectVehicle: (vehicleId: string) => void;
  isIdCopied: boolean;
  onCopyId: () => void;
  onBack?: () => void;
  className?: string;
}

/**
 * Main Accident Detail panel (`431px` wide, `min-h-[843px]`) matching Figma
 * `Detail - Accident` (`1:2616` / `1:2727` `ProvenanceReference`).
 */
export function AccidentDetailPanel({
  accident,
  selectedVehicleId,
  onSelectVehicle,
  isIdCopied,
  onCopyId,
  onBack,
  className,
}: AccidentDetailPanelProps) {
  return (
    <article
      aria-label={`Detalhes do acidente ${accident.id}`}
      data-slot="accident-detail-panel"
      className={cn(
        'flex min-h-(--size-panel-accident-detail-height) w-(--size-panel-accident-detail-width) shrink-0 flex-col items-start gap-[18px] rounded-(--radius-18) bg-(--black-450) px-[14px] pt-[11px] pb-[24px] shadow-(--shadow-tools)',
        className,
      )}
    >
      <AccidentHeaderHero
        severityBadgeLabel={accident.severityBadgeLabel}
        isFatal={accident.isFatal}
        onBack={onBack}
      />

      <div className="flex w-full flex-col items-start gap-[18px] px-[4px]">
        <AccidentMetadataSummary
          accidentId={accident.id}
          involvedLabel={accident.involvedLabel}
          fatalitiesLabel={accident.fatalitiesLabel}
          timePeriodLabel={accident.timePeriodLabel}
          dateLabel={accident.dateLabel}
          isIdCopied={isIdCopied}
          onCopyId={onCopyId}
        />

        {/* Data Source Provenance Row (1:2846–1:2849) */}
        <div
          data-slot="accident-source-row"
          className="flex w-full items-center gap-[12px]"
        >
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-regular) leading-none text-(--observed-color-bababa)">
            Fonte de dados
          </span>
          <SourceBadge label={accident.dataSourceLabel} />
        </div>

        <AccidentLocationCard
          address={accident.locationAddress}
          roadAttributes={accident.roadAttributes}
        />

        <AccidentCauseSection
          accidentType={accident.accidentType}
          accidentCause={accident.accidentCause}
        />

        <AccidentVehiclesSection
          vehicles={accident.vehicles}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={onSelectVehicle}
        />
      </div>
    </article>
  );
}

