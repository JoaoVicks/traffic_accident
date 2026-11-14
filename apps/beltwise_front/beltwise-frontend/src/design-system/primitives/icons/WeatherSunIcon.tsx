import type { SVGProps } from 'react';

export type WeatherSunIconProps = SVGProps<SVGSVGElement>;

/** Weather analytics header sun icon (`currentColor` stroke). */
export function WeatherSunIcon({ className = '', ...props }: WeatherSunIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 21.5 21.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M15.75 10.75C15.75 12.0761 15.2232 13.3479 14.2855 14.2855C13.3479 15.2232 12.0761 15.75 10.75 15.75C9.42392 15.75 8.15215 15.2232 7.21447 14.2855C6.27678 13.3479 5.75 12.0761 5.75 10.75C5.75 9.42392 6.27678 8.15215 7.21447 7.21447C8.15215 6.27678 9.42392 5.75 10.75 5.75C12.0761 5.75 13.3479 6.27678 14.2855 7.21447C15.2232 8.15215 15.75 9.42392 15.75 10.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.75 0.75V2.25M10.75 19.25V20.75M17.82 17.821L16.76 16.761M4.74 4.739L3.678 3.68M20.75 10.75H19.25M2.25 10.75H0.75M17.821 3.679L16.761 4.739M4.74 16.761L3.68 17.821"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

