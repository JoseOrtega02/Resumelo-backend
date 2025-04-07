import { User } from "../../Domain/Entities/User";
import { CreateUseCase } from "../UseCases/createUseCase";
import { FakeUserRepo } from "./FakeUserRepo";

test("Create user test-Unitary Test", async () => {
  const FakeRepo = new FakeUserRepo();
  const useCase = new CreateUseCase(FakeRepo);
  const res = await useCase.exec(
    "testUser",
    "user@gmail.com",
    "Testpassword1*"
  );

  expect(res).toEqual({
    created_at: expect.any(String),
    email: "user@gmail.com",

    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    name: "testUser",
    password: expect.any(String),
  });
});
