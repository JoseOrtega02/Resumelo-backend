import { ISummary } from "../../../Domain/Entities/ISummary";
import { Summary } from "../../../Domain/Entities/Summary";
import { SummaryRepo } from "../../../Domain/Repositories/SummaryRepo";

export class FakeSummaryRepo implements SummaryRepo {
    private summaries: Map<string, Summary> = new Map();
    constructor(){
        const testSummary = new Summary("Default Summary", "This is a default summary.","blablaba.pdf")
        this.summaries.set("0",testSummary)
    }

    async create(summary: ISummary): Promise<void> {
        const id =crypto.randomUUID()
       const newSummary:Summary =new Summary(summary.getTitle(),summary.getDesc(),summary.getUrl(),0,false)
        this.summaries.set(id, newSummary);
    }

    async findById(id: string): Promise<Summary | null> {
        return this.summaries.get(id) || null;
    }

    async findAll(): Promise<Summary[]> {
        return Array.from(this.summaries.values());
    }

    async put(summary: Summary, id: string): Promise<Summary | null> {
        if (!this.summaries.has(id)) return null;
        this.summaries.set(id, summary);
        return summary;
    }

    async delete(id: string): Promise<void> {
        this.summaries.delete(id);
    }
}