import { CreateUseCase } from "../UseCases/createUseCase"
import { FakeUserRepo } from "./FakeUserRepo"

test("Create user test-Unitary Test",async ()=>{
    const FakeRepo = new FakeUserRepo()
    const useCase = new CreateUseCase(FakeRepo)
    const res = await useCase.exec("testUser","user@gmail.com")

    expect(res).toEqual("User Created:{ testUser-user@gmail.com }")
})