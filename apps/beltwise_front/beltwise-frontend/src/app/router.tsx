import { createBrowserRouter } from 'react-router';
import DesignSystemPage from '@/design-system/showcase/DesignSystemPage';
import { AccidentDetailPage } from '@/features/accidents';
import {
  AnalyticsChartsPreviewPage,
  AnalyticsDashboardPage,
  ExploreAnalyticsPage,
} from '@/features/analytics';
import { RankingPage } from '@/features/ranking';
import { AppLayout } from './AppLayout';
import {
  MapWorkspaceLayout,
  SearchableWorkspaceLayout,
} from './layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MapWorkspaceLayout />,
    children: [
      {
        element: <SearchableWorkspaceLayout />,
        children: [
          {
            index: true,
            element: <ExploreAnalyticsPage />,
          },
          {
            path: 'accidents/:accidentId',
            element: <AccidentDetailPage />,
          },
        ],
      },
      {
        path: 'ranking',
        element: <RankingPage />,
      },
    ],
  },
  {
    path: '/dev',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DesignSystemPage />,
      },
      {
        path: 'design-system',
        element: <DesignSystemPage />,
      },
      {
        path: 'analytics/preview',
        element: <AnalyticsChartsPreviewPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsDashboardPage />,
      },
    ],
  },
]);
