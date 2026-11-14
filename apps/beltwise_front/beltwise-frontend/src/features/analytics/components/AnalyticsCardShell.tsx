import type { ReactNode } from 'react';
import { cn } from 'cn';

export interface AnalyticsCardShellProps {
  header: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
  bodyClassName?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * Shared Beltwise analytics card shell (`bg-(--black-450)`, `--radius-12`, `--shadow-tools`)
 * handling loading, empty, and error states consistently across all chart cards.
 */
export function AnalyticsCardShell({
  header,
  children,
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  emptyMessage = 'Nenhum dado encontrado para os filtros aplicados.',
  bodyClassName,
  className,
  'aria-label': ariaLabel,
}: AnalyticsCardShellProps) {
  return (
    <section
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={cn(
        'flex w-full max-w-[437px] flex-col overflow-hidden rounded-(--radius-12) bg-(--black-450) px-[18px] pt-[16px] pb-[24px] shadow-(--shadow-tools)',
        className,
      )}
    >
      <div className="shrink-0">{header}</div>

      <div className={cn('relative flex flex-1 flex-col justify-center', bodyClassName)}>
        {isLoading ? (
          <div
            role="status"
            aria-label="Carregando gráfico"
            className="flex h-[186px] w-full flex-col justify-end gap-3 rounded-[9px] bg-(--black-430)/60 p-4"
          >
            <div className="flex h-28 items-end justify-between gap-2">
              <div className="h-[55%] flex-1 animate-pulse rounded-[6px] bg-(--black-420)" />
              <div className="h-[35%] flex-1 animate-pulse rounded-[6px] bg-(--black-420)" />
              <div className="h-[82%] flex-1 animate-pulse rounded-[6px] bg-(--black-420)" />
              <div className="h-[48%] flex-1 animate-pulse rounded-[6px] bg-(--black-420)" />
              <div className="h-[68%] flex-1 animate-pulse rounded-[6px] bg-(--black-420)" />
            </div>
            <span className="sr-only">Carregando dados do gráfico...</span>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="flex h-[186px] w-full flex-col items-center justify-center gap-3 rounded-[9px] border border-(--border-subtle) bg-(--black-430) px-4 text-center"
          >
            <p className="text-[13px] font-normal text-(--white-500)">
              Não foi possível carregar este gráfico.
            </p>
            <p className="max-w-[30ch] text-[11px] font-light text-(--text-gray-axis)">
              {error}
            </p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="cursor-pointer rounded-(--radius-6) border border-(--border-subtle) bg-(--black-420) px-3 py-1 text-[12px] font-medium text-(--white-800) transition-colors hover:bg-(--black-400) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
              >
                Tentar novamente
              </button>
            ) : null}
          </div>
        ) : isEmpty ? (
          <div
            role="status"
            className="flex h-[186px] w-full items-center justify-center rounded-[9px] border border-(--border-subtle) bg-(--black-430)/70 px-6 text-center"
          >
            <p className="text-[13px] font-light text-(--text-gray-axis)">{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

