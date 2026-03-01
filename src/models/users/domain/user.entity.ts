import { v7 as uuidv7 } from 'uuid';
import type { CreateUserProps, IUser, OwnerData, accountTypeValues } from "./user_interface.js";
import argon2 from 'argon2';


/**
 * Domain Model representing a User within the RentoraSphere system.
 * @example
 * const user = User.create(userProps);
 */
export class User {
  readonly #id!: number;

  #user_id: string;
  #name: string;
  #surname: string;
  #username: string;
  #email: string;
  readonly #password: string;
  #phone: string;
  #accountType: accountTypeValues;
  readonly #ownerData: OwnerData | null;
  readonly #lastLogin: Date;
  readonly #refreshToken?: string;
  #isActiveAcc: boolean;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;
  
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
    this.#accountType = data.accountType;
    this.#ownerData = data.ownerData;
    this.#lastLogin = new Date();
    this.#isActiveAcc = data.isActiveAcc ;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
  /**
   * Initializes a new User
   * @param data object containing signup request details.
   * @returns new User instance with a generated UUIDv7.
   * @throws Error if accountType is 'owner' but ownerData is missing or if shipType is 'company' but companyName is missing.
   */
  static async create(data: CreateUserProps): Promise<User>{
    if (data.accountType === 'owner' && !data.ownerData) {
      throw new Error('Owner must have shipType & companyName') 
    }
    if (data.ownerData?.shipType === 'company' && !data.ownerData.companyName) {
      throw new Error('Company owner must provide companyName');
    }

    const hashedPassword = await argon2.hash(data.password);

    const iUser: IUser = {
      user_id: uuidv7(),
      username: data.username,
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: String(hashedPassword),
      phone: data.phone,
      accountType: data.accountType,
      ownerData: data.ownerData ?? null,
      isActiveAcc: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return new User(iUser)
  }

  /**
   * Converts the domain User entity into a plain object without breaking encapsulation of private fields.
   * @returns Plain object representing the user in a persistence-ready format.
   */
  toPersistence(){
    return {
      user_id: this.#user_id,
      email: this.#email,
      password: this.#password,
      username: this.#username,
      name: this.#name,
      surname: this.#surname,
      phone: this.#phone,
      accountType: this.#accountType,
      ownerData: this.#ownerData,
      isActiveAcc: this.#isActiveAcc,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      refreshToken: this.#refreshToken ?? null
    }
  }

  /**
   * Converts the User instance to a plain object suitable for API responses
   * @returns {Object} Plain user object without password or sensitive data.
   */
  toResponseObject() {
  return {
    userId: this.userId,
    username: this.username,
    name: this.name,
    surname: this.surname,
    email: this.email,
    phone: this.phone,
    accountType: this.accountType,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
}

  /**
   * Compares a plaintext password with the user's hashed password.
   * @param plainPassword The plaintext password to check
   * @returns {Promise<boolean>} True if the password matches, false otherwise
   */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return argon2.verify(this.#password, plainPassword);
  }

  // Getters:
  get userId(): string { return this.#user_id}
  get username(): string { return this.#username}
  get name(): string { return this.#name}
  get surname(): string { return this.#surname}
  get email(): string {return this.#email}
  get phone(): string {return this.#phone}
  get accountType(): accountTypeValues { return this.#accountType; }
  get lastLogin(): Date { return this.#lastLogin; }
  get isActiveAcc(): boolean { return this.#isActiveAcc; }
  get ownerData(): OwnerData | null {return this.#ownerData ?? null}
  get createdAt(): Date { return this.#createdAt; }
  get updatedAt(): Date { return this.#updatedAt; }

  // Setters:
  private set accountType(value: accountTypeValues) {  this.#accountType = value }
  private set isActiveAcc(value: boolean) { this.#isActiveAcc = value}
}
