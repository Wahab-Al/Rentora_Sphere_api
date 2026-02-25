export type ContractState = 'active' | 'scheduled' | 'expired' | 'cancelled';
export type OrderStatus = 'pending' | 'cancelled' | 'approved';

export interface IContract {
    contract_id: string; 
    title: string;
    rentBeginn: Date;
    rentEnd: Date;
    contractState: ContractState;
    monthRentPrice: number;
    totalContractValue: number;
    orderStatus: OrderStatus | 'pending';
    createdAt: Date;
    updatedAt: Date;
    user: string;      
    unit: string;      
    unitOwner: string; 
}