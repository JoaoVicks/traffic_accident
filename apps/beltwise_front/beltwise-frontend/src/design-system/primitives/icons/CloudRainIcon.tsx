import type { SVGProps } from 'react';

export type CloudRainIconProps = SVGProps<SVGSVGElement>;

/** Rain weather icon (`currentColor` stroke). */
export function CloudRainIcon({ className = '', ...props }: CloudRainIconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M12.5 15L11.5 17M17 15L16 17M13.5 19L12.5 21M8 15L7 17M9 19L8 21M17.478 8.898H17.5C19.985 8.898 22 10.878 22 13.321C21.9985 14.0521 21.8149 14.7713 21.4657 15.4137C21.1165 16.056 20.6128 16.6012 20 17M17.478 8.898C17.492 8.736 17.4993 8.572 17.5 8.406C17.5 5.421 15.038 3 12 3C9.123 3 6.762 5.171 6.52 7.937M17.478 8.898C17.3778 9.98422 16.9467 11.0135 16.243 11.847M6.52 7.937C3.984 8.175 2 10.274 2 12.83C2.00119 13.5964 2.18287 14.3518 2.53034 15.0349C2.87781 15.718 3.38129 16.3097 4 16.762M6.52 7.937C6.678 7.92233 6.838 7.915 7 7.915C8.126 7.915 9.165 8.281 10 8.898"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

