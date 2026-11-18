import { useMemo, useState } from 'react';
import type { RankingTabCategory } from '@/design-system/primitives';
import { RankingPanel } from '../components';
import {
  DEFAULT_RANKING_METRIC_ID,
  RANKING_METRIC_OPTIONS,
  RANKING_REFERENCE_CATALOG,
} from '../data/rankingReferenceFixtures';
import type {
  RankingCatalogByCategory,
  RankingMetricId,
  RankingMetricOption,
} from '../types/ranking';

const INITIAL_VISIBLE_COUNT = 10;

export interface RankingPageProps {
  /** Optional catalog override for testing or future API integration. */
  catalog?: RankingCatalogByCategory;
  /** Optional metric options override. */
  metricOptions?: readonly RankingMetricOption[];
  defaultTab?: RankingTabCategory;
  defaultMetric?: RankingMetricId;
}

/**
 * Beltwise Ranking page rendered as a sibling route under `MapWorkspaceLayout` (`/ranking`).
 * Manages local tab, metric selection, inline info disclosure, and `"ver mais"` list state.
 */
export function RankingPage({
  catalog = RANKING_REFERENCE_CATALOG,
  metricOptions = RANKING_METRIC_OPTIONS,
  defaultTab = 'cities',
  defaultMetric = DEFAULT_RANKING_METRIC_ID,
}: RankingPageProps) {
  const [activeTab, setActiveTab] = useState<RankingTabCategory>(defaultTab);
  const [selectedMetric, setSelectedMetric] =
    useState<RankingMetricId>(defaultMetric);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isListExpanded, setIsListExpanded] = useState(false);

  const fullEntries = catalog[activeTab][selectedMetric];
  const canExpandList = fullEntries.length > INITIAL_VISIBLE_COUNT;

  const visibleEntries = useMemo(
    () =>
      isListExpanded
        ? fullEntries
        : fullEntries.slice(0, INITIAL_VISIBLE_COUNT),
    [fullEntries, isListExpanded],
  );

  const handleTabChange = (nextTab: RankingTabCategory) => {
    setActiveTab(nextTab);
    setIsListExpanded(false);
  };

  const handleMetricChange = (nextMetric: RankingMetricId) => {
    setSelectedMetric(nextMetric);
    setIsListExpanded(false);
  };

  return (
    <div data-slot="ranking-page" className="flex items-start">
      <RankingPanel
        activeTab={activeTab}
        onTabChange={handleTabChange}
        metricOptions={metricOptions}
        selectedMetric={selectedMetric}
        onMetricChange={handleMetricChange}
        isInfoOpen={isInfoOpen}
        onToggleInfo={() => setIsInfoOpen((prev) => !prev)}
        entries={visibleEntries}
        isListExpanded={isListExpanded}
        canExpandList={canExpandList}
        onToggleListExpanded={() => setIsListExpanded((prev) => !prev)}
      />
    </div>
  );
}

