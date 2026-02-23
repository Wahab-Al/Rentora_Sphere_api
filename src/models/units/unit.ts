import type { CreateUnitDTO } from "./dtos/unitDto.js";
import type { IUnit, UnitStatus, UnitType } from "./unit_interface.js";
import { v7 as uuidv7 } from 'uuid';

export class Unit {
  #id!: number;
  #unit_id: string;
  #title: string;
  #unitType: UnitType;
  #price: number;
  #location: string;
  #bedrooms: number;
  #bathrooms: number;
  #unitStatus?: UnitStatus | 'available';
  #owner?: string | null;
  #createdAt: Date;
  #updatedAt: Date;

  /**
   * 
   * @param data unit data from CreateUnitDTO
   */
  constructor(data: IUnit){
    this.#unit_id = data.unit_id;
    this.#title = data.title;
    this.#unitType = data.unitType;
    this.#price = data.price;
    this.#location = data.location;
    this.#bedrooms = data.bedrooms;
    this.#bathrooms = data.bathrooms;
    this.#unitStatus = data.unitStatus || 'available';
    this.#owner = data.owner || null;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }

  /**
   * 
   * @param data object containing Unit request details.
   * @returns new Unit instance with a generated UUIDv7.
   */
  static create(data: CreateUnitDTO) {
    const iUnit: IUnit = {
      unit_id: uuidv7(),
      title: data.title,
      unitType : data.unitType,
      price: data.price,
      location: data.location,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms || 0,
      unitStatus: data.unitStatus,
      createdAt: new Date(),
      updatedAt: new Date(), 
    }
    return new Unit(iUnit)
  }

  // Getters:
  get unitId() {return this.#unit_id}
  get title() { return this.#title; }
  get unitType() {return this.#unitType}
  get price() {return this.#price}
  get location() {return this.#location}
  get bedrooms() {return this.#bedrooms}
  get bathrooms() {return this.#bathrooms}
  get unitStatus() {return this.#unitStatus || 'available'}
  get owner() { return this.#owner; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  // Setters:
  set unitId(value: string) { this.#unit_id = value}
  set unitType(value: UnitType) { this.#unitType = value}
  set price(value: number) { this.#price = value}
  set location(value: string) { this.#location = value}
  set bedrooms(value: number) { this.#bedrooms = value}
  set bathrooms(value: number) { this.#bathrooms = value}
  set unitStatus(value: UnitStatus) { this.#unitStatus = value}
}
