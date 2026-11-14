import type { SVGProps } from 'react';

export type ChevronDownIconProps = SVGProps<SVGSVGElement>;

/** Downward chevron icon (`currentColor` stroke). */
export function ChevronDownIcon({
  className = '',
  strokeWidth = 1.5,
  ...props
}: ChevronDownIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 13.5 6.50001"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M12.75 0.750009C12.75 0.750009 8.33101 5.75001 6.75001 5.75001C5.16901 5.75001 0.750009 0.750009 0.750009 0.750009"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

