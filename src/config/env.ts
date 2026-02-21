//#region 
import dotenv from 'dotenv'
import type { PoolOptions } from 'mysql2/promise';
//#endregion

dotenv.config();

//#region database config
export const dbConfig: PoolOptions = {
  port: 3306,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
//#endregion

//#region app config
export const sysConfig = {
  port: Number(process.env.PORT) || 5003,
  jwt_secret: process.env.JWT_SECRET_KEY as string,
  sysManager: {
    email: process.env.SYS_MANAGER_EMAIL as string,
    pass: process.env.SYS_MANAGER_PASS as string
  }
};
//#endregion