export type WorkspaceSlotVariant = 'explore' | 'ranking' | 'accident-detail';

export interface WorkspaceRouteSlotProps {
  /** Identifies which nested workspace route slot is currently active. */
  slot: WorkspaceSlotVariant;
  /** Accessible title for the structural route slot. */
  title: string;
  /** Brief structural description of the reserved workspace panel. */
  description: string;
}

const SLOT_WIDTH_CLASSES: Record<WorkspaceSlotVariant, string> = {
  explore: 'w-(--size-panel-analytics-summary-width)',
  ranking: 'w-(--size-panel-ranking-width)',
  'accident-detail': 'w-(--size-panel-accident-detail-width)',
};

/**
 * Minimal structural placeholder rendered by nested product routes in Phase 1
 * before feature-specific pages (Search/Analytics, Ranking, Accident Detail) are implemented.
 */
export function WorkspaceRouteSlot({
  slot,
  title,
  description,
}: WorkspaceRouteSlotProps) {
  return (
    <section
      aria-label={title}
      data-route-slot={slot}
      className={`flex flex-col gap-2 rounded-(--radius-12) border border-(--border-subtle) bg-(--surface-panel) px-[18px] py-[16px] shadow-(--shadow-tools) ${SLOT_WIDTH_CLASSES[slot]}`}
    >
      <span className="type-heading-section-medium text-(--white-500)">
        {title}
      </span>
      <p className="type-body-compact-light text-(--text-muted)">
        {description}
      </p>
    </section>
  );
}

