import type { SVGProps } from 'react';

export type RoadHighwayIconProps = SVGProps<SVGSVGElement>;

/** Highway lane configuration icon (`hugeicons:road`, Figma `23:838`, `currentColor` stroke). */
export function RoadHighwayIcon({
  className = '',
  strokeWidth = 1.5,
  ...props
}: RoadHighwayIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 21.5 21.497"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M0.75 20.747V10.744M20.75 20.747V10.744M10.75 20.746V19.746M10.75 16.745V15.745"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.475 4.403L5.305 5.163M5.305 5.163C5.465 4.894 5.74 4.423 5.832 4.13C6.631 1.56 6.702 0.852 7.935 0.75H13.562C14.796 0.852 14.866 1.56 15.665 4.13C15.756 4.424 15.983 4.894 16.142 5.162M5.305 5.163C4.701 6.183 3.9 6.849 3.78 7.729C3.76 7.873 3.78 9.481 3.78 10.647C3.78 11.523 4.624 11.497 5.446 11.565C5.57466 11.5756 5.70332 11.5893 5.832 11.6041M16.142 5.162C16.747 6.182 17.598 6.849 17.718 7.729C17.738 7.873 17.795 9.482 17.718 10.647C17.668 11.428 17.013 11.499 16.388 11.552C15.834 11.599 15.274 11.703 14.718 11.71C11.844 11.741 9.922 11.738 7.016 11.708C6.62091 11.7042 6.22638 11.6493 5.832 11.6041M16.142 5.162H5.306M16.142 5.162L17.115 4.403M5.832 11.6041L5.832 11.604M5.832 11.6041L5.754 13.248M3.954 7.179L5.162 8.099M9.308 9.261H12.247M16.37 8.076L17.705 7.651M15.732 11.625V13.248"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

