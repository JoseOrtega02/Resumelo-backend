import { createClient } from "@libsql/client";
import {SYNC_URL_DB,AUTH_TOKEN_DB} from "../config.env"

 const client = createClient({
  url: "libsql://resumelo-test-joseortega02.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDA4NjM5MjEsImlkIjoiNjk0YTYwYmMtMjUzNC00OGQxLWJkMjctODc1ZjAzNGYyMGZkIn0.rDuOVI1MyxJcdh3I45d2ZrOCSOMyw2iy3JI-qXlhszqB6f9fSWhNADZuqGhDQcLE13dHdxpHBsfBKyp9aK1xDw",
});
async function setupDatabase() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS summaries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      pdf TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      liked BOOLEAN DEFAULT FALSE
    );
  `);
  console.log("✅ Summaries table initialized.");
}

setupDatabase();

export default client