import { app, server } from "../index";

import request from "supertest";
let token: string;
let userId: string;
beforeAll(async () => {
  const user = await request(app)
    .post("/user")
    .send({
      name: "testSummary",
      email: "testSummary",
      password: "testSummary",
    })
    .expect(201);
  userId = user.body.data.id;
  const res = await request(app)
    .post("/login")
    .send({ email: "testSummary", password: "testSummary" })
    .expect(200);
  token = res.body.data;
});
afterAll(async () => {
  await request(app)
    .delete(`/user/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
  server.close(); // Cierra el servidor después de todas las pruebas
});

describe("Integration test for Summary API", () => {
  const summaryData = {
    title: "Test-Summary",
    desc: "This is a test summary",
    pdf: "src/__tests__/minimal-document.pdf",
    author: "testAuthor",
    id: "",
  };

  test("POST /summary should return a successfull message and create a  summary", async () => {
    const res = await request(app)
      .post("/summary")
      .send(summaryData)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(201);

    summaryData.id = res.body.data.id;
    expect(res.body.message).toEqual("Summary created successfully");
  });

  test("GET / Summary should return the list of all Summaries", async () => {
    const res = await request(app).get("/summary");

    expect(res.status).toBe(200);

    const expected = {
      desc: summaryData.desc,
      id: expect.stringMatching(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      ),
      liked: 0,
      likes: 0,
      author: summaryData.author,
      pdf: expect.stringMatching(
        /^https:\/\/pub-[a-f0-9]{32}\.r2\.dev\/[a-f0-9\-]+/
      ),
      title: summaryData.title,
    };

    expect(res.body.data).toContainEqual(expected);
  });

  test("GET /Summary/:id should return an specific summary", async () => {
    const res = await request(app)
      .get(`/summary/${summaryData.id}`)
      .expect(200);

    expect(res.body.data).toEqual({
      id: summaryData.id,
      title: summaryData.title,
      desc: summaryData.desc,
      author: summaryData.author,
      pdf: expect.stringMatching(
        /^https:\/\/pub-[a-f0-9]{32}\.r2\.dev\/[a-f0-9\-]+/
      ),
      likes: 0,
      liked: 0,
    });
  });

  test("PUT /summary/id should return a successfull message and edit a summary", async () => {
    const res = await request(app)
      .put(`/summary/${summaryData.id}`)
      .send({
        title: "edited summary",
        desc: "edited a summary",
        pdf: summaryData.pdf,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(res.body.data).toEqual({
      desc: "edited a summary",
      id: summaryData.id,
      author: summaryData.author,
      liked: 0,
      likes: 0,
      pdf: expect.stringMatching(
        /^https:\/\/pub-[a-f0-9]{32}\.r2\.dev\/[a-f0-9\-]+/
      ),
      title: "edited summary",
    });
  });

  test("DELETE /summary/id should delete a summary and return a message.", async () => {
    const res = await request(app)
      .delete(`/summary/${summaryData.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Summary Deleted Successfully");
  });
});
