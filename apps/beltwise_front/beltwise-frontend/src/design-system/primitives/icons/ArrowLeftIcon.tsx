import type { SVGProps } from 'react';

export type ArrowLeftIconProps = SVGProps<SVGSVGElement>;

/** Left-pointing navigation arrow icon (`currentColor` stroke, Figma `1:2732`). */
export function ArrowLeftIcon({ className = '', ...props }: ArrowLeftIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 18.5 18.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M17.1429 9.25H0.75M10.4643 0.75C10.4643 0.75 17.75 7.01026 17.75 9.25C17.75 11.4898 10.4643 17.75 10.4643 17.75"
        transform="rotate(180 9.25 9.25)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

