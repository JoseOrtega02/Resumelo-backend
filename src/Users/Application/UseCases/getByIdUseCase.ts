
import { UserRepo } from "../../Domain/Repositories/UserRepo"

export class  GetByIdUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository= repo
    }

    async exec(id:string){
     
            const data = await this.repository.getById(id)
            return data
       
    }
}