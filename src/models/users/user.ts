import type { CreateUserDTO, OwnerData, RoleValues } from "./dtos/userDto.js";
import { v7 as uuidv7 } from 'uuid';
import type { IUserInterface } from "./user_interface.js";


export class User {
  readonly #id?: number;

  #user_id: string;
  #name: string;
  #surname: string;
  #username: string;
  #email: string;
  #password: string;
  #phone: string;
  #role: RoleValues;
  #ownerData?: OwnerData | undefined;
  #lastLogin: Date;
  #refreshToken?: string;
  #isActiveAcc: boolean;
  #createdAt: Date;
  #updatedAt: Date;
  
  /**
   * Private constructor
   * @param data user data from CreateUserDTO.
   */
  private constructor(data: IUserInterface) {
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
    const iUser : IUserInterface = {
      user_id: uuidv7(),
      username: data.username,
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      ownerData: data.ownerData,
      isActiveAcc: true,
      createdAt: new Date(),
      updatedAt: new Date(),  
    }
    return new User(iUser)
  }

  // Getters:
  get userId() { return this.#user_id}
  get username() { return this.#username}
  get name() { return this.#name}
  get surname() { return this.#surname}
  get email() {return this.#email}
  get phone() {return this.#phone}
  get role() { return this.#role; }
  get lastLogin() { return this.#lastLogin; }
  get isActiveAcc() { return this.#isActiveAcc; }
  get ownerData() {return this.#ownerData}
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  // Setters:
  set username(value: string) { this.#username = value}
  set name(value: string) { this.#name = value}
  set surname(value: string) { this.#surname = value}
  set email(value: string) { this.#email = value}
  set phone(value: string) { this.#phone = value}
  set role(value: RoleValues) {  this.#role = value }
  set ownerData(value: OwnerData | undefined) { this.#ownerData = value}
  set isActiveAcc(value: boolean) { this.#isActiveAcc = value}
}