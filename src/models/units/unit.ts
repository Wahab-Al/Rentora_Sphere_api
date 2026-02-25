import type { CreateUnitDTO } from "./dtos/unitDto.js";
import type { IUnit, UnitStatus, UnitType } from "./unit_interface.js";
import { v7 as uuidv7 } from 'uuid';

export class Unit {
  readonly #id!: number;
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
   * private constructor accept data from CreateUnitDTO
   * @param {IUnit} data 
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
  static create(data: CreateUnitDTO, ownerId: string) : Unit{
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
      owner: ownerId
    }
    return new Unit(iUnit)
  }

  // Getters:
  get unitId(): string {return this.#unit_id}
  get title(): string { return this.#title; }
  get unitType(): UnitType {return this.#unitType}
  get price(): Number {return this.#price}
  get location(): string {return this.#location}
  get bedrooms(): Number {return this.#bedrooms}
  get bathrooms(): Number {return this.#bathrooms}
  get unitStatus(): UnitStatus {return this.#unitStatus || 'available'}
  get owner(): string | null | undefined { return this.#owner; }
  get createdAt(): Date { return this.#createdAt; }
  get updatedAt(): Date { return this.#updatedAt; }

  // Setters:
  private set unitType(value: UnitType) { this.#unitType = value}
  private set price(value: number) { this.#price = value}
  private set unitStatus(value: UnitStatus) { this.#unitStatus = value}
}
