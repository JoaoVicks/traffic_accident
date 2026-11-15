import {
  HourlyDistributionChart,
  SeverityDistributionChart,
  VehicleDistributionChart,
  WeatherDistributionChart,
} from '../components';
import { useAnalyticsSummary } from '../hooks';
import type { AnalyticFilterParams } from '../types/analytics';
import { formatMetricCount } from '../utils/transformers';

export interface AnalyticsDashboardPageProps {
  filters?: AnalyticFilterParams;
}

/**
 * Beltwise analytics dashboard view composing all backend-supported charts
 * backed by `AnalyticsController` endpoints.
 */
export function AnalyticsDashboardPage({ filters }: AnalyticsDashboardPageProps) {
  const summary = useAnalyticsSummary(filters);

  return (
    <main className="min-h-screen bg-(--background-canvas) px-6 py-8 text-(--text-primary)">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-(--border-subtle) pb-4">
          <div className="flex flex-col gap-1">
            <h1 className="type-display-sm text-(--white-800)">Beltwise Analytics</h1>
            <p className="text-[13px] font-light text-(--text-secondary)">
              Distribuições de sinistros e vítimas com base nos endpoints de analytics
            </p>
          </div>

          {summary.data ? (
            <div className="flex items-center gap-6 text-[13px]">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-light text-(--text-gray-axis)">
                  Total de acidentes
                </span>
                <span className="font-semibold text-(--white-800) tabular-nums">
                  {formatMetricCount(summary.data.totalAccident)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-light text-(--text-gray-axis)">
                  Total de vítimas
                </span>
                <span className="font-semibold text-(--white-800) tabular-nums">
                  {formatMetricCount(summary.data.totalVictims)}
                </span>
              </div>
            </div>
          ) : null}
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
          <SeverityDistributionChart  filters={filters} />
          <HourlyDistributionChart filters={filters} />
          <WeatherDistributionChart filters={filters} />
          <VehicleDistributionChart filters={filters} />
        </div>
      </div>
    </main>
  );
}

