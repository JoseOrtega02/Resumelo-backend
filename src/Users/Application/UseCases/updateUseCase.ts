import { UserRepo } from "../../Domain/Repositories/UserRepo";

export class UpdateUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository= repo
    }
    async exec(id:string,name:string,email:string){
    
        const summary = await this.repository.getById(id)
        summary?.setEmail(email)
        summary?.setName(name)
        const res = await this.repository.update(summary,id)
        return res
       
       
    }
}