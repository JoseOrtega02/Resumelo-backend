import { createReadStream } from "fs"
import s3Client from "../../../DB/S3Client"
import {PutObjectCommand} from "@aws-sdk/client-s3"

class CloudflareRepositoryR2{
    private bucket
    constructor(bucket:string){
        this.bucket = bucket
    }

    async create(filepath:string,key:string){
        try {
             const fileStream = createReadStream(filepath)
        const params ={
            Bucket : this.bucket,
            Key: key,
            Body: fileStream,
            ContentType: "application/pdf"
        }
        const data = await s3Client.send(new PutObjectCommand(params))
        console.log("Archivo subido exitosamente:", data);
    } catch (err) {
      console.error("Error al subir el archivo:", err);
    }
    }
}