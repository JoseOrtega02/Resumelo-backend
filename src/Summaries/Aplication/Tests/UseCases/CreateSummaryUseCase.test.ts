import { CreateSummaryUseCase } from "../../UseCases/CreateSumary"
import { FakeDocumentRepository } from "./FakeDocumentRepo"
import { FakeSummaryRepo } from "./FakeRepo"

test("Create a summary use case-Unit Testing",async ()=>{
    
    const fakeRepo = new FakeSummaryRepo()
    const fakeDocumentRepo = new FakeDocumentRepository()
    const useCase = new CreateSummaryUseCase(fakeRepo,fakeDocumentRepo)

    const res = await useCase.execute("test Summary","its just a test case","test.pdf")

    expect(res).toBe("Summary created successfully")

})