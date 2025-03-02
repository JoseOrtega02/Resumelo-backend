import { ISummary } from "../../Domain/Entities/ISummary";
import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import  client  from "../../../DB/TursoDB";

export class SummaryRepositorySQL implements SummaryRepo{
    
     async create(summary:ISummary){
        try {
            const res = await client.execute({
                sql: "INSERT INTO summaries (title, \"desc\", pdf, likes, liked, id) VALUES (?, ?, ?, 0, false, ?)",
                args: [summary.getTitle(), summary.getDesc(), summary.getUrl(), summary.getId()]
            });
    
            console.log("Insert Result:", res); // Log to check the actual response
    
            return res;
        } catch (error) {
            console.error("Error creating summary:", error);
            throw new Error("Failed to create summary");
        }
       
    }

    async findById(id: string): Promise<Summary | null> {
        try {
             const response = await client.execute({sql:`SELECT * FROM summaries WHERE id=?`,args:[id]})
        const resConverted:any=response.rows[0]
     
        return response ? new Summary(resConverted.title,resConverted.desc,resConverted.pdf,resConverted.likes,resConverted.liked,resConverted.id) : null;
        } catch (error) {
            console.error('Error finding all summaries:', error);
            throw new Error('Failed to retrieve summaries');
        }
       
    }

    async findAll(): Promise<Summary[]> {
        try {
           
            const response = await client.execute("SELECT * FROM summaries");
            if (!response || !response.rows) {
                return [];
            }
          
            return response.rows.map((row: any) => {
                const data = row
               
                return new Summary(data.title, data.desc, data.pdf, data.likes, data.liked, data.id);
            });
        } catch (error) {
            console.error('Error finding all summaries:', error);
            throw new Error('Failed to retrieve summaries');
        }
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