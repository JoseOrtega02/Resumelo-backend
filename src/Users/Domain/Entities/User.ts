import { randomUUID } from "crypto"
import { IUser } from "./IUser"

export class User implements IUser{
    private name:string
    private email:string
    private id:string
    private created_at:Date
    constructor(name:string,email:string,creationDate:Date,id?:string){
        this.name = name
        this.email= email
        this.id = id || randomUUID();
        this.created_at = creationDate
    }

    getCreationDate(): string {
        return this.created_at.toString()
    }
    getEmail(): string {
        return this.email
    }
    getId(): string {
        return this.id
    }
    getName(): string {
        return this.name
    }

    setName(newName: string): void {
        this.name = newName
    }
    setEmail(newEmail: string): void {
        this.email = newEmail
    }
}