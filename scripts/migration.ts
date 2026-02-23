import { MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

async function migrateUsers() {
    // connection to Mongodb
    const mongoClient = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
    const dbName = process.env.MONGO_DB_NAME; 

    // connection to MySQL
    const mysqlConnection = await mysql.createConnection({
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string
    });

    try {
        await mongoClient.connect();
        const mongoDb = mongoClient.db(dbName);
        const mongoUsers = await mongoDb.collection('users').find({}).toArray();

        console.log(`Found ${mongoUsers.length} users in MongoDB. Starting migration...`);

        for (const mUser of mongoUsers) {
            // convert data to match MySQL structure
            const userData = {
              user_id: mUser.user_id || mUser._id.toString(),
              name: mUser.name,
              surname: mUser.surname,
              email: mUser.email,
              password: mUser.password,
              phone: mUser.phone || '+0000000000',
              role: mUser.role || 'user',
              ownerData: mUser.ownerData ? JSON.stringify(mUser.ownerData) : null,
              isActiveAcc: mUser.isActiveAcc ? 1 : 0,
              createdAt: mUser.createdAt,
              updatedAt: mUser.updatedAt,
              refreshToken: null 
          };

            const sql = `
              INSERT INTO users (user_id, name, surname, email, password, phone, role, ownerData, isActiveAcc, createdAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE email=email; 
            `;

            const values = Object.values(userData);
            await mysqlConnection.execute(sql, values);
            console.log(`Migrated: ${userData.email}`);
        }

        console.log('Migration completed successfully!');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoClient.close();
        await mysqlConnection.end();
    }
}

migrateUsers();