import type { SVGProps } from 'react';

export type SnowflakeIconProps = SVGProps<SVGSVGElement>;

/** Snow weather icon (`currentColor` stroke). */
export function SnowflakeIcon({ className = '', ...props }: SnowflakeIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 19.5001 19.5002"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M18.75 12.0001L17.919 11.3411C16.973 10.5911 16.5 10.2161 16.5 9.75011C16.5 9.28411 16.973 8.90911 17.919 8.15911L18.75 7.50011M0.75003 7.50011L1.58103 8.15911C2.52703 8.90911 3.00003 9.28411 3.00003 9.75011C3.00003 10.2161 2.52703 10.5911 1.58103 11.3411L0.75003 12.0001M12.322 18.7501L12.478 17.6911C12.656 16.4861 12.745 15.8841 13.152 15.6491C13.5576 15.4139 14.1201 15.6365 15.2442 16.0814L15.256 16.0861L16.25 16.4801M7.17803 0.75011L7.02203 1.80911C6.84403 3.01411 6.75503 3.61611 6.34803 3.85111C5.94245 4.08628 5.37998 3.86368 4.25588 3.4188L4.24403 3.41411L3.25003 3.02011M2.75003 16.4821L3.82003 16.0871C5.03803 15.6391 5.64703 15.4151 6.08503 15.6491C6.52214 15.8826 6.61764 16.4847 6.80787 17.6838L6.80903 17.6911L6.97703 18.7501M16.75 3.01811L15.68 3.41211C14.462 3.86211 13.852 4.08511 13.415 3.85111C12.978 3.61711 12.882 3.01311 12.691 1.80911L12.523 0.75011"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.75 9.75011H9.75003M9.75003 9.75011H2.75003M9.75003 9.75011L13.25 15.7501M9.75003 9.75011L6.25003 3.75011M9.75003 9.75011L13.25 3.75011M9.75003 9.75011L6.25003 15.7501"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

