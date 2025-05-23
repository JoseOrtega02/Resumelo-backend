import { PutSummaryUseCase } from "../../UseCases/PutSummary";
import { FakeDocumentRepository } from "./FakeDocumentRepo";
import { FakeSummaryRepo } from "./FakeRepo";

test("Put Summary use case-Unit test", async () => {
  const fakeRepo = new FakeSummaryRepo();
  const documentFakeRepo = new FakeDocumentRepository();
  const useCase = new PutSummaryUseCase(fakeRepo, documentFakeRepo);

  const res = await useCase.execute(
    "new Summary",
    "new summary edited xd",
    "edited.pdf",
    "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd"
  );

  expect(res).toEqual({
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    author: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    title: "new Summary",
    desc: "new summary edited xd",
    pdf: expect.stringMatching(/^https\/\/:fakeurl\.com\/[a-f0-9\-]+$/),
    likes: 0,
    liked: false,
  });
});
