import type { ReactElement } from 'react';
import { cn } from 'cn';
import {
  BicycleIcon,
  CarIcon,
  MotorcycleIcon,
  TruckIcon,
} from '@/design-system/primitives';
import type { AccidentVehicle, AccidentVehicleKind } from '../types/accident';

function renderVehicleGlyph(kind: AccidentVehicleKind): ReactElement {
  switch (kind) {
    case 'car':
      return <CarIcon className="h-[14px] w-[20px]" />;
    case 'motorcycle':
      return <MotorcycleIcon className="h-[14px] w-[20px]" />;
    case 'truck':
      return <TruckIcon className="h-[14px] w-[20px]" />;
    case 'bicycle':
      return <BicycleIcon className="h-[16px] w-[20px]" />;
  }
}

export interface AccidentVehiclesSectionProps {
  vehicles: readonly AccidentVehicle[];
  selectedVehicleId: string;
  onSelectVehicle: (vehicleId: string) => void;
}

/**
 * Involved vehicles selector (`Accident/VehicleSelector` `23:920`), vehicle model
 * subtitle (`1:2800`), and occupant information table (`Accident/OccupantInformation` `23:938`).
 */
export function AccidentVehiclesSection({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}: AccidentVehiclesSectionProps) {
  const activeVehicle =
    vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0];

  if (!activeVehicle) {
    return null;
  }

  return (
    <div
      data-slot="accident-vehicles-section"
      className="flex w-full flex-col items-start gap-[14px]"
    >
      {/* Vehicle Selector & Model Header (1:2782) */}
      <div className="flex w-full flex-col items-start gap-[4px]">
        <div className="flex w-full items-center gap-[10px]">
          <span className="font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-medium) leading-none whitespace-nowrap text-(--observed-color-bababa)">
            Veiculos envolvidos
          </span>

          <div
            role="tablist"
            aria-label="Veículos envolvidos no acidente"
            className="flex items-center gap-[10px]"
          >
            {vehicles.map((vehicle, index) => {
              const isSelected = vehicle.id === activeVehicle.id;

              return (
                <button
                  key={vehicle.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Veículo ${index + 1}: ${vehicle.model}`}
                  onClick={() => onSelectVehicle(vehicle.id)}
                  className={cn(
                    'flex h-[30px] w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-(--radius-6) p-[6px] transition-colors focus-visible:outline-2 focus-visible:outline-(--primary-200)',
                    isSelected
                      ? 'bg-(--black-400) text-(--primary-200)'
                      : 'bg-transparent text-(--white-500) hover:bg-(--black-430)',
                  )}
                >
                  {renderVehicleGlyph(vehicle.kind)}
                </button>
              );
            })}
          </div>
        </div>

        <p className="font-[var(--font-sans)] text-[length:var(--font-size-14)] italic leading-snug text-(--black-300)">
          <span className="font-(--font-weight-medium)">modelo:</span>{' '}
          <span className="font-(--font-weight-regular)">
            {activeVehicle.model}
          </span>
        </p>
      </div>

      {/* Occupant Table Card (1:2801 — Accident/OccupantInformation) */}
      <div
        role="tabpanel"
        aria-label={`Ocupantes de ${activeVehicle.model}`}
        className="flex w-full flex-col items-center rounded-(--radius-12) border border-(--black-420) px-[14px] pt-[16px] pb-[24px]"
      >
        <div className="grid w-full grid-cols-3 gap-x-[24px] gap-y-[17px] text-[length:var(--font-size-14)] leading-none">
          <span className="font-[var(--font-sans)] font-(--font-weight-regular) italic text-(--black-300)">
            idade
          </span>
          <span className="font-[var(--font-sans)] font-(--font-weight-regular) italic text-(--black-300)">
            sexo
          </span>
          <span className="font-[var(--font-sans)] font-(--font-weight-regular) italic text-(--black-300)">
            estado fisico
          </span>

          {activeVehicle.occupants.map((occupant) => (
            <div key={occupant.id} className="contents">
              <span className="font-[var(--font-sans)] font-(--font-weight-regular) text-(--primary-200)">
                {occupant.ageLabel}
              </span>
              <span className="font-[var(--font-sans)] font-(--font-weight-regular) text-(--primary-200)">
                {occupant.sex}
              </span>
              <span className="font-[var(--font-sans)] font-(--font-weight-regular) text-(--primary-200)">
                {occupant.physicalCondition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

