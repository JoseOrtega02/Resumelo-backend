import { ISummary } from "../Entities/ISummary";
import { Summary } from "../Entities/Summary";

export interface SummaryRepo{
    create(summary:ISummary):Promise<void>
    findById(id:string):Promise<Summary | null>
    findAll():Promise<Summary[] | null>
    put(summary:Summary,title:string,desc:string,pdf:string):Promise<Summary | null>
    delete(id:string):Promise<void>
}