import { GetAllUseCase } from "../UseCases/getAllUseCase"
import { FakeUserRepo } from "./FakeUserRepo"

test("get all users-Unit test",async ()=>{
    const fakeRepo= new FakeUserRepo()
    const useCase=new GetAllUseCase(fakeRepo)
    const res =await  useCase.exec()
    expect(res).toContainEqual({
        "created_at": expect.any(Date),
         "email": "testEmail",
          "id": expect.stringMatching(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      ),
       "name": "testUser"})
})