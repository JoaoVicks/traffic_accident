import type { SVGProps } from 'react';

export type WindFastIconProps = SVGProps<SVGSVGElement>;

/** Wind weather icon (`currentColor` stroke). */
export function WindFastIcon({ className = '', ...props }: WindFastIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 21.5002 19.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M0.750047 3.691C4.25005 7.123 9.32605 5.652 10.482 3.691C10.652 3.403 10.75 3.068 10.75 2.711C10.75 1.628 9.85505 0.75 8.75005 0.75C7.64505 0.75 6.75005 1.628 6.75005 2.711M15.75 6.678C15.75 5.061 16.87 3.75 18.25 3.75C19.63 3.75 20.75 5.061 20.75 6.678C20.7561 7.3513 20.5515 8.00965 20.165 8.561C18.096 11.941 8.02605 10.666 2.75005 9.606M11.835 17.637C12.041 18.286 12.597 18.75 13.25 18.75C14.078 18.75 14.75 18.003 14.75 17.081C14.75 16.768 14.672 16.474 14.537 16.224C13.25 13.742 6.75005 12.074 0.750047 16.524"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.75 13.25H19.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

