import type { SVGProps } from 'react';

export type SunWarmIconProps = SVGProps<SVGSVGElement>;

/** Sunny weather icon (`currentColor` stroke). */
export function SunWarmIcon({ className = '', ...props }: SunWarmIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 21.5 21.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M15.75 10.75C15.75 12.0761 15.2232 13.3479 14.2855 14.2855C13.3479 15.2232 12.0761 15.75 10.75 15.75C9.42393 15.75 8.15216 15.2232 7.21448 14.2855C6.27679 13.3479 5.75001 12.0761 5.75001 10.75C5.75001 9.42393 6.27679 8.15216 7.21448 7.21447C8.15216 6.27679 9.42393 5.75001 10.75 5.75001C12.0761 5.75001 13.3479 6.27679 14.2855 7.21447C15.2232 8.15216 15.75 9.42393 15.75 10.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.75 0.750009C10.373 1.08301 9.84501 1.95001 10.75 2.75001M10.75 18.75C11.127 19.083 11.656 19.95 10.75 20.75M18.25 3.25301C17.718 3.22001 16.675 3.47301 16.754 4.74801M4.24601 16.25C4.27901 16.782 4.02601 17.825 2.75001 17.746M3.75301 3.25001C3.72001 3.78201 3.97301 4.82601 5.25001 4.74701M16.75 16.253C17.282 16.221 18.325 16.461 18.246 17.667M20.75 10.75C20.417 10.373 19.55 9.84501 18.75 10.75M2.75001 10.25C2.41701 10.627 1.55001 11.156 0.750009 10.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

