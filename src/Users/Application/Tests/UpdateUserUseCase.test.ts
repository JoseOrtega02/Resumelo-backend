import { UpdateUseCase } from "../UseCases/updateUseCase"
import { FakeUserRepo } from "./FakeUserRepo"

test("create user use case-Unit Test",async ()=>{
    const FakeRepo= new FakeUserRepo()
    const useCase= new UpdateUseCase(FakeRepo)
    const res = await useCase.exec("uuidtest","newName","newemail@gmail.com")
    expect(res).toEqual({
        "created_at": expect.any(Date),
         "email": "newemail@gmail.com",
          "id": expect.stringMatching(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      ),
       "name": "newName"})
})