import { MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

async function migrateMongoDB_TO_MySQL() {
    // Connection to MongoDB
    const mongoClient = new MongoClient(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017');
    const dbName = process.env.MONGO_DB_NAME; 

    // Connection to MySQL
    const mysqlConnection = await mysql.createConnection({
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string
    });

    try {
        await mongoClient.connect();
        const mongoDb = mongoClient.db(dbName);
        const collections = await mongoDb.listCollections().toArray();
        console.log("Available collections:", collections.map(c => c.name));
        const mongoUsers = await mongoDb.collection('users').find({}).toArray();
        const mongoUnits = await mongoDb.collection('units').find({}).toArray();

        console.log(`Found ${mongoUsers.length} users in MongoDB. Starting migration...`);

        for (const mUser of mongoUsers) {
            // If username is missing in Mongo, generate it from email
            const fallbackUsername = mUser.username || mUser.email.split('@')[0];

            const userData = {
                user_id: String(mUser.user_id || mUser._id.toString()),
                name: String(mUser.name),
                surname: String(mUser.surname),
                username: String(fallbackUsername),
                email: String(mUser.email),
                password: String(mUser.password),
                phone: String(mUser.phone || '+0000000000'),
                role: String(mUser.role || 'user'),
                ownerData: mUser.ownerData ? JSON.stringify(mUser.ownerData) : null,
                isActiveAcc: mUser.isActiveAcc ? 1 : 0, // MySQL Boolean/TinyInt mapping
                createdAt: mUser.createdAt ? new Date(mUser.createdAt) : new Date(),
                updatedAt:mUser.updatedAt ? new Date(mUser.updatedAt) : new Date()
            };

            const userSql = `
    INSERT INTO users (
        user_id, name, surname, username, email, password, phone, role, ownerData, isActiveAcc, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        surname = VALUES(surname),
        email = VALUES(email),
        password = VALUES(password),
        phone = VALUES(phone),
        role = VALUES(role),
        ownerData = VALUES(ownerData),
        isActiveAcc = VALUES(isActiveAcc),
        
        username = IF(username IS NULL OR username = '', VALUES(username), username),
        
        createdAt = VALUES(createdAt),
        updatedAt = VALUES(updatedAt);
`;

            const values = Object.values(userData);
            await mysqlConnection.execute(userSql, values);
            console.log(`Migrated: ${userData.email}`);
        }

        console.log('Users Migration completed successfully!');
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');

        console.log(`Found ${mongoUnits.length} users in MongoDB. Starting migration...`);
        for (const mUnit of mongoUnits) {

            const unitData = {
                unit_id: String(mUnit.unit_id || mUnit._id.toString()),
                title: String(mUnit.title),
                unitType: String(mUnit.unitType),
                price: String(mUnit.price),
                location: String(mUnit.location),
                bedrooms: Number(mUnit.bedrooms || 0),
                bathrooms: Number(mUnit.bathrooms || 0),
                unitStatus: String(mUnit.unitStatus || 'available'),
                owner: String(mUnit.owner),
                createdAt: mUnit.createdAt ? new Date(mUnit.createdAt) : new Date(),
                updatedAt:mUnit.updatedAt ? new Date(mUnit.updatedAt) : new Date()
            };

            const unitSql =`
              INSERT INTO units (
                  unit_id, title, unitType, price, location, bedrooms, bathrooms, unitStatus, owner, createdAt, updatedAt
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
              ON DUPLICATE KEY UPDATE 
                title = VALUES(title),
                unitType = VALUES(unitType),
                price = VALUES(price),
                location = VALUES(location),
                bedrooms = VALUES(bedrooms),
                bathrooms = VALUES(bathrooms),
                unitStatus = VALUES(unitStatus),
                owner = VALUES(owner),
                updatedAt = VALUES(updatedAt);
          `;

        const values = Object.values(unitData);
        await mysqlConnection.execute(unitSql, values);
        console.log(`Migrated: ${unitData.title}`);
      }
      console.log('Units Migration completed successfully!');
      console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');


    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoClient.close();
        await mysqlConnection.end();
    }
}

migrateMongoDB_TO_MySQL();