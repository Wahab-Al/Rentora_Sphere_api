import type { accountTypeValues } from "../models/users/domain/user_interface.js";


export type SafeUserResponse = {
  userId: string
  username: string
  name: string
  surname: string
  email: string
  phone: string
  accountType: accountTypeValues
  createdAt: Date,
  updatedAt: Date
}

export type ReturnedUser = {
  user: SafeUserResponse
  token: string
}