import type { SVGProps } from 'react';

export type SearchIconProps = SVGProps<SVGSVGElement>;

/** Magnifying glass search icon (`currentColor` stroke). */
export function SearchIcon({
  className = '',
  strokeWidth = 1.5,
  ...props
}: SearchIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 12.7836 12.7836"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M9.52612 9.52612L12.0336 12.0336M10.7799 5.76493C10.7799 4.43488 10.2515 3.15932 9.31101 2.21884C8.37053 1.27836 7.09497 0.75 5.76493 0.75C4.43488 0.75 3.15932 1.27836 2.21884 2.21884C1.27836 3.15932 0.75 4.43488 0.75 5.76493C0.75 7.09497 1.27836 8.37053 2.21884 9.31101C3.15932 10.2515 4.43488 10.7799 5.76493 10.7799C7.09497 10.7799 8.37053 10.2515 9.31101 9.31101C10.2515 8.37053 10.7799 7.09497 10.7799 5.76493Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

