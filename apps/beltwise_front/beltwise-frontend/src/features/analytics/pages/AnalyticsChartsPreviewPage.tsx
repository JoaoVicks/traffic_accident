import { useState } from 'react';
import type { AnalyticsTabMetric } from '@/design-system/primitives';
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

/**
 * Interactive preview route using controlled sample DTO payloads so all 5 charts
 * and the 3 context summary variants can be visually inspected without requiring a running backend.
 */
export function AnalyticsChartsPreviewPage() {
  const [severityMetric, setSeverityMetric] =
    useState<AnalyticsTabMetric>('accidents');
  const [hourlyMetric, setHourlyMetric] =
    useState<AnalyticsTabMetric>('accidents');

  return (
    <main className="min-h-screen bg-(--background-canvas) px-6 py-8 text-(--text-primary)">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-(--border-subtle) pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium tracking-wider text-(--primary-200) uppercase">
              Preview com dados de exemplo (DTOs controlados)
            </span>
            <h1 className="type-display-sm text-(--white-800)">
              Beltwise Analytics & Charts Showcase
            </h1>
            <p className="text-[13px] font-light text-(--text-secondary)">
              Visualização interativa dos resumos contextuais (Search, State, Road) e dos 5 gráficos analíticos.
            </p>
          </div>
        </header>

        <section aria-label="Resumos contextuais" className="flex flex-col gap-4">
          <h2 className="type-heading-section-medium text-(--white-500)">
            Analytics Context Summary (Search · State · Road)
          </h2>
          <div className="flex flex-wrap items-start gap-6">
            <AnalyticsContextSummary
              {...ANALYTICS_CONTEXT_SUMMARY_FIXTURES.search}
            />
            <AnalyticsContextSummary
              {...ANALYTICS_CONTEXT_SUMMARY_FIXTURES.state}
            />
            <AnalyticsContextSummary
              {...ANALYTICS_CONTEXT_SUMMARY_FIXTURES.road}
            />
          </div>
        </section>

        <section aria-label="Gráficos analíticos" className="flex flex-col gap-4">
          <h2 className="type-heading-section-medium text-(--white-500)">
            Analytics Charts (5 visualizações)
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <WeatherDistributionChart data={SAMPLE_WEATHER_DISTRIBUTION} />
            <SeverityDistributionChart
              metric={severityMetric}
              onMetricChange={setSeverityMetric}
              data={SAMPLE_SEVERITY_DISTRIBUTION_BY_METRIC[severityMetric]}
            />
            <VehicleDistributionChart data={SAMPLE_VEHICLE_DISTRIBUTION} />
            <HourlyDistributionChart
              metric={hourlyMetric}
              onMetricChange={setHourlyMetric}
              data={SAMPLE_TIME_DISTRIBUTION_BY_METRIC[hourlyMetric]}
            />
            <RoadConfigurationChart
              data={SAMPLE_ROAD_CONFIGURATION_DISTRIBUTION}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
