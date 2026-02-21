//#region 
import mysql from 'mysql2/promise';
import { dbConfig } from './env.js';
//#endregion

export const rentoraPool = mysql.createPool(dbConfig);

export const checkConnection = async ()=>{
  try {
    const connection = await rentoraPool.getConnection();
    console.log('Connected to MySQL Database: rentora_sphere_v1');
    connection.release();
  } catch (error: unknown) { 
      console.error('Database connection failed:');
      if (error instanceof Error) {
        console.error(`Error Message: ${error.message}`); 
      } else {
        console.error('An unexpected error occurred', error);
      }
      process.exit(1);
    }
}