import { AppError } from "../../../Shared/Interface/Responses/AppError"
import { User } from "../../Domain/Entities/User"
import { UserRepo } from "../../Domain/Repositories/UserRepo"

export class CreateUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository = repo
    }
    async exec(name:string,email:string){
      
            const user= new User(name,email)
            return await this.repository.create(user)
            .catch(error => {
                if (error.code === "SQLITE_CONSTRAINT") {
                    console.error("Email is already taken");
                    throw new AppError("Email is already taken",400)
                }
                throw error; // Relanza otros errores
            });
       
        
    }
}