import { cn } from 'cn';
import {
  RankingFilterControl,
  RankingInfoControl,
  RankingTabs,
  type RankingTabCategory,
} from '@/design-system/primitives';
import type {
  RankingEntry,
  RankingMetricId,
  RankingMetricOption,
} from '../types/ranking';
import { RankingInfoPanel } from './RankingInfoPanel';
import { RankingList } from './RankingList';
import { RankingMetricSelector } from './RankingMetricSelector';
import { RankingPodium } from './RankingPodium';

export interface RankingPanelProps {
  /** Active ranking category tab (`cities` | `states` | `roads`). */
  activeTab: RankingTabCategory;
  onTabChange: (category: RankingTabCategory) => void;
  /** Available sort metrics and currently selected metric ID. */
  metricOptions: readonly RankingMetricOption[];
  selectedMetric: RankingMetricId;
  onMetricChange: (metricId: RankingMetricId) => void;
  /** Inline info disclosure visibility (`1:2286`). */
  isInfoOpen: boolean;
  onToggleInfo: () => void;
  /** Optional filter button handler (`Control/Ranking filter` `21:118`). */
  onFilterClick?: () => void;
  /** Ranked entries to render in the podium and list. */
  entries: readonly RankingEntry[];
  /** List expansion state (`"ver mais"`). */
  isListExpanded: boolean;
  canExpandList: boolean;
  onToggleListExpanded: () => void;
  className?: string;
}

/**
 * Main Beltwise Ranking panel (`346px` wide, `min-h-[658px]`) implementing Figma
 * S9 (`1:2128`), S10 (`1:2447`), and S11 (`1:2286`).
 */
export function RankingPanel({
  activeTab,
  onTabChange,
  metricOptions,
  selectedMetric,
  onMetricChange,
  isInfoOpen,
  onToggleInfo,
  onFilterClick,
  entries,
  isListExpanded,
  canExpandList,
  onToggleListExpanded,
  className,
}: RankingPanelProps) {
  const activeMetricOption =
    metricOptions.find((option) => option.id === selectedMetric) ??
    metricOptions[0];

  return (
    <section
      aria-label="Ranking de sinistros"
      data-slot="ranking-panel"
      className={cn(
        'flex min-h-(--size-panel-ranking-height) w-(--size-panel-ranking-width) shrink-0 flex-col items-start rounded-(--radius-12) bg-(--black-450) px-[16px] pt-[18px] pb-[14px] shadow-(--shadow-tools)',
        className,
      )}
    >
      {/* Heading & Category Tabs */}
      <div className="flex w-full shrink-0 flex-col items-start gap-[14px]">
        <h1 className="type-heading-ranking leading-none text-(--white-250)">
          Ranking
        </h1>

        <RankingTabs value={activeTab} onValueChange={onTabChange} />
      </div>

      {/* Metric Selector, Info Trigger & Filter Icon Row */}
      <div className="mt-[15px] flex w-full shrink-0 items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <RankingMetricSelector
            options={metricOptions}
            value={selectedMetric}
            onChange={onMetricChange}
          />
          <RankingInfoControl
            context={isInfoOpen ? 'info-shown' : 'info-closed'}
            onClick={onToggleInfo}
          />
        </div>

        <RankingFilterControl onClick={onFilterClick} />
      </div>

      {/* Inline Metric Information Disclosure (S11 — 1:2445) */}
      {isInfoOpen && activeMetricOption ? (
        <RankingInfoPanel
          description={activeMetricOption.description}
          className="mt-[8px]"
        />
      ) : null}

      {/* Section Divider (1:2210 / 1:2368) */}
      <div
        aria-hidden="true"
        className="mx-auto mt-[8px] h-px w-[304px] shrink-0 bg-(--black-420)"
      />

      {/* Podium & Ranked List (1:2211 / 1:2369) */}
      <div className="mx-auto mt-[14px] flex w-[310px] flex-col items-center gap-[12px]">
        <RankingPodium entries={entries} />

        <RankingList
          entries={entries}
          isExpanded={isListExpanded}
          canExpand={canExpandList}
          onToggleExpand={onToggleListExpanded}
        />
      </div>
    </section>
  );
}

