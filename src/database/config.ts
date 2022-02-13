/* eslint-disable import/no-import-module-exports */
import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv-safe';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (text: string, params: Array<unknown>, callback: (err: Error, result: QueryResult<any>) => void) => {
    return pool.query(text, params, callback);
  },
};
