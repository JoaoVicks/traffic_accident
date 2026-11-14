import type { SVGProps } from 'react';

export type RoadRouteIconProps = SVGProps<SVGSVGElement>;

/** Winding road route icon for roads ranking tab (`currentColor` stroke). */
export function RoadRouteIcon({ className = '', ...props }: RoadRouteIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 11.6693 8.40999"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M1.49169 5.83304C1.49169 5.83304 0.406972 5.03375 0.406972 4.74778C0.406972 4.46182 1.49223 3.66252 1.49223 3.66252M0.529064 4.67561C1.29526 4.83298 2.73106 4.89429 3.4419 3.56322C3.73655 3.09439 3.68174 2.30975 3.68174 1.41658C3.69965 1.05302 4.01003 0.390466 4.78708 0.407288C5.56413 0.42411 5.81916 1.0617 5.84955 1.3786V6.86513C5.84195 7.32745 6.11001 8.00302 6.93264 8.00302C7.73573 8.00302 8.05046 7.29109 7.981 6.75769C7.79325 5.31212 8.23224 3.79655 10.1314 3.66415H11.2623"
        stroke="currentColor"
        strokeWidth="0.813945"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

