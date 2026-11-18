import type { SVGProps } from 'react';

export type UturnIconProps = SVGProps<SVGSVGElement>;

/** Road U-turn / return layout icon (`currentColor` stroke, Figma `1:2827`). */
export function UturnIcon({ className = '', ...props }: UturnIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 13.125 10.125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M5.8125 0.5625H9.1875C9.63071 0.5625 10.0696 0.649797 10.4791 0.819407C10.8885 0.989016 11.2606 1.23762 11.574 1.55101C11.8874 1.86441 12.136 2.23647 12.3056 2.64594C12.4752 3.05542 12.5625 3.49429 12.5625 3.9375C12.5625 4.38071 12.4752 4.81958 12.3056 5.22906C12.136 5.63853 11.8874 6.01059 11.574 6.32399C11.2606 6.63738 10.8885 6.88599 10.4791 7.05559C10.0696 7.2252 9.63071 7.3125 9.1875 7.3125H0.562501"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.8125 5.0625C2.8125 5.0625 0.5625 6.72 0.5625 7.3125C0.5625 7.905 2.8125 9.5625 2.8125 9.5625"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

