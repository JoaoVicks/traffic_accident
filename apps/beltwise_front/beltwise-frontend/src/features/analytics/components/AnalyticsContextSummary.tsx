import { cn } from "cn";
import {
  ChevronRightIcon,
  RankingPodiumIcon,
} from "@/design-system/primitives";
import type { AnalyticsContextMode } from "../types/analytics";
import { AnalyticsKpiTile } from "./AnalyticsKpiTile";

export interface AnalyticsContextSummaryProps {
  /**
   * Geographic context layout variant:
   * - `'search'` (`23:347`, `437 × 159 px` — breadcrumb + `Via Dutra` title)
   * - `'state'` (`23:397`, `437 × 151 px` — single `São Paulo` title, no breadcrumb)
   * - `'road'` (`23:451`, `437 × 165 px` — breadcrumb + `BR-116` title)
   */
  context?: AnalyticsContextMode;
  /** Primary geographic scope title (e.g. `"Via Dutra"`, `"São Paulo"`, `"BR-116"`). */
  contextTitle: string;
  /** Parent geographic breadcrumb label (e.g. `"São Paulo"`), displayed in `search` and `road` contexts. */
  parentContext?: string;
  /** Secondary stretch/locality breadcrumb label (e.g. `"(trecho)Guarulhos"`), displayed in `search` and `road` contexts. */
  secondaryContext?: string;
  /** Right-aligned context indicator value (e.g. `"30"`). */
  contextIndicatorValue: string | number;
  /** Total victims count displayed in the left KPI tile (`23:43`). */
  totalVictims: number | string;
  /** Total accidents count displayed in the right KPI tile (`23:59`). */
  totalAccidents: number | string;
  /** Optional custom label for the victims KPI tile. */
  victimsLabel?: string;
  /** Optional custom label for the accidents KPI tile. */
  accidentsLabel?: string;
  className?: string;
}

/**
 * Geographic analytics context summary card (`Analytics/ContextSummary/Search` `23:347`,
 * `Analytics/ContextSummary/State` `23:397`, and `Analytics/ContextSummary/Road` `23:451`).
 *
 * Preserves the exact Figma height per context (`159px` Search, `151px` State, `165px` Road),
 * `12px` Light Italic `#AEAEAE` breadcrumb hierarchy, `22px` Regular `white-250` title,
 * `16.07px` `white-800` indicator with `RankingPodiumIcon`, and paired `196.5 × 80 px` KPI tiles.
 */
export function AnalyticsContextSummary({
  context = "search",
  contextTitle,
  parentContext,
  secondaryContext,
  contextIndicatorValue,
  totalVictims,
  totalAccidents,
  victimsLabel,
  accidentsLabel,
  className,
}: AnalyticsContextSummaryProps) {
  const showBreadcrumb =
    context !== "state" && Boolean(parentContext || secondaryContext);


  return (
    <section
      aria-label={`Resumo analítico: ${contextTitle}`}
      data-slot="analytics-context-summary"
      data-context={context}
      className={cn(
        "flex w-full  flex-col items-center justify-center rounded-(--radius-12) bg-(--black-450) px-[16px]  py-[20px] shadow-(--shadow-tools)",
        className,
      )}
    >
      <div className="flex w-full h-fit shrink-0 flex-col items-start gap-[18px]">
        {/* Geographic context header (23:319 / 23:373 / 23:423) */}
        <div
          className={cn(
            "flex w-full shrink-0 items-end justify-between",
            context === "state" && "h-[17px]",
          )}
        >
          <div
            className={cn(
              "flex w-[205px] shrink-0 flex-col items-start",
              showBreadcrumb && "gap-[2px]",
            )}
          >
            {showBreadcrumb ? (
              <div
                data-slot="analytics-context-breadcrumb"
                className="flex h-fit shrink-0 items-center gap-[6px]"
              >
                {parentContext ? (
                  <span className=" leading-none whitespace-nowrap text-(--observed-color-aeaeae)">
                    {parentContext}
                  </span>
                ) : null}

                {parentContext && secondaryContext ? (
                  <span
                    aria-hidden="true"
                    className="relative h-[7px] w-[3px] shrink-0 text-(--observed-color-aeaeae)"
                  >
                    <span className="absolute inset-[-7.14%_-16.67%]">
                      <ChevronRightIcon />
                    </span>
                  </span>
                ) : null}

                {secondaryContext ? (
                  <span className="leading-none whitespace-nowrap text-(--observed-color-aeaeae)">
                    {secondaryContext}
                  </span>
                ) : null}
              </div>
            ) : null}

            <h2
              className= "text-[24px] flex items-center  whitespace-nowrap text-(--white-250)"
            >
              {contextTitle}
            </h2>
          </div>

          {/* Right context indicator (23:326 / 23:376 / 23:430) */}
          <div
            data-slot="analytics-context-indicator"
            className="flex  shrink-0  items-center gap-[2px]"
          >
            <span className="font-[var(--font-sans)] text-[length:var(--font-size-16-069)]  font-(--font-weight-regular) leading-none whitespace-nowrap text-(--white-800) tabular-nums">
              {contextIndicatorValue}
            </span>
            <span
              aria-hidden="true"
              className="relative size-[16px] mb-1.5  shrink-0 text-(--white-800)"
            >
              <span className="absolute ">
                <RankingPodiumIcon />
              </span>
            </span>
          </div>
        </div>

        {/* Paired KPI tiles row (23:329 / 23:379 / 23:433) */}
        <div
          data-slot="analytics-context-metrics"
          className="flex w-full shrink-0 items-start gap-[12px]"
        >
          <AnalyticsKpiTile
            variant="victims"
            value={totalVictims}
            label={victimsLabel}
          />
          <AnalyticsKpiTile
            variant="accidents"
            value={totalAccidents}
            label={accidentsLabel}
          />
        </div>
      </div>
    </section>
  );
}
