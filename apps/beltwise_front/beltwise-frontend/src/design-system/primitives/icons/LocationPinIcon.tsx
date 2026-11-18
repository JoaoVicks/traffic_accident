import type { SVGProps } from 'react';

export type LocationPinIconProps = SVGProps<SVGSVGElement>;

/** Map pin location icon (`currentColor` stroke, Figma `1:2841`). */
export function LocationPinIcon({
  className = '',
  ...props
}: LocationPinIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      viewBox="0 0 11.4344 12.6048"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block size-full max-w-none ${className}`.trim()}
      {...props}
    >
      <path
        d="M6.66559 11.794C6.40778 12.0333 6.06878 12.1659 5.71701 12.1651C5.36544 12.1658 5.02668 12.0332 4.76901 11.794C2.44093 9.60077 -0.679203 7.15074 0.842169 3.59384C1.66588 1.67087 3.64044 0.439703 5.7176 0.439703C7.79475 0.439703 9.7699 1.67087 10.5924 3.59384C12.112 7.14664 8.99954 9.60839 6.66559 11.794Z"
        stroke="currentColor"
        strokeWidth="0.879406"
      />
      <path
        d="M7.76458 5.71594C7.76458 5.9854 7.7115 6.25223 7.60838 6.50119C7.50526 6.75014 7.35412 6.97634 7.16358 7.16688C6.97304 7.35743 6.74683 7.50857 6.49788 7.61169C6.24892 7.71481 5.9821 7.76789 5.71263 7.76789C5.44317 7.76789 5.17634 7.71481 4.92738 7.61169C4.67843 7.50857 4.45223 7.35743 4.26169 7.16688C4.07114 6.97634 3.92 6.75014 3.81688 6.50119C3.71376 6.25223 3.66068 5.9854 3.66068 5.71594C3.66068 5.17173 3.87687 4.64981 4.26169 4.26499C4.6465 3.88018 5.16842 3.66399 5.71263 3.66399C6.25684 3.66399 6.77876 3.88018 7.16358 4.26499C7.54839 4.64981 7.76458 5.17173 7.76458 5.71594Z"
        stroke="currentColor"
        strokeWidth="0.879406"
      />
    </svg>
  );
}

