import { UpdateUseCase } from "../UseCases/updateUseCase";
import { FakeUserRepo } from "./FakeUserRepo";

test("create user use case-Unit Test", async () => {
  const FakeRepo = new FakeUserRepo();
  const useCase = new UpdateUseCase(FakeRepo);
  const res = await useCase.exec(
    "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd",
    "newName",
    "newemail@gmail.com"
  );
  expect(res).toEqual({
    password: "",
    created_at: expect.any(Date),
    email: "newemail@gmail.com",
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    name: "newName",
  });
});
