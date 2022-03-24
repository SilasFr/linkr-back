import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
  host: 'localhost',
  port: 5432,
<<<<<<< HEAD
  user: 'postgres',
  password: '123456',
  database: 'linkr',
=======
  user: "postgres",
  password: "123456",
  database: "linkr",
>>>>>>> timeline
};

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

const connection = new Pool(databaseConfig);

export default connection;
