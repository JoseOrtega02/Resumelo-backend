
import { PutSummaryUseCase } from "../../UseCases/PutSummary"
import { FakeSummaryRepo } from "./FakeRepo"

test("Put Summary use case-Unit test",async ()=>{
    const fakeRepo = new FakeSummaryRepo()
    const useCase= new PutSummaryUseCase(fakeRepo)

    const res = await useCase.execute("new Summary","new summary edited xd","edited.pdf","0")

    expect(res).toEqual({
        id:expect.stringMatching(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
          ),
        title:"new Summary",
        desc:"new summary edited xd",
        pdf:"edited.pdf",
        likes:0,
        liked:false
    })
})