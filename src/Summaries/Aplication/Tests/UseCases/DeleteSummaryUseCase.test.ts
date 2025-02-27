import { DeleteSummaryUseCase } from "../../UseCases/DeleteSummary"
import { FakeSummaryRepo } from "./FakeRepo"

test("Delete a Summary Use Case-Unit testing", ()=>{
    const fakeRepo = new FakeSummaryRepo()
    const useCase = new DeleteSummaryUseCase(fakeRepo)

    const res =  useCase.exec("0")

    expect(res).toEqual("Summary Deleted Successfully")

})