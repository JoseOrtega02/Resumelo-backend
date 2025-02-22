import { createClient } from "@libsql/client";
import {SYNC_URL_DB} from "../../../config.env"

export const client = createClient({
  url: "file:local.db",
  syncUrl: SYNC_URL_DB,
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDAxODQyMjAsImlhdCI6MTc0MDE4MDYyMCwiaWQiOiI5ZTRkNjlkYy01ODc3LTRlZWEtOGRlYi1jNjVkYzM3NWY5ZTMifQ.2acFJbmlV29nTJWchygT85dDSqjCTdt5WLBoZoTKbYDIMp--OnS_Z5UA2XUylBqIhslf8Uk7wE0i_ulH8G6RDg",
});