import { ResultSet } from "@libsql/client/.";
import { ISummary } from "../Entities/ISummary";
import { Summary } from "../Entities/Summary";
import { SummaryWithAuthor } from "../Entities/SummaryWithAuthor";

export interface FindAllResponse{
  data:SummaryWithAuthor[],
  pagination:{
    page:number,
    totalPages:number,
    totalItems:number,
    previousPage:number | null,
    nextPage:number | null
  }
}

export interface SummaryRepo {
  create(summary: ISummary): Promise<Summary | null>;
  findById(id: string): Promise<SummaryWithAuthor | null>;
  findAll(limit:number,offset:number,page:number): Promise<FindAllResponse>; 
  put(summary: Summary, id: string): Promise<Summary | null>; 
  delete(id: string): Promise<void | ResultSet>;
  search(title: string): Promise<Summary[] | []>;
  findAllByAuthor(authorId:string): Promise<Summary[] | []>
}
