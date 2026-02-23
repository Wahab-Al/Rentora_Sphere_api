
export type UnitType=  'house'| 'apartment'| 'villa'| 'studio';
export type UnitStatus = 'available'| 'rented'| 'maintenance'| 'reserved';

export interface IUnit {
  unit_id: string;
  title: string;
  unitType: UnitType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  unitStatus: UnitStatus;
  owner?: string;
  createdAt: Date;      
  updatedAt: Date;   
}