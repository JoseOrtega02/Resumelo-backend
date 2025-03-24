import { DeleteUseCase } from "../UseCases/deleteUseCase"
import { FakeUserRepo } from "./FakeUserRepo"

test("delete user use case-Unit Test",async ()=>{
    const FakeRepo= new FakeUserRepo()
    const useCase = new DeleteUseCase(FakeRepo)
    const res = await useCase.exec("aaaa")
    expect(res).toEqual("User Deleted Successfully")
})