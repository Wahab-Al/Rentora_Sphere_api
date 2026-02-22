import type { CreateUserDTO, OwnerData, RoleValues } from "./dtos/userDto.js";
import { v7 as uuidv7 } from 'uuid';


export class User {
  readonly #id?: number;

  #user_id: string;
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

  
  /**
   * Private constructor
   * @param data user data from CreateUserDTO.
   */
  private constructor(data: CreateUserDTO) {
    this.#user_id = uuidv7();
    this.#username = data.username;
    this.#email = data.email;
    this.#password = data.password;
    this.#phone = data.phone;
    this.#role = data.role;
    this.#ownerData = data.ownerData;
    this.#lastLogin = new Date();
    this.#isActiveAcc = true;
    this.#createdAt = new Date();
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
    return new User(data)
  }

  // Getters:
  get userId() { return this.#user_id}
  get username() { return this.#username}
  get email() {return this.#email}
  get phone() {return this.#phone}
  get role() { return this.#role; }
  get lastLogin() { return this.#lastLogin; }
  get isActiveAcc() { return this.#isActiveAcc; }
  get createdAt() { return this.#createdAt; }
  get ownerData() {return this.#ownerData}

  // Setters:
  set username(value: string) { this.#username = value}
  set email(value: string) { this.#email = value}
  set phone(value: string) { this.#phone = value}
  set role(value: RoleValues) {  this.#role = value }
  set ownerData(value: OwnerData | undefined) { this.#ownerData = value}
  set isActiveAcc(value: boolean) { this.#isActiveAcc = value}
}