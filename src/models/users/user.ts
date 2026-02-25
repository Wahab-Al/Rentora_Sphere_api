import type { CreateUserDTO, OwnerData, RoleValues } from "./dtos/userDto.js";
import { v7 as uuidv7 } from 'uuid';
import type { IUser } from "./user_interface.js";
import { create } from "node:domain";

/**
 * Domain Model representing a User within the RentoraSphere system.
 * @example
 * const user = User.create(dto);
 */
export class User {
  readonly #id!: number;

  #user_id: string;
  #name: string;
  #surname: string;
  #username: string;
  #email: string;
  #password: string;
  #phone: string;
  #role: RoleValues;
  #ownerData?: OwnerData | null;
  #lastLogin: Date;
  #refreshToken?: string;
  #isActiveAcc: boolean;
  #createdAt: Date;
  #updatedAt: Date;
  
  /**
   * Private constructor accept data from CreateUserDTO.
   * @param {IUser}data
   */
  private constructor(data: IUser) {
    this.#user_id = data.user_id;
    this.#username = data.username;
    this.#name = data.name;
    this.#surname = data.surname;
    this.#email = data.email;
    this.#password = data.password;
    this.#phone = data.phone;
    this.#role = data.role;
    this.#ownerData = data.ownerData;
    this.#lastLogin = new Date();
    this.#isActiveAcc = Boolean(data.isActiveAcc);
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
  /**
   * Initializes a new User
   * @param data object containing signup request details.
   * @returns new User instance with a generated UUIDv7.
   * @throws Error if role is 'owner' but ownerData is missing or if shipType is 'company' but companyName is missing.
   */
  static create(data: CreateUserDTO): User{
    if (data.role === 'owner' && !data.ownerData) {
      throw new Error('Owner must have shipType & companyName') 
    }
    if (data.ownerData?.shipType === 'company' && !data.ownerData.companyName) {
      throw new Error('Company owner must provide companyName');
    }
    const iUser : IUser = {
      user_id: uuidv7(),
      username: data.username,
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      ownerData: data.ownerData ?? null,
      isActiveAcc: true,
      createdAt: new Date(),
      updatedAt: new Date(),  
    }
    return new User(iUser)
  }

  // Getters:
  get userId(): string { return this.#user_id}
  get username(): string { return this.#username}
  get name(): string { return this.#name}
  get surname(): string { return this.#surname}
  get email(): string {return this.#email}
  get phone(): string {return this.#phone}
  get role(): RoleValues { return this.#role; }
  get lastLogin(): Date { return this.#lastLogin; }
  get isActiveAcc(): Boolean { return this.#isActiveAcc; }
  get ownerData(): OwnerData | null {return this.#ownerData ?? null}
  get createdAt(): Date { return this.#createdAt; }
  get updatedAt(): Date { return this.#updatedAt; }

  // Setters:
  private set role(value: RoleValues) {  this.#role = value }
  private set isActiveAcc(value: boolean) { this.#isActiveAcc = value}
}