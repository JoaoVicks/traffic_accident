import type { SVGProps } from 'react';

export type ClockIconProps = SVGProps<SVGSVGElement>;

/** Time / clock icon used in the Filter panel (`currentColor` stroke). */
export function ClockIcon({ className = '', ...props }: ClockIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 11.4667 11.4667"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M11.0667 5.73333C11.0667 8.67885 8.67885 11.0667 5.73333 11.0667C2.78781 11.0667 0.4 8.67885 0.4 5.73333C0.4 2.78781 2.78781 0.4 5.73333 0.4C8.67885 0.4 11.0667 2.78781 11.0667 5.73333Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M5.73418 3.6V5.73333L6.80085 6.8"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

