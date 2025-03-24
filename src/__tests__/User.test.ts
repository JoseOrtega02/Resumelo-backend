import request from "supertest"
import app from "../index"

describe("User integration tests Crud", ()=>{
    it("POST /user should create a user",async ()=>{
        const res = await request(app)
        .post("/user")
        .send({
            name:"testUser",
            email:"UserEmail2@gmail.com"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        
        expect(res.body).toEqual(
            "User Created successfully"
        )
    })

    it("GET /user/id should return a specific user",async ()=>{
        const res = await request(app)
        .get("/user/09b7fa73-0b0b-494b-95b5-2e19ea240b6f")
        .expect(200)

        expect(res.body).toEqual({
            "created_at": expect.any(String),
             "email": "UserEmail@gmail.com",
              "id": "09b7fa73-0b0b-494b-95b5-2e19ea240b6f",
           "name": "testUser"})
    })

    it("GET /user should return all users",async ()=>{
        const res = await request(app)
        .get("/user")
        .expect(200)

        expect(res.body).toContainEqual({
            "created_at": expect.any(String),
             "email": "UserEmail@gmail.com",
              "id": expect.stringMatching(
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
              ),
           "name": "testUser"})
    })
    it("PUT /user/id should edit the name and email of user",async ()=>{
        const res = await request(app)
        .put("/user/2a171eef-35c8-4adb-a2d9-8520db9d51b8")
        .send({name:"editedUser",email:"editedUser@gmail.com"})
        .expect(201)

        expect(res.body).toEqual({
            "created_at": expect.any(String),
             "email": "editedUser@gmail.com",
              "id": "2a171eef-35c8-4adb-a2d9-8520db9d51b8",
           "name": "editedUser"
        })
    })
    // it("DELETE /user should delete a user",async ()=>{
    //     const res = await request(app)
    //     .delete("/user/62f1901f-e957-49ad-be67-918e15ebf45b")
    //     .expect(200)

    //     expect(res.body).toEqual("Deleted Succesfully")
    // })
})