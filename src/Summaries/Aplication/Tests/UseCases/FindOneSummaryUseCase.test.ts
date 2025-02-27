import { Summary } from "../../../Domain/Entities/Summary"
import { FindByIdUseCase } from "../../UseCases/FindByIdSummary"
import { FakeSummaryRepo } from "./FakeRepo"

test("Find One Summary by id-Unit Test",async ()=>{
     const fakeRepo= new FakeSummaryRepo()
     const useCase= new FindByIdUseCase(fakeRepo)
     const id= "0"
     const res = await useCase.exec(id)
    
     expect(res).toEqual({
        title: "Default Summary",
        desc: "This is a default summary.",
        liked: false,
        likes: 0,
        pdf: "blablaba.pdf"
    });
})