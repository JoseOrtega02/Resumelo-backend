
import { PutSummaryUseCase } from "../../UseCases/PutSummary"
import { FakeSummaryRepo } from "./FakeRepo"

test("Put Summary use case-Unit test",async ()=>{
    const fakeRepo = new FakeSummaryRepo()
    const useCase= new PutSummaryUseCase(fakeRepo)

    const res = await useCase.execute("new Summary","new summary edited xd","edited.pdf","0")

    expect(res).toEqual({
        title:"new Summary",
        desc:"new summary edited xd",
        pdf:"edited.pdf",
        likes:0,
        liked:false
    })
})