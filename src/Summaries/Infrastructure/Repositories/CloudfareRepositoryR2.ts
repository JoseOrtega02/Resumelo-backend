import { createReadStream } from "fs"
import s3Client from "../../../DB/S3Client"
import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"

export interface DocumentRepository{
    create(filepath:string,key:string):Promise<string | undefined>
    delete(key:string):Promise<string | undefined>
}
export class CloudflareRepositoryR2 implements DocumentRepository{
    private bucket
    private cloudflareDomain
    constructor(bucket:string,cloudflareDomain:string){
        this.bucket = bucket
        this.cloudflareDomain = cloudflareDomain
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
         await s3Client.send(new PutObjectCommand(params))
        console.log("Archivo subido exitosamente:");
        const url = `${this.cloudflareDomain}/${key}`
        return url
    } catch (err) {
      console.error("Error al subir el archivo:", err);
    }
    }
    async delete(key:string){
        try{
            const params ={
                Bucket: this.bucket,
                Key:key,
            }
            const command = new DeleteObjectCommand(params)
             await s3Client.send(command)
            return "Summary Deleted"
        }catch (error){
            console.error("Error al subir el archivo:", error);
        }
    }
    
}