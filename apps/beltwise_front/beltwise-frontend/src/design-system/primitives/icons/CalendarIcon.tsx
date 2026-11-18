import type { SVGProps } from 'react';

export type CalendarIconProps = SVGProps<SVGSVGElement>;

/** Calendar date icon (`currentColor` stroke, Figma `1:2763`). */
export function CalendarIcon({ className = '', ...props }: CalendarIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 12.5432 13.8297"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M8.84459 0.482432V3.0554M3.69865 0.482432V3.0554M0.482432 5.62837H12.0608M6.91486 1.76892H5.62837C3.20271 1.76892 1.98955 1.76892 1.23631 2.5228C0.483076 3.27668 0.482432 4.48919 0.482432 6.91486V8.20134C0.482432 10.627 0.482432 11.8402 1.23631 12.5934C1.99019 13.3466 3.20271 13.3473 5.62837 13.3473H6.91486C9.34053 13.3473 10.5537 13.3473 11.3069 12.5934C12.0602 11.8395 12.0608 10.627 12.0608 8.20134V6.91486C12.0608 4.48919 12.0608 3.27604 11.3069 2.5228C10.553 1.76956 9.34053 1.76892 6.91486 1.76892Z"
        stroke="currentColor"
        strokeWidth="0.964864"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

