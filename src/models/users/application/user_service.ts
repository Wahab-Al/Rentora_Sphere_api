import { CreateUserDTO } from "../presentation/userDto.js";
import { User } from "../domain/user.entity.js";
import type { accountTypeValues } from "../domain/user_interface.js";
import { AuthenticateService } from "../../authentication/authentication_service.js";

const createUser = async(enteredUser: CreateUserDTO) : Promise<{user: User, token: string}> => {
  let useraccountType: accountTypeValues;
    useraccountType = 'user'
    if(enteredUser.ownerData && Object.keys(enteredUser.ownerData).length > 0){
      useraccountType = 'owner';
    }
    const user = User.create({
      ...enteredUser, accountType: useraccountType
    })
    const token = AuthenticateService.generateToken({ user_id: user.userId, accountType: user.accountType })
    return { user, token };
}