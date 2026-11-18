import { useId, useState } from 'react';
import {
  ElevationIcon,
  LocationPinIcon,
  PlusIcon,
  RoadDividerIcon,
  UturnIcon,
} from '@/design-system/primitives';
import type { AccidentRoadAttributes } from '../types/accident';

export interface AccidentLocationCardProps {
  address: string;
  roadAttributes: AccidentRoadAttributes;
}

/**
 * Inset location and road-context card (`1:2812`, `w-full min-h-[133px]`) with
 * address header, road attribute pill (`dupla | retorno | subindo | ver mais +`),
 * and right-hand stylized street strip + navigation arrow badge (`1:2813`).
 */
export function AccidentLocationCard({
  address,
  roadAttributes,
}: AccidentLocationCardProps) {
  const [showExtra, setShowExtra] = useState(false);
  const navGradientId = `accident-nav-arrow-${useId().replace(/:/g, '')}`;

  return (
    <div
      data-slot="accident-location-card"
      className="relative min-h-[133px] w-full shrink-0 overflow-clip rounded-(--radius-16) bg-(--black-430) px-[16px] pt-[17px] pb-[14px]"
    >
      {/* Left Content Stack */}
      <div className="relative z-10 flex max-w-[292px] flex-col items-start gap-[18px]">
        {/* Address Header (1:2839) */}
        <div className="flex flex-col items-start gap-[6px]">
          <div className="flex items-center gap-[4px]">
            <span
              aria-hidden="true"
              className="relative h-[11.725px] w-[10.555px] shrink-0 text-(--white-250)"
            >
              <span className="absolute inset-[-3.75%_-4.17%]">
                <LocationPinIcon />
              </span>
            </span>
            <h2 className="font-[var(--font-sans)] text-[length:var(--font-size-14-561)] font-(--font-weight-medium) leading-none text-(--white-250)">
              localização do acidente
            </h2>
          </div>

          <p className="type-context-italic-12-regular leading-none text-(--observed-color-bababa)">
            {address}
          </p>
        </div>

        {/* Road Attributes Pill (1:2818) */}
        <div className="flex flex-col items-start gap-[6px]">
          <div className="inline-flex items-center gap-[7px] rounded-(--radius-20) bg-(--black-420) px-[10px] py-[8px]">
            <span className="flex items-center gap-[3.187px]">
              <span
                aria-hidden="true"
                className="relative h-[11.865px] w-[9.492px] shrink-0 text-(--white-550)"
              >
                <span className="absolute inset-[-3.75%_-4.69%]">
                  <RoadDividerIcon />
                </span>
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-10-479)] font-(--font-weight-regular) leading-none text-(--white-550)">
                {roadAttributes.laneLayout}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="h-[14px] w-px shrink-0 bg-(--black-400)"
            />

            <span className="flex items-center gap-[3.18px]">
              <span
                aria-hidden="true"
                className="flex h-[12px] w-[9px] shrink-0 items-center justify-center text-(--white-550)"
              >
                <span className="-rotate-90 flex-none">
                  <span className="relative block h-[9px] w-[12px]">
                    <span className="absolute inset-[-6.25%_-4.69%]">
                      <UturnIcon />
                    </span>
                  </span>
                </span>
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-10-211)] font-(--font-weight-regular) leading-none text-(--white-550)">
                {roadAttributes.roadFeature}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="h-[14px] w-px shrink-0 bg-(--black-400)"
            />

            <span className="flex items-center gap-[3.18px]">
              <span
                aria-hidden="true"
                className="relative h-[11.632px] w-[12.212px] shrink-0 text-(--white-550)"
              >
                <span className="absolute inset-[-3.75%_-3.57%]">
                  <ElevationIcon />
                </span>
              </span>
              <span className="font-[var(--font-sans)] text-[length:var(--font-size-10-211)] font-(--font-weight-regular) leading-none text-(--white-550)">
                {roadAttributes.slopeDirection}
              </span>
            </span>

            {roadAttributes.extraAttributes.length > 0 ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-[14px] w-px shrink-0 bg-(--black-400)"
                />
                <button
                  type="button"
                  aria-expanded={showExtra}
                  onClick={() => setShowExtra((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-[3px] rounded-(--radius-4) font-[var(--font-sans)] text-[length:var(--font-size-10-211)] font-(--font-weight-regular) leading-none text-(--black-300) transition-colors hover:text-(--white-250) focus-visible:outline-2 focus-visible:outline-(--primary-200)"
                >
                  <span>{showExtra ? 'ver menos' : 'ver mais'}</span>
                  <span aria-hidden="true" className="relative size-[6px] shrink-0">
                    <span className="absolute inset-[-4.69%]">
                      <PlusIcon />
                    </span>
                  </span>
                </button>
              </>
            ) : null}
          </div>

          {showExtra && roadAttributes.extraAttributes.length > 0 ? (
            <div className="flex flex-wrap items-center gap-[6px] pl-[4px]">
              {roadAttributes.extraAttributes.map((attr) => (
                <span
                  key={attr}
                  className="rounded-(--radius-6) bg-(--black-420) px-[8px] py-[4px] font-[var(--font-sans)] text-[length:var(--font-size-10)] font-(--font-weight-regular) text-(--white-550)"
                >
                  {attr}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right Stylized Mini-Road Graphic & Navigation Badge (1:2813) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[20px] bottom-0 w-[64px]"
      >
        <div className="absolute top-0 bottom-0 left-[41px] w-[23px] bg-(--black-400)" />
        <div className="absolute top-0 bottom-0 left-[8px] flex w-[28px] items-center justify-center overflow-clip bg-(--black-450)">
          <span className="rotate-90 font-[var(--font-sans)] text-[length:var(--font-size-8-632)] font-(--font-weight-regular) whitespace-nowrap text-(--black-380)">
            {address}
          </span>
        </div>

        {/* White Circle + Orange Navigation Arrow (1:2817) */}
        <svg
          viewBox="0 0 83 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-[-13px] left-[-20px] size-[83px]"
        >
          <defs>
            <linearGradient
              id={navGradientId}
              x1="41.5"
              y1="16"
              x2="41.5"
              y2="59"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8100" />
              <stop offset="1" stopColor="#FF9B33" />
            </linearGradient>
          </defs>
          <path
            d="M63 37.5C63 49.3741 53.3741 59 41.5 59C29.6259 59 20 49.3741 20 37.5C20 25.6259 29.6259 16 41.5 16C53.3741 16 63 25.6259 63 37.5Z"
            fill="var(--observed-color-ffffff)"
          />
          <path
            d="M33.9563 33.2195L33.9615 33.2089C37.216 26.5681 38.844 23.2463 41.5 23.2463C44.156 23.2463 45.784 26.5681 49.0385 33.2089L49.0437 33.2195L51.2611 37.7489L51.2647 37.7562C53.7635 42.8569 55.0132 45.4078 54.1034 46.6356C53.8549 46.9691 53.5332 47.2413 53.1631 47.4311C51.7685 48.1492 49.21 46.7016 44.0944 43.8048C42.9591 43.1626 42.3915 42.8416 41.7709 42.7842C41.5907 42.7671 41.4093 42.7671 41.2291 42.7842C40.6085 42.8416 40.0409 43.1626 38.9071 43.8062C33.79 46.7016 31.2315 48.1492 29.8369 47.4311C29.4668 47.2413 29.1451 46.9691 28.8966 46.6356C27.9868 45.4078 29.2365 42.8569 31.7354 37.7561L31.7389 37.7489L33.9563 33.2195Z"
            fill={`url(#${navGradientId})`}
          />
        </svg>
      </div>
    </div>
  );
}

