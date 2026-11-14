import type { SVGProps } from 'react';

export type HorseIconProps = SVGProps<SVGSVGElement>;

/** Animal-drawn / horse vehicle category icon (`currentColor` stroke). */
export function HorseIcon({ className = '', ...props }: HorseIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 15.25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M13.625 2.375L15.5 5.375C15.2945 5.786 14.8348 6.125 14.375 6.125L13.25 5C12.578 5 11.9623 4.5125 11.75 3.875M12.875 0.5L12.125 1.25C10.625 1.625 9.641 2.702 9.2495 3.8765L8.75 5.375C7.136 6.52775 5.9885 6.263 4.76675 5.888C3.99125 5.65025 3.10475 5.77025 2.53175 6.34325C2.36311 6.51185 2.22935 6.71202 2.13811 6.93234C2.04687 7.15265 1.99994 7.38879 2 7.62725V14.75M2.375 6.125L1.817 5.846C1.67828 5.77656 1.52411 5.74374 1.36913 5.75066C1.21415 5.75759 1.06352 5.80403 0.931552 5.88557C0.79958 5.96712 0.690652 6.08105 0.61512 6.21655C0.539587 6.35205 0.499958 6.50462 0.5 6.65975V9.5M12.125 4.625L12.0523 4.7345C11.8438 5.04778 11.7145 5.40697 11.6754 5.78125C11.6363 6.15552 11.6887 6.53368 11.828 6.88325C12.0211 7.36754 12.0698 7.89737 11.9683 8.40875C11.8288 9.107 11.2183 9.85475 10.625 10.25V14.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.75024 14.7498V10.2498" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M5.00011 10.9998C5.00011 10.9998 6.73111 11.8436 8.75011 10.9998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.37511 10.2498C5.00011 11.3748 3.87511 11.7498 3.87511 11.7498V14.7498M3.87511 6.12478C3.87511 6.42025 3.93331 6.71283 4.04638 6.98582C4.15946 7.2588 4.32519 7.50684 4.53412 7.71577C4.74305 7.9247 4.99109 8.09043 5.26407 8.20351C5.53706 8.31658 5.82964 8.37478 6.12511 8.37478C6.42059 8.37478 6.71317 8.31658 6.98615 8.20351C7.25913 8.09043 7.50717 7.9247 7.7161 7.71577C7.92503 7.50684 8.09077 7.2588 8.20384 6.98582C8.31691 6.71283 8.37511 6.42025 8.37511 6.12478V5.74978"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

