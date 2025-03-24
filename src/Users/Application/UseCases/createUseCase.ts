import { User } from "../../Domain/Entities/User"
import { UserRepo } from "../../Domain/Repositories/UserRepo"

export class CreateUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository = repo
    }
    async exec(name:string,email:string){
        try {
            const user= new User(name,email)
            await this.repository.create(user)
            return "User Created successfully"
        } catch (error) {
            console.error(error)
        }
        
    }
}