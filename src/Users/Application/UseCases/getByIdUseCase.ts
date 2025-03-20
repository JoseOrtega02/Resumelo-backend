import { User } from "../../Domain/Entities/User"

export class  GetByIdUseCase{
    private repository
    constructor(repo){
        this.repository= repo
    }

    async exec(id:string){
        try {
            const data = await this.repository.getById(id)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}