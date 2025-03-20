import { UserRepo } from "../../Domain/Repositories/UserRepo";

export class DeleteUseCase{
    private repository
    constructor(repo:UserRepo){
        this.repository= repo
    }
    async exec(id:string){
        try {
            const res = await this.repository.delete(id)
            return res
        } catch (error) {
            console.error(error)
        }
    }

}