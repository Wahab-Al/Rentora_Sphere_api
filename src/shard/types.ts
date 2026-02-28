import type { CreateUserDTO } from "../models/users/presentation/userDto.js";

export type retunedUser = {
  user: CreateUserDTO, 
  token: string
}