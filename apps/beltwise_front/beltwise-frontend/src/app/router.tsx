import { createBrowserRouter } from 'react-router';
import DesignSystemPage from '@/design-system/showcase/DesignSystemPage';
import {
  AnalyticsChartsPreviewPage,
  AnalyticsDashboardPage,
} from '@/features/analytics';
import { AppLayout } from './AppLayout';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DesignSystemPage />,
      },
      {
        path: '/analytics/preview',
        element: <AnalyticsChartsPreviewPage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsDashboardPage />,
      },
    ],
  },
]);

