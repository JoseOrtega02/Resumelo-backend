import dotenv from 'dotenv';

// Check if running tests and load the corresponding .env file
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const SYNC_URL_DB = process.env.SYNC_URL_DB;
const AUTH_TOKEN_DB = process.env.AUTH_TOKEN_DB;

export { SYNC_URL_DB, AUTH_TOKEN_DB };