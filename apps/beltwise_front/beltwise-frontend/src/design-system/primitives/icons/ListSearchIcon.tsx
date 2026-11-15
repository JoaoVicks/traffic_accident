import type { SVGProps } from 'react';

export type ListSearchIconProps = SVGProps<SVGSVGElement>;

/** List-with-magnifier icon for expanding ranking items (`currentColor` stroke). */
export function ListSearchIcon({ className = '', ...props }: ListSearchIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 11.5312 9.84375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M0.421875 3.23438H2.67188M0.421875 6.04688H2.67188M0.421875 0.421875H9.42188M9.44212 7.75462L11.1094 9.42188M9.44212 7.75462C8.91468 8.28207 8.19905 8.57812 7.45312 8.57812C6.7072 8.57812 5.99183 8.28181 5.46439 7.75436C4.93694 7.22692 4.64062 6.51155 4.64062 5.76562C4.64062 5.0197 4.93694 4.30433 5.46439 3.77689C5.99183 3.24944 6.7072 2.95312 7.45312 2.95312C8.19905 2.95312 8.91442 3.24944 9.44186 3.77689C9.96931 4.30433 10.2656 5.0197 10.2656 5.76562C10.2656 6.51155 9.96957 7.22718 9.44212 7.75462Z"
        stroke="currentColor"
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

