
import { Summary } from "../../../Domain/Entities/Summary";
import { FindAllSummariesUseCase } from "../../UseCases/FindAllSummary";
import { FakeSummaryRepo } from "./FakeRepo";



test("Find All Summaries Use Case-Unit Test",async ()=>{
    const fakeRepo= new FakeSummaryRepo()

    const useCase = new FindAllSummariesUseCase(fakeRepo)

    const res = await useCase.exec()

    expect(res).toBeInstanceOf(Array)
    expect(res[0]).toBeInstanceOf(Summary);

})