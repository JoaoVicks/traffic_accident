import type { SVGProps } from 'react';

export type ChevronRightIconProps = SVGProps<SVGSVGElement>;

/** Right-pointing breadcrumb chevron icon (`currentColor` stroke, Figma `23:323`). */
export function ChevronRightIcon({
  className = '',
  strokeWidth = 1,
  ...props
}: ChevronRightIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 4.00001 8.00002"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M0.500009 0.500009C0.500009 0.500009 3.50001 3.07776 3.50001 4.00001C3.50001 4.92226 0.500009 7.50001 0.500009 7.50001"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

