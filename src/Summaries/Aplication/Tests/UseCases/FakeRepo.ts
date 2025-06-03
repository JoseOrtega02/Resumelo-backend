import { ISummary } from "../../../Domain/Entities/ISummary";
import { Summary } from "../../../Domain/Entities/Summary";
import { SummaryWithAuthor } from "../../../Domain/Entities/SummaryWithAuthor";
import { FindAllResponse, SummaryRepo } from "../../../Domain/Repositories/SummaryRepo";

export class FakeSummaryRepo implements SummaryRepo {
  private summaries: Map<string, Summary> = new Map();
  constructor() {
    const testSummary = new Summary(
      "Default Summary",
      "This is a default summary.",
      "blablaba.pdf",
      "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd"
    );
    const testSummaryAuthor= new SummaryWithAuthor("test Summary","this is a default summ","blblbl.pdf",
      "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd",0,false,{name:"author"})
    this.summaries.set("0", testSummary);
    this.summaries.set("1", testSummaryAuthor);
  }

  async create(summary: ISummary): Promise<Summary> {
    const id = crypto.randomUUID();
    const newSummary: Summary = new Summary(
      summary.getTitle(),
      summary.getDesc(),
      summary.getUrl(),
      summary.getAuthor(),
      0,
      false,
      id
    );
    this.summaries.set(id, newSummary);
    return newSummary;
  }

  async findById(id: string): Promise<SummaryWithAuthor | null> {

    const testSummaryAuthor= new SummaryWithAuthor("test Summary","this is a default summ","blblbl.pdf",
      "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd",0,false,{name:"author"})
    return testSummaryAuthor
  }

  async findAll(limit:number,offset:number,page:number): Promise<FindAllResponse> {
    const summaries= []
    summaries.push(new SummaryWithAuthor("test Summary","this is a default summ","blblbl.pdf",
      "68234bb8-364b-4cfa-bc9a-3791e0b7b6dd",0,false,{name:"author"}))
    const res = {
     data: summaries,
      pagination:{
        page:1,
        totalPages:1,
        nextPage:null,
        previousPage:null,
        totalItems:2
      }
    }
    return res 
  }

  async put(summary: Summary, id: string): Promise<Summary | null> {
    if (!this.summaries.has("0")) return null;
    this.summaries.set(id, summary);
    return summary;
  }

  async delete(id: string): Promise<void> {
    this.summaries.delete(id);
  }

  async search(title: string): Promise<Summary[] | []> {
    let res:Summary[] = []
     this.summaries.forEach((e)=> {if(e.getTitle() == title){
      res.push(e)
    } }) 
    return res
  }

  async findAllByAuthor(authorId: string): Promise<Summary[] | []> {    
    let res:Summary[] = []
    
     this.summaries.forEach((e)=> {if(e.getAuthor() == authorId){
      res.push(e)
    } }) 
    return res
  }
}
