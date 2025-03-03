import app from "../index"

import client from "../DB/TursoDB"

import request from "supertest"

  
describe("GET /", () => {
   
  
    it("should respond with status 200 and correct message", async () => {
      const response = await request(app).get("/");
  
      // Check the response status
      expect(response.status).toBe(200);
  
      // Check that the response body matches the expected string
      expect(response.text).toBe("¡Hola, TypeScript con Express!");
    });
  });



describe("Integration test for Summary API",()=>{
    test("GET / Summary should return the list of all Summaries",async ()=>{
        const res = await request(app).get('/summary');
    expect(res.status).toBe(200);

    const expected = {
        desc: "Another summary description.",
        id: "b6d22e48-1bb4-4d9c-92a4-8b920e67f8b5",
        liked: 1,
        likes: 5,
        pdf: "another.pdf",
        title: "Another Summary",
      };
      
      expect(res.body).toContainEqual(expected);
    })

    test("GET /Summary/:id should return an specific summary",async () =>{
        const res = await request(app).get("/summary/b6d22e48-1bb4-4d9c-92a4-8b920e67f8b5").expect(200)
        expect(res.body).toEqual({
            id: 'b6d22e48-1bb4-4d9c-92a4-8b920e67f8b5',
            title: 'Another Summary',
            desc: 'Another summary description.',
            pdf: 'another.pdf',
            likes: 5,
            liked: 1
          });
    })
    
    test("POST /summary should return a successfull message and create a  summary",async ()=>{
        const summaryData = {
            title: "Test Summary",
            desc: "This is a test summary",
            pdf: "test.pdf"
        };
    
        const res = await request(app)
            .post("/summary")
            .send(summaryData) // ✅ Send JSON body
            .expect("Content-Type", /json/)
            .expect(201); // ✅ Expect 201 Created
    
        expect(res.body).toEqual(
            "Summary created successfully"
        );
    })
    
    test("PUT /summary/id should return a successfull message and edit a summary",async ()=>{
        const res = await request(app).put("/summary/77fee0ce-4a87-40cd-b58a-b15019489ce0").send({
            title:"edited summary",
            desc:"edited a summary",
            pdf:"edited.pdf"
        }).expect("Content-Type", /json/).expect(201)
        expect(res.body).toEqual({message: "Summary edited successfully: "+ {"desc": "edited a summary", "id": "77fee0ce-4a87-40cd-b58a-b15019489ce0", "liked": 0, "likes": 0, "pdf": "edited.pdf", "title": "edited summary"}})
    })

    test("DELETE /summary/id should delete a summary and return a message.",async ()=>{
        const res= await request(app).delete("/summary/c33e3530-e1e9-4d2c-89de-b6c66ace8422").expect("Content-Type", /json/).expect(200)

        expect(res.body).toEqual({message: "Summary Deleted Successfully"})
    })
})