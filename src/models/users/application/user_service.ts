import { CreateUserDTO } from "../presentation/userDto.js";
import { User } from "../domain/user.entity.js";
import type { accountTypeValues } from "../domain/user_interface.js";
import { AuthenticateService } from "../../authentication/authentication_service.js";
import type { retunedUser } from "../../../shard/types.js";
import { UserRepository } from "../infrastructure/user.repository.js";
import argon2 from 'argon2';


const userOfRepository = new UserRepository();
/**
 * 
 * @param enteredUser object of class CreateUserDTO
 * @returns Promis of User object and valid token. 
 */
const createUser = async(enteredUser: CreateUserDTO) : Promise<retunedUser> => {
  // ensure that all required data entered
  if(!enteredUser.email || !enteredUser.password || !enteredUser.name ||!enteredUser.surname 
    || !enteredUser.username || !enteredUser.phone) {
      throw new Error('please fill required data.')
    }
  // check if user already in db
  const email = enteredUser.email.trim().toLowerCase();
  const existUser = await userOfRepository.findByEmail(email);
  if(existUser) throw new Error(`User with email ${email} already exists.`)

  // check accountTypeValue 
  const useraccountType: accountTypeValues =
    enteredUser.ownerData && Object.keys(enteredUser.ownerData).length > 0
      ? 'owner'
      : 'user';

      // hashing the password before store user entity in db
      const hashedPass = await argon2.hash(enteredUser.password)
      const user: User =  User.create({
        ...enteredUser, accountType: useraccountType, password: hashedPass
      })
      await userOfRepository.save(user)
      // generate token
      const token = AuthenticateService.generateToken({ user_id: user.userId, accountType: user.accountType })

    return { user: enteredUser, token: token };
}