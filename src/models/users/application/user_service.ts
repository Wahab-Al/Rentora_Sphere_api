import { CreateUserDTO } from "../presentation/userDto.js";
import { User } from "../domain/user.entity.js";
import type { accountTypeValues } from "../domain/user_interface.js";
import { AuthenticateService } from "../../authentication/authentication_service.js";
import type { ReturnedUser } from "../../../shared/types.js";
import { UserRepository } from "../infrastructure/user.repository.js";


const userOfRepository = new UserRepository();
/**
 * 
 * @param enteredUser object of class CreateUserDTO
 * @returns Promis of User object and valid token. 
 */
const  createUser = async(enteredUser: CreateUserDTO) : Promise<ReturnedUser> => {
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

      const user = await User.create({
        ...enteredUser,  accountType: useraccountType
      })
      await userOfRepository.save(user)
      // return user object without password
      const userToResponse = user.toResponseObject();
      // generate token
      const token = AuthenticateService.generateToken({ user_id:  user.userId, accountType: user.accountType })
      
    return {  user: userToResponse, token: token };
  }

  /**
   * 
   * @param email email address of the user trying to log in
   * @param password  plaintext password of the user
   * @returns  {Promise<string>} A JWT token to be used for authenticated requests
   * @throws {Error} If email or password are missing, or if authentication fails
   */
  const loginUser = async (email: string, password: string) : Promise<string> => {
    if (!email || !password) {
    throw new Error('Invalid email or password');
    }
    const user = await userOfRepository.findByEmail(
      email.trim().toLowerCase()
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isValid = await user.verifyPassword(password.trim());
    if (!isValid) {
      throw new Error('Invalid email or password');
    }
    const token = AuthenticateService.generateToken({
      user_id: user.userId,
      accountType: user.accountType,
    })
  return token;
  }