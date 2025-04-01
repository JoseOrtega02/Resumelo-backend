import { ISummary } from "../../Domain/Entities/ISummary";
import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { client } from "../../../DB/TursoDB";
import { ResultSet } from "@libsql/client/.";
import { AppError } from "../../../Shared/Interface/Responses/AppError";

export class SummaryRepositorySQL implements SummaryRepo {
  async create(summary: ISummary) {
    const insert = await client.execute({
      sql: 'INSERT INTO summaries (title, "desc", pdf,author, likes, liked, id) VALUES (?, ?,?, ?, 0, false, ?)',
      args: [
        summary.getTitle(),
        summary.getDesc(),
        summary.getUrl(),
        summary.getAuthor(),
        summary.getId(),
      ],
    });
    if (!insert.rowsAffected) {
      throw new AppError("Error creating the summary", 500);
    }
    const res = await this.findById(summary.getId());

    return res;
  }

  async findById(id: string): Promise<Summary | null> {
    const response = await client.execute({
      sql: `SELECT * FROM summaries WHERE id=?`,
      args: [id],
    });
    if (!response.rows.length) {
      throw new AppError("Summary not found", 404);
    }

    const resConverted: any = response.rows[0];
    return new Summary(
      resConverted.title,
      resConverted.desc,
      resConverted.pdf,
      resConverted.author,
      resConverted.likes,
      resConverted.liked,
      resConverted.id
    );
  }

  async findAll(): Promise<Summary[]> {
    const response = await client.execute("SELECT * FROM summaries");
    if (!response || !response.rows) {
      return [];
    }

    return response.rows.map((row: any) => {
      const data = row;

      return new Summary(
        data.title,
        data.desc,
        data.pdf,
        data.author,
        data.likes,
        data.liked,
        data.id
      );
    });
  }

  async put(summary: Summary, id: string): Promise<Summary | null> {
    const res = await client.execute({
      sql: 'UPDATE summaries SET title = ?, "desc" = ?, pdf = ? WHERE id = ?',
      args: [summary.getTitle(), summary.getDesc(), summary.getUrl(), id],
    });
    if (!res.rowsAffected) {
      throw new AppError("Error updating summary", 500);
    }
    console.log(res);
    const editedSummary = await this.findById(id);
    return editedSummary;
  }

  async delete(id: string): Promise<void | ResultSet> {
    const res = await client.execute({
      sql: `DELETE FROM summaries WHERE id=?`,
      args: [id],
    });
    if (!res.rowsAffected) {
      throw new AppError("error deleting summary", 500);
    }
    return res;
  }
}
