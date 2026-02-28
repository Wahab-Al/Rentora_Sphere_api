import type { User } from "../domain/user.entity.js";
import type { IUserRepository } from "./iUser.repository.js";
import { rentoraPool } from "../../../config/database.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await rentoraPool.execute<User[] & RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    )
    return rows[0] ?? null;
  }
  
  /** ====================================================================================  */
  
  async findById(id: string): Promise<User | null> {
    const [rows] = await rentoraPool.execute<User[] & RowDataPacket[]>(
      `SELECT * FROM users WHERE user_id = ?`, [id]
    )
    return rows[0] ?? null
  }
  /** ====================================================================================  */

  async save(user: User): Promise<void> {
    // use the object returned by toPersistence() instead of trying to access private fields
    const userRecord  = user.toPersistence();

    // store ownerData as JSON in the DB
    const ownerDataSerialized = userRecord .ownerData ? JSON.stringify(userRecord .ownerData) : null;

    const [result] = await rentoraPool.execute<ResultSetHeader>(
      `INSERT INTO users(user_id, username, name, surname, email, password, 
      phone, accountType, ownerData, isActiveAcc, createdAt, updatedAt, refreshToken)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [userRecord .user_id, userRecord .username, userRecord .name, userRecord .surname, userRecord .email, userRecord .password, 
      userRecord .phone, userRecord .accountType, ownerDataSerialized, userRecord .isActiveAcc ? 1 : 0, userRecord .createdAt, userRecord .updatedAt, userRecord .refreshToken ?? null]
    )
    if(result.affectedRows === 0) throw new Error('Failed to save user.')
  }
}