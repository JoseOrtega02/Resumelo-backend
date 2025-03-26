import { ResultSet } from "@libsql/client/.";
import client from "../../../DB/TursoDB";
import { User } from "../../Domain/Entities/User";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import { AppError } from "../../../Shared/Interface/Responses/AppError";

export class UserSqlRepository implements UserRepo{
    async create(user:User):Promise<User|undefined> {
       
            const res = await client.execute({
                sql:"INSERT INTO users (name,email,created_at,id) VALUES (?,?,?,?)",
                args:[user.getName(),user.getEmail(),user.getCreationDate(),user.getId()]
            })
            if(!res.rowsAffected){
                throw new AppError("Error creating user",500)
            }
            const newUser = await this.getById(user.getId())
           return newUser
    }
    async getById(id: string): Promise<User | undefined> {
        
            const res = await client.execute({
                sql:"SELECT * FROM users WHERE id=?",
                args:[id]
            })
            if(!res.rows.length){
                throw new AppError("Not found User",404)
            }
            const resConverted:any = res.rows[0]

            return  new User(resConverted.name,resConverted.email,resConverted.creationDate,resConverted.id)  
    }

    async getAll(): Promise<User[] | undefined> {
     
            const res = await client.execute({
                sql:"SELECT * FROM users",
                args:[]
            })
            if(!res){
                return []
            }
            return res.rows.map((row:any)=>{
                const data = row 
                return new User(data.name,data.email,data.createdDate,data.id)
            })
        
    
    }

    async update(newUser: User , id: string): Promise<User | undefined> {
     
            const request = await client.execute({
                sql:"UPDATE users SET name=?,email=? WHERE id=?",
                args:[newUser?.getName(),newUser?.getEmail(),id]
            })
            if(!request.rowsAffected){
                throw new AppError("Error updating the user",500)
            }
            const editedUser = await this.getById(id)
            return editedUser
        
    }

    async delete(id: string): Promise<void | string> {
       
            const res = await client.execute({
                sql:"DELETE FROM users WHERE id = ?",
                args:[id]
            })
            if(!res.rowsAffected){
                throw new AppError("Delete user went wrong",500)
            }
            return "Deleted Succesfully"
       
    }

}