import type { SVGProps } from 'react';

export type CopyIconProps = SVGProps<SVGSVGElement>;

/** Copy-to-clipboard icon (`currentColor` stroke, Figma `1:2742`). */
export function CopyIcon({ className = '', ...props }: CopyIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 11.0797 12.2115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M2.70194 5.53787V4.4019C2.70194 2.52754 2.70193 1.59036 3.28412 1.00818C3.86631 0.425991 4.80349 0.425991 6.67784 0.425991C8.5522 0.425991 9.48938 0.425991 10.0716 1.00818C10.6537 1.59036 10.6537 2.52754 10.6537 4.4019V5.53787C10.6537 7.41223 10.6537 8.34941 10.0716 8.93159C9.48938 9.51378 8.5522 9.51378 6.67784 9.51378C4.80349 9.51378 3.86631 9.51378 3.28412 8.93159C2.70193 8.34941 2.70194 7.41223 2.70194 5.53787Z"
        stroke="currentColor"
        strokeWidth="0.85198"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.425991 2.6977V7.80958C0.425991 9.68393 0.425991 10.6211 1.00818 11.2033C1.59036 11.7855 2.52754 11.7855 4.4019 11.7855H8.3778"
        stroke="currentColor"
        strokeWidth="0.85198"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

