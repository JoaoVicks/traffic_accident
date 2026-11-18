import type { SVGProps } from 'react';

export type PlusIconProps = SVGProps<SVGSVGElement>;

/** Compact plus icon (`currentColor` stroke, Figma `1:2838`). */
export function PlusIcon({ className = '', ...props }: PlusIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 6.5625 6.5625"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M3.28125 0.28125V6.28125M6.28125 3.28125H0.28125"
        stroke="currentColor"
        strokeWidth="0.5625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

