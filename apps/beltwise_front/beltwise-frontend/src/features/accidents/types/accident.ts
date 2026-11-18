export type AccidentVehicleKind = 'car' | 'motorcycle' | 'truck' | 'bicycle';

export interface AccidentOccupant {
  id: string;
  ageLabel: string;
  sex: string;
  physicalCondition: string;
}

export interface AccidentVehicle {
  id: string;
  kind: AccidentVehicleKind;
  model: string;
  occupants: readonly AccidentOccupant[];
}

export interface AccidentRoadAttributes {
  laneLayout: string;
  roadFeature: string;
  slopeDirection: string;
  extraAttributes: readonly string[];
}

export interface AccidentDetailData {
  id: string;
  severityBadgeLabel: string;
  isFatal: boolean;
  involvedLabel: string;
  fatalitiesLabel: string;
  timePeriodLabel: string;
  periodOnlyLabel: string;
  dateLabel: string;
  dataSourceLabel: string;
  locationAddress: string;
  roadAttributes: AccidentRoadAttributes;
  accidentType: string;
  accidentCause: string;
  vehicles: readonly AccidentVehicle[];
}

