import pg from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const dbConfig = {
  user: 'postgres',
  password: 'tarcisio',
  host: 'localhost',
  port: 5432,
  database: 'linkr',
};

const dbConnection = new Pool(dbConfig);

export default dbConnection;
