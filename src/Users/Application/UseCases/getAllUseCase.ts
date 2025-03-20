export class GetAllUseCase{
    private repository
    constructor(repo){
        this.repository= repo
    }
    async exec(){
        try {
            const data = this.repository.getAll()
            return data
        } catch (error) {
            console.error(error)
        }
    }
}