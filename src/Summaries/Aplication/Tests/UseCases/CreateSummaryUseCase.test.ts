import { CreateSummaryUseCase } from "../../UseCases/CreateSumary";
import { FakeDocumentRepository } from "./FakeDocumentRepo";
import { FakeSummaryRepo } from "./FakeRepo";

test("Create a summary use case-Unit Testing", async () => {
  const fakeRepo = new FakeSummaryRepo();
  const fakeDocumentRepo = new FakeDocumentRepository();
  const useCase = new CreateSummaryUseCase(fakeRepo, fakeDocumentRepo);

  const res = await useCase.execute(
    "test Summary",
    "its just a test case",
    "test.pdf",
    "test author"
  );

  expect(res).toEqual({
    desc: "its just a test case",
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    author: "test author",
    liked: false,
    likes: 0,
    pdf: expect.stringMatching(/^https\/\/:fakeurl\.com\/[a-f0-9\-]+$/),
    title: "test Summary",
  });
});
