import type { UnitStatus, UnitType } from "../domain/unit_interface.js";

export class CreateUnitDTO {
  title!: string;
  unitType!: UnitType;
  price!: number;
  location!: string;
  bedrooms!: number;
  bathrooms!: number;
  unitStatus!: UnitStatus;
}