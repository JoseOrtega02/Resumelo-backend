import { CreateSummaryUseCase } from "../../UseCases/CreateSumary"
import { FakeSummaryRepo } from "./FakeRepo"

test("Create a summary use case-Unit Testing",async ()=>{
    
    const fakeRepo = new FakeSummaryRepo()
    const useCase = new CreateSummaryUseCase(fakeRepo)

    const res = await useCase.execute("test Summary","its just a test case","test.pdf")

    expect(res).toBe("Summary created successfully")

})