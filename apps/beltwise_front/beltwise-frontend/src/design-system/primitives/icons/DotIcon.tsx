import type { SVGProps } from 'react';

export type DotIconProps = SVGProps<SVGSVGElement>;

/** Circular separator dot icon (`currentColor` fill). */
export function DotIcon({ className = '', ...props }: DotIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}

