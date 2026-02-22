export type OwnerData = 
  {shipType: 'private'} | {shipType: 'company'; companyName: string}

export type RoleValues = 'user' | 'owner' | 'sysManager';

export class CreateUserDTO {
  username!: string;
  email!: string; phone!: string; 
  role!: RoleValues;
  password!: string;
  ownerData?: OwnerData 
}



