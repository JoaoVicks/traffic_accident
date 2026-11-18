import type { AccidentDetailData } from '../types/accident';

/**
 * Representative static Accident Detail fixture matching Figma `Detail - Accident` (`1:2616`)
 * and `Accident/IncidentCard` (`23:1041`).
 * Kept separate from production components per Phase 5 architectural boundaries.
 */
export const DEFAULT_ACCIDENT_DETAIL_FIXTURE: AccidentDetailData = {
  id: '#8ahudnuj34rydin379',
  severityBadgeLabel: 'acidente fatal',
  isFatal: true,
  involvedLabel: '5 envolvidos',
  fatalitiesLabel: '4 mortos',
  timePeriodLabel: '19:00 - noite',
  periodOnlyLabel: 'noite',
  dateLabel: '09/01/2026',
  dataSourceLabel: 'PRF',
  locationAddress: 'avenida domenico perella, 53',
  roadAttributes: {
    laneLayout: 'dupla',
    roadFeature: 'retorno',
    slopeDirection: 'subindo',
    extraAttributes: ['pista seca', 'iluminação artificial'],
  },
  accidentType: 'colisão transversal',
  accidentCause: 'desrespeitar a preferência no cruzamento',
  vehicles: [
    {
      id: 'veh-1',
      kind: 'car',
      model: 'onix chevrolet',
      occupants: [
        {
          id: 'occ-1',
          ageLabel: '56 anos',
          sex: 'masculino',
          physicalCondition: 'ileso',
        },
        {
          id: 'occ-2',
          ageLabel: '22 anos',
          sex: 'masculino',
          physicalCondition: 'ferido',
        },
      ],
    },
    {
      id: 'veh-2',
      kind: 'car',
      model: 'hb20 hyundai',
      occupants: [
        {
          id: 'occ-3',
          ageLabel: '34 anos',
          sex: 'feminino',
          physicalCondition: 'óbito',
        },
      ],
    },
    {
      id: 'veh-3',
      kind: 'car',
      model: 'corolla toyota',
      occupants: [
        {
          id: 'occ-4',
          ageLabel: '41 anos',
          sex: 'masculino',
          physicalCondition: 'óbito',
        },
      ],
    },
    {
      id: 'veh-4',
      kind: 'bicycle',
      model: 'caloi aro 29',
      occupants: [
        {
          id: 'occ-5',
          ageLabel: '29 anos',
          sex: 'masculino',
          physicalCondition: 'óbito',
        },
      ],
    },
  ],
};

