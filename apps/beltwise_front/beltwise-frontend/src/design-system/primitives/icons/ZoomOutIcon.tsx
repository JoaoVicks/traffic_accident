import type { SVGProps } from 'react';

export type ZoomOutIconProps = SVGProps<SVGSVGElement>;

/** Map zoom-out minus glyph (`currentColor` stroke). */
export function ZoomOutIcon({ className = '', ...props }: ZoomOutIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 28.987 28.987"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M21.974 14.4935H7.01299"
        stroke="currentColor"
        strokeWidth="1.4026"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

