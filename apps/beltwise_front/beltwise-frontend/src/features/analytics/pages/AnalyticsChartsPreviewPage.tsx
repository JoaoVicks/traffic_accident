import { useState } from 'react';
import type { AnalyticsTabMetric } from '@/design-system/primitives';
import {
  HourlyDistributionChart,
  SeverityDistributionChart,
  VehicleDistributionChart,
  WeatherDistributionChart,
} from '../components';
import type {
  SeverityDistributionDTO,
  TimeDistributionDTO,
  VehicleDistributionDTO,
  WeatherDistributionDTO,
} from '../types/analytics';

const SAMPLE_SEVERITY_BY_METRIC: Record<AnalyticsTabMetric, SeverityDistributionDTO[]> = {
  accidents: [
    { severity: 'Fatal', count: 3124 },
    { severity: 'Grave', count: 10240 },
    { severity: 'Leve', count: 19412 },
    { severity: 'Sem vítimas', count: 8070 },
  ],
  victims: [
    { severity: 'Fatal', count: 3680 },
    { severity: 'Grave', count: 13890 },
    { severity: 'Leve', count: 29450 },
    { severity: 'Sem vítimas', count: 14120 },
  ],
};

const SAMPLE_TIME_BY_METRIC: Record<AnalyticsTabMetric, TimeDistributionDTO[]> = {
  accidents: [
    { time: '00:00:00', count: 980 },
    { time: '01:00:00', count: 760 },
    { time: '02:00:00', count: 640 },
    { time: '03:00:00', count: 590 },
    { time: '04:00:00', count: 720 },
    { time: '05:00:00', count: 1120 },
    { time: '06:00:00', count: 1840 },
    { time: '07:00:00', count: 2490 },
    { time: '08:00:00', count: 2210 },
    { time: '09:00:00', count: 1930 },
    { time: '10:00:00', count: 1850 },
    { time: '11:00:00', count: 1970 },
    { time: '12:00:00', count: 2040 },
    { time: '13:00:00', count: 2110 },
    { time: '14:00:00', count: 2290 },
    { time: '15:00:00', count: 2450 },
    { time: '16:00:00', count: 2740 },
    { time: '17:00:00', count: 3120 },
    { time: '18:00:00', count: 3340 },
    { time: '19:00:00', count: 2960 },
    { time: '20:00:00', count: 2420 },
    { time: '21:00:00', count: 1890 },
    { time: '22:00:00', count: 1510 },
    { time: '23:00:00', count: 1210 },
  ],
  victims: [
    { time: '00:00:00', count: 1410 },
    { time: '01:00:00', count: 1090 },
    { time: '02:00:00', count: 940 },
    { time: '03:00:00', count: 870 },
    { time: '04:00:00', count: 1020 },
    { time: '05:00:00', count: 1640 },
    { time: '06:00:00', count: 2560 },
    { time: '07:00:00', count: 3420 },
    { time: '08:00:00', count: 3050 },
    { time: '09:00:00', count: 2680 },
    { time: '10:00:00', count: 2590 },
    { time: '11:00:00', count: 2750 },
    { time: '12:00:00', count: 2890 },
    { time: '13:00:00', count: 3010 },
    { time: '14:00:00', count: 3250 },
    { time: '15:00:00', count: 3480 },
    { time: '16:00:00', count: 3890 },
    { time: '17:00:00', count: 4410 },
    { time: '18:00:00', count: 4720 },
    { time: '19:00:00', count: 4190 },
    { time: '20:00:00', count: 3420 },
    { time: '21:00:00', count: 2680 },
    { time: '22:00:00', count: 2150 },
    { time: '23:00:00', count: 1730 },
  ],
};

const SAMPLE_WEATHER: WeatherDistributionDTO[] = [
  { weatherCondition: 'Nublado', count: 9820 },
  { weatherCondition: 'Céu Claro', count: 5140 },
  { weatherCondition: 'Sol', count: 10940 },
  { weatherCondition: 'Chuva', count: 3010 },
  { weatherCondition: 'Garoa/Chuvisco', count: 6520 },
  { weatherCondition: 'Nevoeiro/Neblina', count: 8340 },
  { weatherCondition: 'Vento', count: 8290 },
  { weatherCondition: 'Neve', count: 680 },
];

const SAMPLE_VEHICLES: VehicleDistributionDTO[] = [
  { vehicleType: 'Motocicleta', count: 12450 },
  { vehicleType: 'Motoneta', count: 2550 },
  { vehicleType: 'Automóvel', count: 15200 },
  { vehicleType: 'Caminhonete', count: 2800 },
  { vehicleType: 'Caminhão', count: 1850 },
  { vehicleType: 'Ônibus', count: 650 },
  { vehicleType: 'Bicicleta', count: 600 },
  { vehicleType: 'Carroça-charrete', count: 2000 },
];

/**
 * Interactive preview route using controlled sample DTO payloads so all 4 charts
 * can be visually inspected in the browser without requiring a running backend.
 */
export function AnalyticsChartsPreviewPage() {
  const [severityMetric, setSeverityMetric] = useState<AnalyticsTabMetric>('accidents');
  const [hourlyMetric, setHourlyMetric] = useState<AnalyticsTabMetric>('accidents');

  return (
    <main className="min-h-screen bg-(--background-canvas) px-6 py-8 text-(--text-primary)">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-(--border-subtle) pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium tracking-wider text-(--primary-200) uppercase">
              Preview com dados de exemplo (DTOs controlados)
            </span>
            <h1 className="type-display-sm text-(--white-800)">Beltwise Charts Showcase</h1>
            <p className="text-[13px] font-light text-(--text-secondary)">
              Visualização interativa dos 4 gráficos implementados sem depender do backend local.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SeverityDistributionChart
            metric={severityMetric}
            onMetricChange={setSeverityMetric}
            data={SAMPLE_SEVERITY_BY_METRIC[severityMetric]}
          />
          <HourlyDistributionChart
            metric={hourlyMetric}
            onMetricChange={setHourlyMetric}
            data={SAMPLE_TIME_BY_METRIC[hourlyMetric]}
          />
          <WeatherDistributionChart data={SAMPLE_WEATHER} />
          <VehicleDistributionChart data={SAMPLE_VEHICLES} />
        </div>
      </div>
    </main>
  );
}

