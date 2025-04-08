import { UserRepo } from "../../Domain/Repositories/UserRepo"

export class GetAllUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository= repo
    }
    async exec(){
       
            const data =await  this.repository.getAll()
            return data
      
    }
}