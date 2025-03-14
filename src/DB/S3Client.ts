import {S3Client } from "@aws-sdk/client-s3"
import { CLOUDFLARE_ACCESS_KEY, CLOUDFLARE_URL_R2 } from "../config.env"

const s3Client = new S3Client({
    region: "auto",
    endpoint: CLOUDFLARE_URL_R2 || "",
    credentials: {
        accessKeyId: CLOUDFLARE_ACCESS_KEY || "",
        secretAccessKey:CLOUDFLARE_ACCESS_KEY || "",
    }
})

export default s3Client