import type { SVGProps } from 'react';

export type BuildingIconProps = SVGProps<SVGSVGElement>;

/** States / urban buildings icon (`currentColor` stroke). */
export function BuildingIcon({ className = '', ...props }: BuildingIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 10.75 10.7499"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M6.37253 3.37472H4.37253C3.13153 3.37472 2.87253 3.63372 2.87253 4.87472V10.3747H7.87253V4.87472C7.87253 3.63372 7.61353 3.37472 6.37253 3.37472Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path
        d="M4.875 5.37487H5.875M4.875 6.87487H5.875M4.875 8.37487H5.875M9.875 10.3749V3.46787C9.875 2.85337 9.875 2.54637 9.7255 2.29987C9.5765 2.05287 9.3075 1.91537 8.7695 1.64087L6.5985 0.532372C6.0185 0.236372 5.875 0.340872 5.875 0.989872V3.22687M9.875 10.3749H10.375M9.875 10.3749H0.875M0.875 10.3749V5.87487C0.875 5.46137 0.9615 5.37487 1.375 5.37487H2.875M0.875 10.3749H0.375"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

