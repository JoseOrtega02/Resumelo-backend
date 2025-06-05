import { Summary } from "../../../Domain/Entities/Summary";
import { FindByIdUseCase } from "../../UseCases/FindByIdSummary";
import { FakeLikeRepository } from "./FakeLIkesRepo";
import { FakeSummaryRepo } from "./FakeRepo";

test("Find One Summary by id-Unit Test", async () => {
  const fakeRepo = new FakeSummaryRepo();
  const likeFakeRepo = new FakeLikeRepository()
  const useCase = new FindByIdUseCase(fakeRepo,likeFakeRepo);
  const id = "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd";
  const res = await useCase.exec(id);

  expect(res).toEqual({
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    author: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    title: "Default Summary",
    desc: "This is a default summary.",
    liked: false,
    likes: 0,
    pdf: "blablaba.pdf",
  });
});
