import type { UnitStatus, UnitType } from "../unit_interface.js";

export class CreateUnitDTO {
  title!: string;
  unitType!: UnitType;
  price!: number;
  location!: string;
  bedrooms!: number;
  bathrooms!: number;
  unitStatus!: UnitStatus;
}