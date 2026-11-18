import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MapOverlaySlot } from '@/features/map';
import { AccidentDetailPanel, IncidentMapCard } from '../components';
import { DEFAULT_ACCIDENT_DETAIL_FIXTURE } from '../data/accidentReferenceFixtures';
import type { AccidentDetailData } from '../types/accident';

export interface AccidentDetailPageProps {
  /** Optional controlled accident data for testing or future API integration. */
  accident?: AccidentDetailData;
}

/**
 * Beltwise Accident Detail page rendered inside `SearchableWorkspaceLayout` (`/accidents/:accidentId`).
 * Renders `AccidentDetailPanel` in the left workspace column and mounts `IncidentMapCard`
 * into `MapWorkspaceLayout`'s `#map-overlay-slot` via `MapOverlaySlot`.
 */
export function AccidentDetailPage({
  accident: controlledAccident,
}: AccidentDetailPageProps) {
  const { accidentId } = useParams();
  const navigate = useNavigate();

  const resolvedAccident: AccidentDetailData = controlledAccident ?? {
    ...DEFAULT_ACCIDENT_DETAIL_FIXTURE,
    id: accidentId
      ? accidentId.startsWith('#')
        ? accidentId
        : `#${accidentId}`
      : DEFAULT_ACCIDENT_DETAIL_FIXTURE.id,
  };

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    () => resolvedAccident.vehicles[0]?.id ?? '',
  );
  const [isIdCopied, setIsIdCopied] = useState(false);

  useEffect(() => {
    if (!isIdCopied) return;
    const timer = window.setTimeout(() => setIsIdCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [isIdCopied]);

  const handleCopyId = () => {
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(resolvedAccident.id);
    }
    setIsIdCopied(true);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div data-slot="accident-detail-page" className="flex items-start">
      <AccidentDetailPanel
        accident={resolvedAccident}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
        isIdCopied={isIdCopied}
        onCopyId={handleCopyId}
        onBack={handleBack}
      />

      <MapOverlaySlot>
        <IncidentMapCard
          accidentId={resolvedAccident.id}
          dateLabel={resolvedAccident.dateLabel}
          involvedLabel={resolvedAccident.involvedLabel}
          fatalitiesLabel={resolvedAccident.fatalitiesLabel}
          periodLabel={resolvedAccident.periodOnlyLabel}
          isFatal={resolvedAccident.isFatal}
          isIdCopied={isIdCopied}
          onCopyId={handleCopyId}
        />
      </MapOverlaySlot>
    </div>
  );
}

