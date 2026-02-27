
export class CreateUserDTO {
  username!: string;
  name!: string;
  surname!: string;
  email!: string; phone!: string; 
  accountType!: 'user' | 'owner' | 'sysManager';
  password!: string;
  ownerData?: {shipType: 'private'} | {shipType: 'company'; companyName: string} | null
}



