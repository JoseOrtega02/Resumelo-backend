import { ISummary } from "../Entities/ISummary";

export class SummaryService{
    modifySummary(summary:ISummary,pdf:string,title:string,desc:string){
        summary.setDesc(desc)
        summary.setTitle(title)
        summary.setPdf(pdf)
    }

    likeSummary(summary:ISummary,liked:boolean):void{
        summary.setLike(liked)
    }
}