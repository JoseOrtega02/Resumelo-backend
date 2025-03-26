import { createClient } from "@libsql/client";
import {SYNC_URL_DB,AUTH_TOKEN_DB} from "../config.env"

 const client = createClient({
  url: SYNC_URL_DB || "",
  authToken:AUTH_TOKEN_DB || "",
});
// async function setupDatabase() {
//   await client.execute(`
//     CREATE TABLE IF NOT EXISTS summaries (
//       id TEXT PRIMARY KEY,
//       title TEXT NOT NULL,
//       desc TEXT NOT NULL,
//       pdf TEXT NOT NULL,
//       likes INTEGER DEFAULT 0,
//       liked BOOLEAN DEFAULT FALSE
//     );
//   `);
//   console.log("✅ Summaries table initialized.");
// }

// setupDatabase();

export default client