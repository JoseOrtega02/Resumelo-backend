import { DocumentRepository } from "../../../Infrastructure/Repositories/CloudfareRepositoryR2";

export class FakeDocumentRepository implements DocumentRepository{
    async create(filepath:string,key:string){
        return "https//:fakeurl.com/" + key
    }
    async delete(key:string){
        return "Summary deleted successfully"
    }
}