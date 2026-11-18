import type { SVGProps } from 'react';

export type RoadDividerIconProps = SVGProps<SVGSVGElement>;

/** Divided lane road type icon (`currentColor` stroke, Figma `1:2821`). */
export function RoadDividerIcon({
  className = '',
  ...props
}: RoadDividerIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 10.3817 12.7547"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M1.14021 1.13962C0.444932 1.8349 0.444932 2.95435 0.444932 5.19087V7.56384C0.444932 9.80096 0.444932 10.9198 1.14021 11.6145C1.8349 12.3098 2.95376 12.3098 5.19087 12.3098C7.42799 12.3098 8.54685 12.3098 9.24153 11.6145C9.93681 10.9198 9.93681 9.80096 9.93681 7.56384V5.19087C9.93681 2.95376 9.93681 1.8349 9.24153 1.13962C8.54685 0.444932 7.42799 0.444932 5.19087 0.444932C2.95376 0.444932 1.8349 0.444932 1.14021 1.13962Z"
        stroke="currentColor"
        strokeWidth="0.889864"
        strokeLinejoin="round"
      />
      <path
        d="M5.2057 5.7846V6.97108M5.2057 2.52176V3.70825M5.2057 9.04743V10.2339"
        stroke="currentColor"
        strokeWidth="0.889864"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

