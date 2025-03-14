import dotenv from 'dotenv';

// Check if running tests and load the corresponding .env file
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const SYNC_URL_DB = process.env.SYNC_URL_DB;
const AUTH_TOKEN_DB = process.env.AUTH_TOKEN_DB;
const R2_TOKEN_CLUDFLARE= process.env.R2_TOKEN_CLUDFLARE
const CLOUDFLARE_ACCESS_KEY = process.env.CLOUDFLARE_ACCESS_KEY
const CLOUDFLARE_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY
const CLOUDFLARE_URL_R2 = process.env.CLOUDFLARE_URL_R2
export { SYNC_URL_DB, AUTH_TOKEN_DB,R2_TOKEN_CLUDFLARE,CLOUDFLARE_ACCESS_KEY,CLOUDFLARE_SECRET_ACCESS_KEY,CLOUDFLARE_URL_R2 };