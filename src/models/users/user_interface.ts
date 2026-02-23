import type { OwnerData, RoleValues } from "./dtos/userDto.js";

export interface IUserInterface {
  user_id: string;
  username: string ;    
  name: string;         
  surname: string;      
  email: string;        
  phone: string;        
  role: RoleValues;     
  password: string;    
  ownerData: OwnerData | undefined; 
  isActiveAcc: boolean | number; 
  createdAt: Date;      
  updatedAt: Date;      
  refreshToken?: string | null; 
}