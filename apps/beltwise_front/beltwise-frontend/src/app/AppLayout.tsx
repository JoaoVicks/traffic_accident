import { NavLink, Outlet } from 'react-router';

const NAV_ITEMS = [
  { to: '/', label: 'Design System', end: true },
  { to: '/analytics/preview', label: 'Charts Preview', end: true },
  { to: '/analytics', label: 'Analytics (Live API)', end: true },
] as const;

/**
 * Top-level shell providing navigation between the Design System showcase,
 * the controlled Chart Preview showcase, and the live Analytics dashboard.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-(--background-canvas) text-(--text-primary)">
      <nav
        aria-label="Navegação principal"
        className="sticky top-0 z-20 border-b border-(--border-subtle) bg-(--black-450)/95 px-6 py-3 backdrop-blur-xs"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] font-semibold tracking-wide text-(--white-800)">
            Beltwise
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-(--radius-6) bg-(--primary-300) px-3 py-1.5 text-[12px] font-medium text-(--black-500)'
                    : 'rounded-(--radius-6) border border-(--border-subtle) bg-(--black-430) px-3 py-1.5 text-[12px] font-normal text-(--white-500) transition-colors hover:bg-(--black-420)'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

