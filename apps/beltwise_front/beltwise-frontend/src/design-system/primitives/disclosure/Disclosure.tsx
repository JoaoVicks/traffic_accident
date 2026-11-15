import type { ButtonHTMLAttributes } from 'react';
import { ChartLineIcon, ChevronDownIcon, DotIcon } from '../icons';

export interface DisclosureProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Expanded disclosure state (`aria-expanded`). Defaults to `false` per Figma. */
  expanded?: boolean;
  /** Primary disclosure header title. Defaults to Figma specimen text ("análise geral"). */
  title?: string;
  /** Secondary summary count text. Defaults to Figma specimen text ("8 análises"). */
  summaryText?: string;
}

/**
 * Collapsible analytics panel trigger (`Control/Disclosure` — Figma 21:308).
 * Preserves fixed 437 × 41 px header geometry, `black - 450` surface, `shadow-tools`
 * elevation, chart icon, dot separator, italic summary count, and trailing chevron.
 */
export function Disclosure({
  expanded = false,
  title = 'análise geral',
  summaryText = '8 análises',
  type = 'button',
  className = '',
  ...props
}: DisclosureProps) {
  return (
    <button
      type={type}
      aria-expanded={expanded}
      className={`flex h-[41px] w-[437px] shrink-0 cursor-pointer items-center justify-between
         rounded-(--radius-10) bg-(--black-450) px-6 
         py-2 shadow-(--shadow-tools) focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) 
         disabled:cursor-not-allowed ${className}`.trim()}
      {...props}
    >
      <span className="flex shrink-0 items-center gap-1">
        <span className="flex shrink-0 items-center gap-3">
          <span
            className="relative size-[16px] shrink-0 text-(--white-500)"
            aria-hidden="true"
          >
            <span className="absolute inset-[-4.69%_-4.17%]">
              <ChartLineIcon />
            </span>
          </span>
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-regular) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--white-500)">
            {title}
          </span>
        </span>

        <span
          className="relative size-[4px] shrink-0 text-(--observed-color-383838)"
          aria-hidden="true"
        >
          <DotIcon />
        </span>

        <span className="font-[var(--font-sans)] text-[length:var(--font-size-14)] font-(--font-weight-light) italic leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--black-300)">
          {summaryText}
        </span>
      </span>

      <span
        className={`relative h-[7px] w-[16px] shrink-0 text-(--white-800) transition-transform duration-150 ${
          expanded ? 'rotate-180' : ''
        }`.trim()}
        aria-hidden="true"
      >
        <span className="absolute inset-[-8.33%_-3.65%]">
          <ChevronDownIcon strokeWidth={1.16667} />
        </span>
      </span>
    </button>
  );
}

