import { useEffect, useState, type HTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  BeltwiseBrandIcon,
  NavigationItem,
  type NavigationItemContext,
} from '@/design-system/primitives';

export interface WorkspaceSidebarNavProps extends HTMLAttributes<HTMLElement> {
  /** Controlled expanded state (`false` = 59px Compact rail, `true` = 259px Expanded reference). */
  expanded?: boolean;
  /** Initial expanded state when uncontrolled. Defaults to `false` (Compact rail). */
  defaultExpanded?: boolean;
  /** Callback fired when the brand mark toggles between Compact and Expanded states. */
  onExpandedChange?: (expanded: boolean) => void;
}

/**
 * Persistent desktop sidebar navigation rail implementing Figma
 * `Navigation/NavigationPattern/Compact` (`25:2286`) and
 * `Navigation/NavigationPattern/ExpandedReference` (`25:2349`).
 */
export function WorkspaceSidebarNav({
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  className = '',
  ...props
}: WorkspaceSidebarNavProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? internalExpanded;

  const location = useLocation();
  const navigate = useNavigate();

  const isRankingActive = location.pathname.startsWith('/ranking');
  const isHomeActive = !isRankingActive;
  const navContext: NavigationItemContext = isExpanded ? 'expanded' : 'compact';

  const setExpandedState = (nextExpanded: boolean) => {
    if (controlledExpanded === undefined) {
      setInternalExpanded(nextExpanded);
    }
    onExpandedChange?.(nextExpanded);
  };

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedState(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isExpanded) {
      setExpandedState(false);
    }
  };

  return (
    <nav
      aria-label="Navegação principal do workspace"
      data-context={navContext}
      className={`${
        isExpanded
          ? 'flex h-(--size-navigation-expanded-height) w-(--size-navigation-expanded-width) flex-col items-start gap-[18px] overflow-clip rounded-(--radius-12) bg-(--black-450) px-[16px] pt-[16px] pb-[20px] shadow-(--shadow-tools)'
          : 'flex h-[205.625px] w-(--size-navigation-compact-width) flex-col items-center justify-center gap-[18px] overflow-clip rounded-(--radius-12) bg-(--black-450) px-[16px] pt-[16px] pb-[20px] shadow-(--shadow-contextual-2)'
      } ${className}`.trim()}
      {...props}
    >
      <div
        className={
          isExpanded
            ? 'flex w-full shrink-0 flex-col items-start justify-center gap-[10px]'
            : 'flex w-full shrink-0 flex-col items-center gap-[10px]'
        }
      >
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? 'Recolher menu de navegação' : 'Expandir menu de navegação'
          }
          onClick={() => setExpandedState(!isExpanded)}
          className={
            isExpanded
              ? 'flex w-[137px] cursor-pointer items-center rounded-(--radius-6) text-(--white-550) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200)'
              : 'flex size-[31px] cursor-pointer items-center justify-center rounded-(--radius-6) text-(--white-550) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200)'
          }
        >
          {isExpanded ? (
            <>
              <span className="mr-[-3px] size-[27px] shrink-0">
                <BeltwiseBrandIcon className="size-[36px]" />
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-26-248)] font-(--font-weight-medium) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--white-550)">
                Beltwise
              </span>
            </>
          ) : (
            <span className="size-[31px] shrink-0">
              <BeltwiseBrandIcon className="size-[36px]" />
            </span>
          )}
        </button>

        <div
          aria-hidden="true"
          className={
            isExpanded
              ? 'h-[1.5px] w-full shrink-0 rounded-full bg-(--border-subtle)'
              : 'h-[1.5px] w-[27px] shrink-0 rounded-full bg-(--border-subtle)'
          }
        />
      </div>

      <div
        className={
          isExpanded
            ? 'flex w-full shrink-0 flex-col items-start gap-[8px]'
            : 'flex shrink-0 flex-col items-start gap-[8px]'
        }
      >
        <NavigationItem
          destination="home"
          context={navContext}
          active={isHomeActive}
          onClick={() => handleNavigate('/')}
        />
        <NavigationItem
          destination="ranking"
          context={navContext}
          active={isRankingActive}
          onClick={() => handleNavigate('/ranking')}
        />
        <NavigationItem
          destination="settings"
          context={navContext}
          active={false}
        />
      </div>
    </nav>
  );
}

