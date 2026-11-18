import { useId } from 'react';
import {
  ArrowLeftIcon,
  IncidentFatalBadge,
  MoreVerticalIcon,
} from '@/design-system/primitives';

export interface AccidentHeaderHeroProps {
  /** Severity pill label (e.g., `"acidente fatal"`). */
  severityBadgeLabel: string;
  /** Whether to render the fatal classification pill badge. */
  isFatal?: boolean;
  /** Navigates back to the previous workspace view. */
  onBack?: () => void;
  /** Optional overflow menu click handler. */
  onMenuClick?: () => void;
}

/**
 * Top illustration banner (`1:2728`, `404 × 189 px`) inside `AccidentDetailPanel`,
 * featuring the back button, `IncidentFatalBadge`, overflow menu trigger, and
 * decorative orange gradient vehicle silhouette.
 */
export function AccidentHeaderHero({
  severityBadgeLabel,
  isFatal = true,
  onBack,
  onMenuClick,
}: AccidentHeaderHeroProps) {
  const gradientId = `accident-hero-car-gradient-${useId().replace(/:/g, '')}`;

  return (
    <div
      data-slot="accident-header-hero"
      className="relative h-[189px] w-full shrink-0 overflow-clip rounded-(--radius-12) bg-(--black-430)"
    >
      {/* Decorative gradient vehicle silhouette (1:2729) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 188.667 129.667"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-[88px] right-[-8px] h-[129.667px] w-[188.667px]"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="80.05"
            y1="-4.77411"
            x2="76.8481"
            y2="213.76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.139423" stopColor="var(--primary-300)" />
            <stop offset="1" stopColor="#D0761A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M182.764 47.9763H120.822M156.2 106.976C181.348 103.436 182.41 98.3791 182.729 92.3105C182.941 73.5991 182.764 54.5505 182.764 47.9763C180.853 33.3106 172.544 15.9477 168.296 9.37344M120.822 47.9763H41.1812M120.822 47.9763V5.83344M120.822 5.83344H182.623M120.822 5.83344H92.213C92.213 5.83344 87.4346 5.83344 83.1871 6.23801C75.2319 6.94601 68.551 10.3849 61.8611 18.982C54.782 28.0849 49.3399 39.6151 42.128 45.7848C30.1377 56.034 7.32509 52.8648 6.05084 74.6105C5.73229 85.7362 5.73229 97.8734 6.26323 99.8962C7.11272 105.855 11.9354 106.824 17.935 106.976C23.1381 107.111 29.4121 106.74 32.4738 106.976M67.8165 106.976H120.866M120.825 106.976C120.825 111.447 122.69 115.735 126.009 118.896C129.328 122.057 133.829 123.833 138.523 123.833C143.217 123.833 147.718 122.057 151.037 118.896C154.356 115.735 156.221 111.447 156.221 106.976C156.221 102.506 154.356 98.2178 151.037 95.0565C147.718 91.8952 143.217 90.1192 138.523 90.1192C133.829 90.1192 129.328 91.8952 126.009 95.0565C122.69 98.2178 120.825 102.506 120.825 106.976ZM32.3356 106.976C32.3356 111.447 34.2002 115.735 37.5192 118.896C40.8382 122.057 45.3397 123.833 50.0335 123.833C54.7273 123.833 59.2288 122.057 62.5478 118.896C65.8668 115.735 67.7314 111.447 67.7314 106.976C67.7314 102.506 65.8668 98.2178 62.5478 95.0565C59.2288 91.8952 54.7273 90.1192 50.0335 90.1192C45.3397 90.1192 40.8382 91.8952 37.5192 95.0565C34.2002 98.2178 32.3356 102.506 32.3356 106.976Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="11.6669"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Overlay Action Bar (1:2730) */}
      <div className="relative z-10 flex w-full items-center justify-between px-[16px] pt-[13px]">
        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            aria-label="Voltar para análises"
            onClick={onBack}
            className="flex size-[20px] shrink-0 cursor-pointer items-center justify-center rounded-(--radius-4) text-(--white-250) transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
          >
            <span className="relative size-[17px]">
              <span className="absolute inset-[-4.41%]">
                <ArrowLeftIcon />
              </span>
            </span>
          </button>

          {isFatal ? <IncidentFatalBadge label={severityBadgeLabel} /> : null}
        </div>

        <button
          type="button"
          aria-label="Opções do acidente"
          onClick={onMenuClick}
          className="flex size-[20px] shrink-0 cursor-pointer items-center justify-center rounded-(--radius-4) text-(--white-250) transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-(--primary-200)"
        >
          <span className="relative h-[13.5px] w-[1.929px]">
            <span className="absolute inset-[-5.36%_-37.5%]">
              <MoreVerticalIcon />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

