import { ResultSet } from "@libsql/client/.";
import { ISummary } from "../Entities/ISummary";
import { Summary } from "../Entities/Summary";

export interface SummaryRepo{
    create(summary: ISummary): Promise<ResultSet>;
    findById(id: string): Promise<Summary | null>;
    findAll(): Promise<Summary[]>; // Cambiado para devolver siempre un array
    put(summary: Summary,id:string): Promise<Summary | null>; // Se asume que `summary` ya contiene los datos actualizados
    delete(id: string): Promise<void>;
}