import type { OwnerData, RoleValues } from "./dtos/userDto.js";

export interface IUser {
  user_id: string;
  username: string ;    
  name: string;         
  surname: string;      
  email: string;        
  phone: string;        
  role: RoleValues;     
  password: string;    
  ownerData: OwnerData | null; 
  isActiveAcc: boolean | number; 
  createdAt: Date;      
  updatedAt: Date;      
  refreshToken?: string | null; 
}