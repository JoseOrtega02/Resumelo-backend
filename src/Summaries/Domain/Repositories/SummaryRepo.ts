import { ResultSet } from "@libsql/client/.";
import { ISummary } from "../Entities/ISummary";
import { Summary } from "../Entities/Summary";
import { SummaryWithAuthor } from "../Entities/SummaryWithAuthor";

export interface SummaryRepo {
  create(summary: ISummary): Promise<Summary | null>;
  findById(id: string): Promise<SummaryWithAuthor | null>;
  findAll(): Promise<SummaryWithAuthor[]>; // Cambiado para devolver siempre un array
  put(summary: Summary, id: string): Promise<Summary | null>; // Se asume que `summary` ya contiene los datos actualizados
  delete(id: string): Promise<void | ResultSet>;
}
