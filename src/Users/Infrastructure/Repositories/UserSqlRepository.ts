import { ResultSet } from "@libsql/client/.";
import client from "../../../DB/TursoDB";
import { User } from "../../Domain/Entities/User";
import { UserRepo } from "../../Domain/Repositories/UserRepo";

export class UserSqlRepository implements UserRepo{
    async create(user:User){
        try {
            const res = await client.execute({
                sql:"INSERT INTO users (name,email,created_at,id) VALUES (?,?,?,?)",
                args:[user.getName(),user.getEmail(),user.getCreationDate(),user.getId()]
            })
            return res
        } catch (error) {
            console.error('Error Creating  User:', error);
            throw new Error('Failed to Creating User');
        }
    }
    async getById(id: string): Promise<User | undefined> {
        try {
            const res = await client.execute({
                sql:"SELECT * FROM users WHERE id=?",
                args:[id]
            })
            const resConverted:any = res.rows[0]
            return res ? new User(resConverted.name,resConverted.email,resConverted.creationDate,resConverted.id) :undefined
        } catch (error) {
            console.error('Error finding  User:', error);
            throw new Error('Failed to retrieve User');
        }
    }

    async getAll(): Promise<User[] | undefined> {
        try {
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
        } catch (error) {
            console.error('Error finding all  User:', error);
            throw new Error('Failed to retrieve User');
        }
    
    }

    async update(newUser: User , id: string): Promise<User | undefined> {
        try {
             await client.execute({
                sql:"UPDATE users SET name=?,email=? WHERE id=?",
                args:[newUser?.getName(),newUser?.getName(),id]
            })
            const editedUser = await this.getById(id)
            return editedUser
        } catch (error) {
            console.error('Error Updating  User:', error);
            throw new Error('Failed to Update User');
        }
    }

    async delete(id: string): Promise<void | ResultSet> {
        try {
            const res = await client.execute({
                sql:"DELETE FROM users WHERE id = ?",
                args:[id]
            })
            return res
        } catch (error) {
            console.error('Error Deleting  User:', error);
            throw new Error('Failed to Deleting User');
        }
    }

}