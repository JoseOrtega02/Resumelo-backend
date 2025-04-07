import { DeleteSummaryUseCase } from "../../UseCases/DeleteSummary";
import { FakeDocumentRepository } from "./FakeDocumentRepo";
import { FakeSummaryRepo } from "./FakeRepo";

test("Delete a Summary Use Case-Unit testing", async () => {
  const fakeRepo = new FakeSummaryRepo();
  const fakeDocumentRepo = new FakeDocumentRepository();
  const useCase = new DeleteSummaryUseCase(fakeRepo, fakeDocumentRepo);

  const res = await useCase.exec("68234bb8-364b-4cfa-bc9a-3791e0b7b6dd");

  expect(res).toEqual("Summary Deleted Successfully");
});
