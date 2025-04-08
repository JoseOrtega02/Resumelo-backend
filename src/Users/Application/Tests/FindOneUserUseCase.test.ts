import { User } from "../../Domain/Entities/User";
import { GetByIdUseCase } from "../UseCases/getByIdUseCase";
import { FakeUserRepo } from "./FakeUserRepo";

test("Get one user use case-Unitary test", async () => {
  const fakeRepo = new FakeUserRepo();
  const useCase = new GetByIdUseCase(fakeRepo);
  const res = await useCase.exec("68234bb8-364b-4cfa-bc9a-3791e0b7b6dd");
  expect(res).toEqual({
    password: "",
    created_at: expect.any(Date),
    email: "testEmail",
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    name: "testUser",
  });
});
