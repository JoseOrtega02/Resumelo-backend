import request from "supertest";
import { app, server } from "../index";
import { setupDatabase } from "../DB/TursoDB";
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe("User integration tests Crud", () => {
  const userPayload = {
    name: "testUser",
    email: `UserEmail${getRandomInt(0, 11)}@gmail.com`,
    id: "",
    password: "test123",
  };

  it("POST /user should create a user", async () => {
    const res = await request(app)
      .post("/user")
      .send(userPayload)
      .expect("Content-Type", /json/)
      .expect(201);

    userPayload.id = res.body.data.id;
    console.log(res.body);
    expect(res.body.message).toEqual("User created Successfully");
  });

  it("GET /user/id should return a specific user", async () => {
    const res = await request(app).get(`/user/${userPayload.id}`).expect(200);
    console.log(userPayload.id);
    expect(res.body.data).toEqual({
      created_at: expect.any(String),
      email: userPayload.email,
      id: expect.stringMatching(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      ),
      name: userPayload.name,
      password: "",
    });
  });

  it("GET /user should return all users", async () => {
    const res = await request(app).get("/user").expect(200);

    expect(res.body.data).toContainEqual({
      created_at: expect.any(String),
      email: userPayload.email,
      id: expect.stringMatching(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      ),
      name: userPayload.name,
      password: "",
    });
  });
  it("PUT /user/id should edit the name and email of user", async () => {
    const res = await request(app)
      .put(`/user/${userPayload.id}`)
      .send({
        name: "editedUser",
        email: "editedUser@gmail.com",
        password: "editedPassword",
      })
      .expect(201);

    expect(res.body.data).toEqual({
      created_at: expect.any(String),
      email: "editedUser@gmail.com",
      id: userPayload.id,
      name: "editedUser",
      password: expect.any(String),
    });
  });

  it("DELETE /user should delete a user", async () => {
    const res = await request(app)
      .delete(`/user/${userPayload.id}`)
      .expect(200);

    expect(res.body.message).toEqual("User Deleted Successfully");
  });
});
