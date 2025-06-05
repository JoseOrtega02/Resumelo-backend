import path from "path";
import { CreateSummaryUseCase } from "../../UseCases/CreateSumary";
import { FakeDocumentRepository } from "./FakeDocumentRepo";
import { FakeSummaryRepo } from "./FakeRepo";
import * as fs from "fs"
import { Readable } from "stream";

export async function crearMockMulterFile(ruta: string): Promise<Express.Multer.File> {
  const buffer:Buffer = fs.readFileSync(ruta) 
  const stream = Readable.from(buffer)

  return  {
    fieldname: 'file',
    originalname: path.basename(ruta),
    encoding: '7bit',
    mimetype: 'application/pdf',
    size: buffer.length,
    destination: '',
    filename: path.basename(ruta),
    path: ruta,
    buffer,
    stream
  };
}
test("Create a summary use case-Unit Testing", async () => {
  const fakeRepo = new FakeSummaryRepo();
  const fakeDocumentRepo = new FakeDocumentRepository();
  const useCase = new CreateSummaryUseCase(fakeRepo, fakeDocumentRepo);
const file = await crearMockMulterFile("@/__test__/minimal-documet.pdf")
  
  const res = await useCase.execute(
    "test Summary",
    "its just a test case",
    file,
    "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd"
  );

  expect(res).toEqual({
    desc: "its just a test case",
    id: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    author: expect.stringMatching(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ),
    liked: false,
    likes: 0,
    pdf: expect.stringMatching(/^https\/\/:fakeurl\.com\/[a-f0-9\-]+$/),
    title: "test Summary",
  });
});
