import { ISummary } from "../../Domain/Entities/ISummary";
import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { client } from "../DB/TursoDB";

export class SummaryRepositorySQL implements SummaryRepo{
    
     async create(summary:ISummary){
        const response = await client.execute({
            sql:"INSERT INTO summaries (title, \"desc\", pdf, likes, liked) VALUES (?, ?, ?, 0, false)",
            args:[summary.getTitle(), summary.getDesc(), summary.getUrl()]
        })
    }

    async findById(id: string): Promise<Summary | null> {
        const response = await client.execute({sql:`SELECT * FROM summaries WHERE id=?`,args:[id]})
        const resConverted=response.toJSON()
        return response ? new Summary(resConverted.title,resConverted.desc,resConverted.pdf,resConverted.likes,resConverted.liked) : null;
    }

    async findAll(): Promise<Summary[]> {
        const response= await client.execute(`SELECT * FROM summaries`)
        
             return response.rows.map((row: any) => {
            const data = row.toJSON()
            return new Summary(data.title,data.desc,data.pdf,data.likes,data.liked)});
        
       
    }

    async put(summary: Summary,id:string): Promise<Summary | null> {
       

         await client.execute({
            sql:"UPDATE summaries SET title = ?, \"desc\" = ?, pdf = ? WHERE id = ?",
            args:[summary.getTitle(), summary.getDesc(),summary.getUrl(), id]})
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
         await client.execute({sql:`DELETE FROM summaries WHERE id=?`,args:[id]})
    }
}