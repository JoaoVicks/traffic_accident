import { useState, type ReactNode } from 'react';
import {
  AnalyticsTabItem,
  AnalyticsTabs,
  Disclosure,
  IncidentDetailsButton,
  IncidentFatalBadge,
  MapLocationControl,
  MapZoomControl,
  NavigationItem,
  RankingFilterControl,
  RankingInfoControl,
  RankingMoreButton,
  RankingSelect,
  RankingTabItem,
  RankingTabs,
  SearchFilterControl,
  SeveritySlider,
  SourceBadge,
  TextField,
  VehicleChoiceChip,
  type AnalyticsTabMetric,
  type RankingTabCategory,
} from '../primitives';

interface CatalogSectionProps {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}

function CatalogSection({
  index,
  title,
  description,
  children,
}: CatalogSectionProps) {
  return (
    <section
      aria-labelledby={`section-${index}`}
      className="flex flex-col gap-4 rounded-(--radius-12) border border-solid border-(--black-400) bg-(--black-450) p-6"
    >
      <header className="flex flex-col gap-1 border-b border-solid border-(--black-400) pb-4">
        <span className="text-[length:var(--font-size-12)] font-(--font-weight-medium) tracking-wider text-(--primary-200) uppercase">
          Category {index}
        </span>
        <h2
          id={`section-${index}`}
          className="text-xl font-(--font-weight-medium) text-(--white-250)"
        >
          {title}
        </h2>
        <p className="text-[length:var(--font-size-14)] font-(--font-weight-light) text-(--black-300)">
          {description}
        </p>
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

interface SpecimenCardProps {
  title: string;
  figmaRef: string;
  children: ReactNode;
}

function SpecimenCard({ title, figmaRef, children }: SpecimenCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-(--radius-8) border border-solid border-(--black-400) bg-(--black-500) p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[length:var(--font-size-14)] font-(--font-weight-medium) text-(--white-500)">
          {title}
        </h3>
        <span className="text-[length:var(--font-size-12)] font-(--font-weight-light) text-(--black-300)">
          {figmaRef}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

const SEVERITY_LABELS = [
  'Nível 0 — Primário 500',
  'Nível 1 — Primário 400',
  'Nível 2 — Primário 200',
  'Nível 3 — Primário 100',
] as const;

/**
 * Visual catalog of all Beltwise Design System primitive components (`02 — Primitives`).
 */
export function DesignSystemPage() {
  const [searchQuery, setSearchQuery] = useState('São');
  const [selectOpen, setSelectOpen] = useState(false);
  const [rankingInfoShown, setRankingInfoShown] = useState(false);
  const [severityIndex, setSeverityIndex] = useState(0);
  const [analyticsMetric, setAnalyticsMetric] = useState<AnalyticsTabMetric>('accidents');
  const [rankingCategory, setRankingCategory] = useState<RankingTabCategory>('cities');
  const [disclosureExpanded, setDisclosureExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-(--black-500) px-6 py-10 text-(--white-250)">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2 border-b border-solid border-(--black-400) pb-6">
          <span className="text-[length:var(--font-size-12)] font-(--font-weight-medium) tracking-wider text-(--primary-200) uppercase">
            Beltwise Design System
          </span>
          <h1 className="text-3xl font-(--font-weight-medium) text-(--white-250)">
            Primitives Catalog
          </h1>
          <p className="max-w-2xl text-[length:var(--font-size-14)] font-(--font-weight-light) text-(--black-300)">
            Reference catalog displaying every primitive component, variant, and evidenced state
            from Figma page <code className="text-(--white-500)">02 — Primitives</code>, styled
            with tokens from <code className="text-(--white-500)">foundations/</code>.
          </p>
        </header>

        <CatalogSection
          index="01"
          title="Buttons"
          description="Action buttons and icon controls extracted from 01 — Actions and 02 — Icon Controls."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SpecimenCard
              title="IncidentDetailsButton"
              figmaRef="Button/Incident details · 21:41"
            >
              <IncidentDetailsButton />
            </SpecimenCard>

            <SpecimenCard
              title="RankingMoreButton"
              figmaRef="Button/Ranking more · 21:51"
            >
              <RankingMoreButton />
            </SpecimenCard>

            <SpecimenCard
              title="MapLocationControl"
              figmaRef="Control/Map location · 21:64"
            >
              <MapLocationControl />
            </SpecimenCard>

            <SpecimenCard
              title="MapZoomControl (white-800 host surface)"
              figmaRef="Control/Map zoom · 21:73 & 21:76"
            >
              <div className="inline-flex items-center gap-1 rounded-(--radius-8) bg-yellow-600 p-1">
                <MapZoomControl action="zoom-in" />
                <MapZoomControl action="zoom-out" />
              </div>
            </SpecimenCard>

            <SpecimenCard
              title="SearchFilterControl"
              figmaRef="Control/Search filter · 21:89 & 21:95"
            >
              <div className="flex items-center gap-3">
                <SearchFilterControl context="search" />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  search
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SearchFilterControl context="incident-detail" />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  incident-detail
                </span>
              </div>
            </SpecimenCard>

            <SpecimenCard
              title="RankingInfoControl & RankingFilterControl"
              figmaRef="Control/Ranking info (21:105, 21:108) · Control/Ranking filter (21:118)"
            >
              <div className="flex items-center gap-3">
                <RankingInfoControl
                  context={rankingInfoShown ? 'info-shown' : 'info-closed'}
                  onClick={() => setRankingInfoShown((prev) => !prev)}
                />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  interactive ({rankingInfoShown ? 'info-shown' : 'info-closed'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RankingInfoControl context="info-closed" />
                <RankingInfoControl context="info-shown" />
              </div>
              <RankingFilterControl />
            </SpecimenCard>
          </div>
        </CatalogSection>

        <CatalogSection
          index="02"
          title="Inputs"
          description="Search text field, ranking selector trigger, and 4-step severity threshold slider."
        >
          <div className="flex flex-col gap-4">
            <SpecimenCard title="TextField" figmaRef="Input/Text · 21:129">
              <TextField
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
              <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                Value: “{searchQuery || ' '}”
              </span>
            </SpecimenCard>

            <SpecimenCard
              title="RankingSelect"
              figmaRef="Control/Select ranking · 21:319 (closed) & 21:324 (open)"
            >
              <div className="flex items-center gap-2">
                <RankingSelect context="closed" />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  closed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RankingSelect context="open" />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  open
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RankingSelect
                  context={selectOpen ? 'open' : 'closed'}
                  onClick={() => setSelectOpen((prev) => !prev)}
                />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  interactive ({selectOpen ? 'open' : 'closed'})
                </span>
              </div>
            </SpecimenCard>

            <SpecimenCard
              title="SeveritySlider"
              figmaRef="Control/Slider severity · 21:346"
            >
              <div className="flex flex-col gap-2">
                <SeveritySlider
                  value={severityIndex}
                  onChange={(event) => setSeverityIndex(Number(event.currentTarget.value))}
                />
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  {SEVERITY_LABELS[severityIndex]}
                </span>
              </div>
            </SpecimenCard>
          </div>
        </CatalogSection>

        <CatalogSection
          index="03"
          title="Selection"
          description="Vehicle filter chips strictly evidencing the five documented Option × Selected combinations."
        >
          <SpecimenCard
            title="VehicleChoiceChip"
            figmaRef="Chip/Choice vehicle · 21:189"
          >
            <VehicleChoiceChip option="cars" />
            <VehicleChoiceChip option="trucks" />
            <VehicleChoiceChip option="motorcycles" />
            <VehicleChoiceChip option="bicycles" />
            <VehicleChoiceChip option="buses" />
          </SpecimenCard>
        </CatalogSection>

        <CatalogSection
          index="04"
          title="Navigation"
          description="Analytics and ranking tab bars plus compact and expanded sidebar navigation items."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SpecimenCard
              title="AnalyticsTabs & AnalyticsTabItem"
              figmaRef="Tabs/Analytics · 21:226 (items 21:202, 21:207)"
            >
              <div className="flex flex-col gap-3">
                <AnalyticsTabs
                  value={analyticsMetric}
                  onValueChange={setAnalyticsMetric}
                />
                <div className="flex items-center gap-3 text-[length:var(--font-size-12)] text-(--black-300)">
                  <span>Active: {analyticsMetric}</span>
                  <span>|</span>
                  <span>Evidenced specimens:</span>
                  <AnalyticsTabItem metric="accidents" />
                  <AnalyticsTabItem metric="victims" />
                </div>
              </div>
            </SpecimenCard>

            <SpecimenCard
              title="RankingTabs & RankingTabItem"
              figmaRef="Tabs/Ranking · 21:278 (items 21:249, 21:253, 21:257)"
            >
              <div className="flex flex-col gap-3">
                <RankingTabs
                  value={rankingCategory}
                  onValueChange={setRankingCategory}
                />
                <div className="flex flex-wrap items-center gap-2 text-[length:var(--font-size-12)] text-(--black-300)">
                  <span>Active: {rankingCategory}</span>
                  <span>|</span>
                  <RankingTabItem category="cities" />
                  <RankingTabItem category="states" />
                  <RankingTabItem category="roads" />
                </div>
              </div>
            </SpecimenCard>
          </div>

          <SpecimenCard
            title="NavigationItem (compact & expanded)"
            figmaRef="Navigation/Item · 21:358..21:384"
          >
            <div className="flex flex-wrap items-start gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  compact (31px rail)
                </span>
                <div className="flex flex-col gap-2 rounded-(--radius-8) bg-(--black-450) p-2">
                  <NavigationItem destination="home" context="compact" />
                  <NavigationItem destination="ranking" context="compact" />
                  <NavigationItem destination="settings" context="compact" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                  expanded (227px sidebar)
                </span>
                <div className="flex flex-col gap-2 rounded-(--radius-8) bg-(--black-450) p-2">
                  <NavigationItem destination="home" context="expanded" />
                  <NavigationItem destination="ranking" context="expanded" />
                  <NavigationItem destination="settings" context="expanded" />
                </div>
              </div>
            </div>
          </SpecimenCard>
        </CatalogSection>

        <CatalogSection
          index="05"
          title="Disclosure"
          description="Collapsible panel header control preserving shadow-tools elevation and summary count."
        >
          <SpecimenCard
            title="Disclosure"
            figmaRef="Control/Disclosure · 21:308"
          >
            <div className="flex flex-col gap-2">
              <Disclosure
                expanded={disclosureExpanded}
                onClick={() => setDisclosureExpanded((prev) => !prev)}
              />
              <span className="text-[length:var(--font-size-12)] text-(--black-300)">
                State: {disclosureExpanded ? 'expanded' : 'collapsed'} (click to toggle)
              </span>
            </div>
          </SpecimenCard>
        </CatalogSection>

        <CatalogSection
          index="06"
          title="Indicators"
          description="Static classification and data source badges extracted from 04 — Badges and Labels."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SpecimenCard
              title="IncidentFatalBadge"
              figmaRef="Badge/Incident fatal · 21:138"
            >
              <IncidentFatalBadge />
            </SpecimenCard>

            <SpecimenCard
              title="SourceBadge"
              figmaRef="Badge/Source · 21:148"
            >
              <SourceBadge />
            </SpecimenCard>
          </div>
        </CatalogSection>
      </div>
    </main>
  );
}

export default DesignSystemPage;

