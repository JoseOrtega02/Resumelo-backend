import { DeleteSummaryUseCase } from "../../UseCases/DeleteSummary"
import { FakeDocumentRepository } from "./FakeDocumentRepo"
import { FakeSummaryRepo } from "./FakeRepo"

test("Delete a Summary Use Case-Unit testing",async ()=>{
    const fakeRepo = new FakeSummaryRepo()
    const fakeDocumentRepo = new FakeDocumentRepository()
    const useCase = new DeleteSummaryUseCase(fakeRepo,fakeDocumentRepo)

    const res = await useCase.exec("0")

    expect(res).toEqual("Summary Deleted Successfully")

})