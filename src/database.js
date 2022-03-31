import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

//Uitlizar .env
const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
const connection = new Pool(databaseConfig);

export default connection;
