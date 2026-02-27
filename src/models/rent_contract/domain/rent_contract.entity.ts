import type { CreateContractDTO } from "../presentation/CreateRentDTO.js";
import type { IContract, OrderStatus, ContractState } from "./rent_Interface.js";
import { v7 as uuidv7 } from 'uuid';

/**
 * Domain Model representing a Rental Contract in the RentoraSphere system.
 * @example
 * const contract = Rent_Contract.create(dto, userId, unitId, unitOwnerId)
 */
export class Rent_Contract {
    readonly #id!: number;

    #contract_id: string;
    #title: string;
    #rentBeginn: Date;
    #rentEnd: Date;
    #contractState: ContractState;
    #monthRentPrice: Number;
    #totalContractValue: Number;
    #orderStatus: OrderStatus;
    #createdAt: Date;
    #updatedAt: Date;
    #user: string;
    #unit: string;
    #unitOwner: string;

    /**
     * private constractor accept data of type IContract
     * @param {IContract} data 
     */
    private constructor(data: IContract) {
      this.#contract_id = data.contract_id;
      this.#title = data.title;
      this.#rentBeginn = data.rentBeginn;
      this.#rentEnd = data.rentEnd;
      this.#contractState = data.contractState;
      this.#monthRentPrice = data.monthRentPrice;
      this.#totalContractValue = data.totalContractValue;
      this.#orderStatus = data.orderStatus;
      this.#createdAt = data.createdAt;
      this.#updatedAt = data.updatedAt;
      this.#user = data.user as string;
      this.#unit = data.unit as string;
      this.#unitOwner = data.unitOwner as string;
    }

    /**
     * 
     * @param data 
     * @param userId 
     * @param unitId 
     * @param unitOwnerId 
     * @returns a new instance of Rent_contract with a generated UUIDv7.
     */
    static create(data: CreateContractDTO, userId: string, unitId: string, unitOwnerId: string) : Rent_Contract{
      const iContract: IContract = {
        contract_id : uuidv7(),
        title : data.title,
        rentBeginn : data.rentBeginn,
        rentEnd: data.rentEnd,
        monthRentPrice: data.monthRentPrice,
        totalContractValue: data.totalContractValue,
        contractState: 'scheduled' as ContractState,
        orderStatus: 'pending' as OrderStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: userId,
        unit: unitId,
        unitOwner: unitOwnerId
      }

      return new Rent_Contract(iContract)
    }

    // Getters:
    get contractId(): string { return this.#contract_id; }
    get title(): string { return this.#title; }
    get rentBeginn(): Date { return this.#rentBeginn; }
    get rentEnd(): Date { return this.#rentEnd; }
    get contractState(): ContractState { return this.#contractState; }
    get monthRentPrice(): number { return Number(this.#monthRentPrice); }
    get totalContractValue(): number { return Number(this.#totalContractValue); }
    get orderStatus(): OrderStatus { return this.#orderStatus; }
    get createdAt(): Date { return this.#createdAt; }
    get updatedAt(): Date { return this.#updatedAt; }
    get user(): string { return this.#user; }
    get unit(): string { return this.#unit; }
    get unitOwner(): string { return this.#unitOwner; }

    // Setters:
    private set contractState(value: ContractState) { this.#contractState = value}
    private set orderStatus(value: OrderStatus) {this.orderStatus = value}
}
