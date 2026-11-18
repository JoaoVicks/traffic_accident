import { useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  Disclosure,
  type AnalyticsTabMetric,
} from '@/design-system/primitives';
import {
  AnalyticsContextSummary,
  HourlyDistributionChart,
  RoadConfigurationChart,
  SeverityDistributionChart,
  VehicleDistributionChart,
  WeatherDistributionChart,
} from '../components';
import {
  ANALYTICS_CONTEXT_SUMMARY_FIXTURES,
  SAMPLE_ROAD_CONFIGURATION_DISTRIBUTION,
  SAMPLE_SEVERITY_DISTRIBUTION_BY_METRIC,
  SAMPLE_TIME_DISTRIBUTION_BY_METRIC,
  SAMPLE_VEHICLE_DISTRIBUTION,
  SAMPLE_WEATHER_DISTRIBUTION,
} from '../data/analyticsReferenceFixtures';
import type {
  AnalyticsContextMode,
  AnalyticsContextSummaryData,
  RoadConfigurationDTO,
  SeverityDistributionDTO,
  TimeDistributionDTO,
  VehicleDistributionDTO,
  WeatherDistributionDTO,
} from '../types/analytics';

function resolveContextMode(raw: string | null): AnalyticsContextMode {
  if (raw === 'state' || raw === 'road' || raw === 'search') {
    return raw;
  }
  return 'search';
}

export interface ExploreAnalyticsPageProps {
  /**
   * Optional explicit analytics context mode (`'search'` | `'state'` | `'road'`).
   * When omitted, resolves from the `?context=` URL search parameter (defaulting to `'search'`).
   */
  context?: AnalyticsContextMode;
  /** Optional controlled summary data overriding the context fixture. */
  summaryData?: AnalyticsContextSummaryData;
  /** Optional controlled weather distribution dataset. */
  weatherData?: readonly WeatherDistributionDTO[];
  /** Optional controlled severity distribution dataset keyed by tab metric. */
  severityDataByMetric?: Readonly<
    Record<AnalyticsTabMetric, readonly SeverityDistributionDTO[]>
  >;
  /** Optional controlled vehicle distribution dataset. */
  vehicleData?: readonly VehicleDistributionDTO[];
  /** Optional controlled hourly time distribution dataset keyed by tab metric. */
  timeDataByMetric?: Readonly<
    Record<AnalyticsTabMetric, readonly TimeDistributionDTO[]>
  >;
  /** Optional controlled road configuration dataset (used in `'search'` and `'road'` contexts). */
  roadConfigurationData?: readonly RoadConfigurationDTO[];
  /** Initial expanded state for the `"análise geral"` disclosure trigger. Defaults to `true` per Figma. */
  defaultChartsExpanded?: boolean;
}

/**
 * Primary analytics workspace page (`Frame 427318971`) rendered inside `SearchableWorkspaceLayout`.
 *
 * Composes `AnalyticsContextSummary`, the `"análise geral"` `Disclosure` trigger, and the
 * context-specific chart stack:
 * - **Search context (`'search'`, S1 `1:470`)**: 5 charts (Weather, Severity, Vehicles, Hourly, Road Configuration).
 * - **State context (`'state'`, S4 `1:1370`)**: 4 charts (Weather, Severity, Vehicles, Hourly — no Road Configuration).
 * - **Road context (`'road'`, S5 `1:2850`)**: 5 charts (Weather, Severity, Vehicles, Hourly, Road Configuration).
 */
export function ExploreAnalyticsPage({
  context: controlledContext,
  summaryData,
  weatherData = SAMPLE_WEATHER_DISTRIBUTION,
  severityDataByMetric = SAMPLE_SEVERITY_DISTRIBUTION_BY_METRIC,
  vehicleData = SAMPLE_VEHICLE_DISTRIBUTION,
  timeDataByMetric = SAMPLE_TIME_DISTRIBUTION_BY_METRIC,
  roadConfigurationData = SAMPLE_ROAD_CONFIGURATION_DISTRIBUTION,
  defaultChartsExpanded = true,
}: ExploreAnalyticsPageProps) {
  const [searchParams] = useSearchParams();
  const activeContext: AnalyticsContextMode =
    controlledContext ?? resolveContextMode(searchParams.get('context'));

  const resolvedSummary =
    summaryData ?? ANALYTICS_CONTEXT_SUMMARY_FIXTURES[activeContext];

  const [isChartsExpanded, setIsChartsExpanded] = useState<boolean>(
    defaultChartsExpanded,
  );
  const [severityMetric, setSeverityMetric] =
    useState<AnalyticsTabMetric>('accidents');
  const [hourlyMetric, setHourlyMetric] =
    useState<AnalyticsTabMetric>('accidents');

  const showRoadConfigurationChart =
    activeContext === 'search' || activeContext === 'road';

  return (
    <div
      data-slot="explore-analytics-page"
      data-analytics-context={activeContext}
      className="flex w-(--size-panel-analytics-summary-width) flex-col items-start gap-[10px]"
    >
      {/* 1. Geographic Context Summary (23:347 Search / 23:397 State / 23:451 Road) */}
      <AnalyticsContextSummary
        context={resolvedSummary.context}
        parentContext={resolvedSummary.parentContext}
        secondaryContext={resolvedSummary.secondaryContext}
        contextTitle={resolvedSummary.contextTitle}
        contextIndicatorValue={resolvedSummary.contextIndicatorValue}
        totalVictims={resolvedSummary.totalVictims}
        totalAccidents={resolvedSummary.totalAccidents}
      />

      {/* 2. General Analytics Disclosure Trigger (21:308 — 437 × 41 px) */}
      <Disclosure
        expanded={isChartsExpanded}
        title="análise geral"
        summaryText="8 análises"
        onClick={() => setIsChartsExpanded((prev) => !prev)}
      />

      {/* 3. Context-Specific Analytics Chart Stack (25:717 FiveCardArrangement vs 25:1094 StateArrangement) */}
      {isChartsExpanded ? (
        <div
          data-slot="analytics-chart-stack"
          className="flex w-full flex-col items-start gap-[10px]"
        >
          <WeatherDistributionChart data={weatherData} />

          <SeverityDistributionChart
            metric={severityMetric}
            onMetricChange={setSeverityMetric}
            data={severityDataByMetric[severityMetric]}
          />

          <VehicleDistributionChart data={vehicleData} />

          <HourlyDistributionChart
            metric={hourlyMetric}
            onMetricChange={setHourlyMetric}
            data={timeDataByMetric[hourlyMetric]}
          />

          {showRoadConfigurationChart ? (
            <RoadConfigurationChart data={roadConfigurationData} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

