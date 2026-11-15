import type { SVGProps } from 'react';

export type SeverityThumbIconProps = SVGProps<SVGSVGElement>;

/** Upward pointer thumb icon for the severity slider (`currentColor` fill). */
export function SeverityThumbIcon({ className = '', ...props }: SeverityThumbIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 14.08 20.9328"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M0 6.85277H14.08V18.8208C14.08 19.9872 13.1344 20.9328 11.968 20.9328H2.112C0.945577 20.9328 0 19.9872 0 18.8208V6.85277Z"
        fill="currentColor"
      />
      <path
        d="M0 6.85277H14.08L8.77254 0.728787C7.94419 -0.22701 6.46718 -0.245345 5.61534 0.689592L0 6.85277Z"
        fill="currentColor"
      />
    </svg>
  );
}

