import type { User } from "../domain/user.entity.js"

/**
 * Contract for user persistence operations and how application interacts with user data.
 */
export interface IUserRepository {
  /**
 * Retrieves a user by email address.
 * @param email Unique email identifier
 * @returns {IUser} | null
 */
  findByEmail(email: string) : Promise<User | null> 

  /**
   * Retrieves a user by their unique identifier.
   * @param id userId: Primary key of the user
   * @returns {IUser} | null
   */
  findById(id: string) : Promise<User | null>

  /**
   * Persists a new user into the database.
   * @param user Domain user entity to be stored.
   */
  save(user: User) : Promise<void>
}