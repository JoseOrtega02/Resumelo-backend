import { DocumentRepository } from "../../../Infrastructure/Repositories/CloudfareRepositoryR2";

export class FakeDocumentRepository implements DocumentRepository{
    async create(file:Buffer<ArrayBufferLike>,key:string){
        return "https//:fakeurl.com/" + key
    }
    async delete(key:string){
        return "Summary deleted successfully"
    }
}
