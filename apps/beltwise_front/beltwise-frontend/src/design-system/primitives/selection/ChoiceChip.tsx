import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { BicycleIcon, BusIcon, CarIcon, MotorcycleIcon, TruckIcon } from '../icons';

export type VehicleChoiceOption =
  | 'cars'
  | 'trucks'
  | 'motorcycles'
  | 'bicycles'
  | 'buses';

export interface VehicleChoiceChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Vehicle option evidenced in Figma (`Chip/Choice vehicle` — Figma 21:189). */
  option: VehicleChoiceOption;
  /**
   * Selection state (`aria-pressed`). Defaults to the state evidenced in Figma
   * (`true` for `cars`, `false` for all other vehicle options).
   */
  selected?: boolean;
  /** Optional visible label override. Defaults to the Portuguese label in Figma. */
  label?: string;
}

interface VehicleChipConfig {
  defaultLabel: string;
  defaultSelected: boolean;
  widthClass: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconWrapperClass: string;
  iconInsetClass: string;
}

const VEHICLE_CHIP_CONFIG: Record<VehicleChoiceOption, VehicleChipConfig> = {
  cars: {
    defaultLabel: 'carros',
    defaultSelected: true,
    widthClass: 'w-[82px]',
    Icon: CarIcon,
    iconWrapperClass: 'h-[9.333px] w-[13.335px]',
    iconInsetClass: 'inset-[-5.36%_-3.75%]',
  },
  trucks: {
    defaultLabel: 'caminhões',
    defaultSelected: false,
    widthClass: 'w-[108px]',
    Icon: TruckIcon,
    iconWrapperClass: 'h-[9.998px] w-[12.497px]',
    iconInsetClass: 'inset-[-4.17%_-3.33%]',
  },
  motorcycles: {
    defaultLabel: 'motos',
    defaultSelected: false,
    widthClass: 'w-[80px]',
    Icon: MotorcycleIcon,
    iconWrapperClass: 'h-[7.997px] w-[11.424px]',
    iconInsetClass: 'inset-[-4.76%_-3.33%]',
  },
  bicycles: {
    defaultLabel: 'bicicletas',
    defaultSelected: false,
    widthClass: 'w-[90px]',
    Icon: BicycleIcon,
    iconWrapperClass: 'h-[7.997px] w-[9.998px]',
    iconInsetClass: 'inset-[-4.17%_-3.33%_-4.16%_-3.33%]',
  },
  buses: {
    defaultLabel: 'ônibus',
    defaultSelected: false,
    widthClass: 'w-[82px]',
    Icon: BusIcon,
    iconWrapperClass: 'h-[7.902px] w-[11.293px]',
    iconInsetClass: 'inset-[-5.36%_-3.75%]',
  },
};

/**
 * Vehicle category filter chip (`Chip/Choice vehicle` — Figma 21:189).
 * Uses `currentColor` SVG icon components so selected (`black - 500`) and unselected
 * (`black - 300`) icon strokes adapt cleanly via CSS.
 */
export function VehicleChoiceChip({
  option,
  selected,
  label,
  type = 'button',
  className = '',
  ...props
}: VehicleChoiceChipProps) {
  const config = VEHICLE_CHIP_CONFIG[option];
  const { Icon } = config;
  const isSelected = selected ?? config.defaultSelected;
  const resolvedLabel = label ?? config.defaultLabel;
  const stateClasses = isSelected
    ? 'border-(--primary-200) bg-(--primary-200) text-(--black-500)'
    : 'border-(--black-380) bg-(--black-420) text-(--white-250)';
  const iconColorClass = isSelected ? 'text-(--black-500)' : 'text-(--black-300)';

  return (
    <button
      type={type}
      aria-pressed={isSelected}
      className={`inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--radius-8) border border-solid px-2 py-1 font-[var(--font-sans)] text-[length:var(--font-size-13)] font-(--font-weight-regular) leading-(--line-height-20) tracking-(--letter-spacing-0) whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${config.widthClass} ${stateClasses} ${className}`.trim()}
      {...props}
    >
      <span
        className={`relative shrink-0 ${config.iconWrapperClass} ${iconColorClass}`}
        aria-hidden="true"
      >
        <span className={`absolute ${config.iconInsetClass}`}>
          <Icon />
        </span>
      </span>
      <span>{resolvedLabel}</span>
    </button>
  );
}

