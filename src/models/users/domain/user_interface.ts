export type OwnerData = 
  {shipType: 'private'} | {shipType: 'company'; companyName: string}

export type accountTypeValues = 'user' | 'owner' | 'sysManager';

export interface IUser {
  user_id: string;
  username: string ;    
  name: string;         
  surname: string;      
  email: string;        
  phone: string;        
  accountType: accountTypeValues;     
  password: string;    
  ownerData: OwnerData | null; 
  isActiveAcc: boolean; 
  createdAt: Date;      
  updatedAt: Date;      
  refreshToken?: string | null; 
}

export interface CreateUserProps {
  username: string ;    
  name: string;         
  surname: string;      
  email: string;        
  phone: string;        
  accountType: accountTypeValues;     
  password: string;    
  ownerData?: OwnerData | null; 
}