import { User } from "../Entities/User";

export interface UserRepo{
    getById(id:string):Promise<User | undefined>
    getAll():Promise<User[] | undefined>
    create(user:User):Promise<User | undefined>
    update(newUser:User,id:string):Promise<User |undefined>
    delete(id:string):Promise<string | undefined>
}