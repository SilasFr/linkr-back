import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
  /* connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }, */
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "linkr",
};

const connection = new Pool(databaseConfig);

export default connection;
