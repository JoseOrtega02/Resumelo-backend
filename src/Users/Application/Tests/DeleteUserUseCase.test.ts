import { DeleteUseCase } from "../UseCases/deleteUseCase";
import { FakeUserRepo } from "./FakeUserRepo";

test("delete user use case-Unit Test", async () => {
  const FakeRepo = new FakeUserRepo();
  const useCase = new DeleteUseCase(FakeRepo);
  const res = await useCase.exec("68234bb8-364b-4cfa-bc9a-3791e0b7b6dd");
  expect(res).toEqual("User Deleted Successfully");
});
