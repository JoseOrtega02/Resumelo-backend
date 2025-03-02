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
        desc: "This is a default summary.",
        id: "77fee0ce-4a87-40cd-b58a-b15019489ce0",
        liked: 0,
        likes: 0,
        pdf: "blablaba.pdf",
        title: "Default Summary",
      };
      
      expect(res.body).toContainEqual(expected);
    })

    test("GET /Summary/:id should return an specific summary",async () =>{
        const res = await request(app).get("/summary/77fee0ce-4a87-40cd-b58a-b15019489ce0").expect(200)
        expect(res.body).toEqual({
            id: '77fee0ce-4a87-40cd-b58a-b15019489ce0',
            title: 'Default Summary',
            desc: 'This is a default summary.',
            pdf: 'blablaba.pdf',
            likes: 0,
            liked: 0
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
    
    // test("PUT /summary/id should return a successfull message and edit a summary",async ()=>{
    //     const res = (await request(app).put("/summary/0")).body({
    //         title:"edited summary",
    //         desc:"edited a summary",
    //         pdf:"edited.pdf"
    //     }).expect(201)
    //     expect(res).toBe("Summary edited successfully")
    // })

    // test("DELETE /summary/id should delete a summary and return a message.",async ()=>{
    //     const res= await request(app).delete("/summary/1").expect(201)

    //     expect(res).toBe("Summary deleted successfully")
    // })
})