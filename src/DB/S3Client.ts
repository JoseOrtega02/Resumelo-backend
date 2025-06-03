import {S3Client } from "@aws-sdk/client-s3"
import { CLOUDFLARE_ACCESS_KEY, CLOUDFLARE_SECRET_ACCESS_KEY, CLOUDFLARE_URL_R2 } from "../config.env"
import { createHash } from "crypto";


const hashedSecretKey = createHash('sha256').update(CLOUDFLARE_SECRET_ACCESS_KEY || "").digest('hex');
const s3Client = new S3Client({
    region: "auto",
    endpoint: CLOUDFLARE_URL_R2 || "",
    credentials: {
        accessKeyId: CLOUDFLARE_ACCESS_KEY || "",
        secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY || "",
    }
})

export default s3Client
