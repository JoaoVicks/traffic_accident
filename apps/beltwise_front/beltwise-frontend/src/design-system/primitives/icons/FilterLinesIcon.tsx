import type { SVGProps } from 'react';

export type FilterLinesIconProps = SVGProps<SVGSVGElement>;

/** Stacked horizontal filter lines icon (`currentColor` stroke). */
export function FilterLinesIcon({ className = '', ...props }: FilterLinesIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M2.375 4.75H16.625M4.75 9.5H14.25M7.125 14.25H11.875"
        stroke="currentColor"
        strokeWidth="1.41176"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

