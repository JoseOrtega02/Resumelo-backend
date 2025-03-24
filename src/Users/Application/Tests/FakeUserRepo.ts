import { ResultSet } from "@libsql/client/.";
import { IUser } from "../../Domain/Entities/IUser";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import { User } from "../../Domain/Entities/User";

export class FakeUserRepo implements UserRepo{
    async create(user:IUser):Promise<string>{
        const newUser  = user
        return `User Created:{ ${newUser.getName()}-${newUser.getEmail()} }`
    }
     async getById(id: string) {
        const fakeUser = new User("testUser","testEmail")
        return fakeUser
    }
    async getAll() {
        const user1= new User("testUser","testEmail")
        const user2 = new User("testUser2","testEmail2")
        const users=[user1,user2]
        return users
    }
    async update(newUser: User | undefined, id: string){
        return newUser
    }
    async delete(id: string) {
        return "User Deleted Successfully"
    }
}