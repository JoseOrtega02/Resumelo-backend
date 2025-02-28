import app from "express"
import { title } from "process"

import request from "supertest"

describe("Integration test for Summary API",()=>{
    test("GET / Summary should return the list of all Summaries",async ()=>{
        const res = await request(app).get("/summary").expect(200)
        expect(res).toContainEqual({
            title:"Default Summary",
            desc:"This is a default summary.",
            pdf:"blablaba.pdf",
            likes:0,
            liked:false
        })
    })

    test("GET /Summary/:id should return an specific summary",async () =>{
        const res = await request(app).get("/summary/0").expect(200)
        expect(res).toEqual({
            title:"Default Summary",
            desc:"This is a default summary.",
            pdf:"blablaba.pdf",
            likes:0,
            liked:false
        })
    })
    
    test("POST /summary should return a successfull message and create a  summary",async ()=>{
        const res = (await request(app).post("/summary")).body({
            title:"new Summary",
            desc:"creating a summary in tests",
            pdf:"test.pdf"
        }).expect(201)
        expect(res).toBe("Summary created Successfully")
    })
    
    test("PUT /summary/id should return a successfull message and edit a summary",async ()=>{
        const res = (await request(app).put("/summary/0")).body({
            title:"edited summary",
            desc:"edited a summary",
            pdf:"edited.pdf"
        }).expect(201)
        expect(res).toBe("Summary edited successfully")
    })

    test("DELETE /summary/id should delete a summary and return a message.",async ()=>{
        const res= await request(app).delete("/summary/1").expect(201)

        expect(res).toBe("Summary deleted successfully")
    })
})