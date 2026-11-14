import type { SVGProps } from 'react';

export type ZoomInIconProps = SVGProps<SVGSVGElement>;

/** Map zoom-in plus glyph (`currentColor` stroke). */
export function ZoomInIcon({ className = '', ...props }: ZoomInIconProps) {
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
        d="M14.4935 7.01299V14.4935M14.4935 14.4935V21.974M14.4935 14.4935H21.974M14.4935 14.4935H7.01299"
        stroke="currentColor"
        strokeWidth="1.4026"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

