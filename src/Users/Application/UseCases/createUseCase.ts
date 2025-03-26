import { User } from "../../Domain/Entities/User"
import { UserRepo } from "../../Domain/Repositories/UserRepo"

export class CreateUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository = repo
    }
    async exec(name:string,email:string){
      
            const user= new User(name,email)
            const res = await this.repository.create(user)
            return res
       
        
    }
}