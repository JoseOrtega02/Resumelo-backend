import { ISummary } from "../../Domain/Entities/ISummary";
import { Summary } from "../../Domain/Entities/Summary";
import {
  FindAllResponse,
  SummaryRepo,
} from "../../Domain/Repositories/SummaryRepo";
import { client } from "../../../DB/TursoDB";
import { ResultSet } from "@libsql/client/.";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { SummaryWithAuthor } from "../../Domain/Entities/SummaryWithAuthor";

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
      console.error(insert);
      throw new AppError("Error creating the summary", 500);
    }
    const res = await this.findById(summary.getId());

    return res;
  }

  async findById(id: string): Promise<SummaryWithAuthor | null> {
    const response = await client.execute({
      sql: `SELECT 
      summaries.title,
  summaries.id,
  summaries.desc,
  summaries.pdf,
  summaries.author,
  summaries.likes,
  summaries.liked,
  users.email,
  users.name
FROM summaries
JOIN users ON summaries.author = users.id
WHERE summaries.id = ?`,
      args: [id],
    });
    if (!response.rows.length) {
      throw new AppError("Summary not found", 404);
    }

    const resConverted: any = response.rows[0];
    const authorData = { name: resConverted.name, email: resConverted.email };
    return new SummaryWithAuthor(
      resConverted.title,
      resConverted.desc,
      resConverted.pdf,
      resConverted.author,
      resConverted.likes,
      resConverted.liked,
      authorData,
      resConverted.id,
    );
  }

  async findAll(
    limit: number,
    offset: number,
    page: number,
  ): Promise<FindAllResponse> {
    const result = await client.execute({
      sql: `SELECT 
  summaries.id,
  summaries.title,
  summaries.desc,
  summaries.author,
  users.name AS authorName,
  COUNT(likes.userId) AS likesCount
FROM summaries
JOIN users ON summaries.author = users.id
LEFT JOIN likes ON summaries.id = likes.summaryId
GROUP BY summaries.id, summaries.title, summaries.desc, summaries.author, users.name
ORDER BY summaries.id
LIMIT ? OFFSET ?;`,
      args: [limit, offset],
    });
    if (!result || !result.rows) {
      throw new AppError("something went wrong finding summaries", 500);
    }

    const totalResponse = await client.execute(
      `SELECT COUNT(*) AS total FROM summaries;`,
    );
    if (!totalResponse || !totalResponse.rows)
      throw new AppError("something went wrong with summaries pages", 500);
    const total = Number(totalResponse.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    const data = result.rows.map((row: any) => {
      const data = row;
      const author = { name: data.authorName };
      return new SummaryWithAuthor(
        data.title,
        data.desc,
        "",
        data.author,
        data.likesCount,
        false,
        author,
        data.id,
      );
    });

    return {
      data: data,
      pagination: {
        totalPages: totalPages,
        totalItems: total,
        page: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    };
  }

  async put(summary: Summary, id: string): Promise<Summary | null> {
    const res = await client.execute({
      sql: 'UPDATE summaries SET title = ?, "desc" = ?, pdf = ? WHERE id = ?',
      args: [summary.getTitle(), summary.getDesc(), summary.getUrl(), id],
    });
    if (!res.rowsAffected) {
      throw new AppError("Error updating summary", 500);
    }
    const editedSummary = await this.findById(id);
    return editedSummary;
  }

  async delete(id: string): Promise<void | ResultSet> {
    await client.execute({
      sql: `DELETE FROM likes WHERE summaryId = ?`,
      args: [id],
    });

    const res = await client.execute({
      sql: `DELETE FROM summaries WHERE id=?`,
      args: [id],
    });
    if (!res.rowsAffected) {
      throw new AppError("error deleting summary", 500);
    }
    return res;
  }

  async search(title: string): Promise<Summary[] | []> {
    const res = await client.execute({
      sql: `
       SELECT 
      summaries.id,
      summaries.title,
      summaries.desc,
      summaries.author,
      users.name AS authorName,
      COUNT(likes.userId) AS likesCount
    FROM summaries
    JOIN users ON summaries.author = users.id
    LEFT JOIN likes ON summaries.id = likes.summaryId
    WHERE summaries.title LIKE ?
    GROUP BY summaries.id;
  `,
      args: [`%${title}%`],
    });

    if (!res.rows.length) {
      return [];
    }
    return res.rows.map((row: any) => {
      const data = row;
      const author = { name: data.authorName };
      return new SummaryWithAuthor(
        data.title,
        data.desc,
        "",
        data.author,
        data.likesCount,
        false,
        author,
        data.id,
      );
    });
  }

  async findAllByAuthor(authorId: string): Promise<Summary[] | []> {
    console.log("LLEGA AL REPO");
    const res = await client.execute({
      sql: `
SELECT 
  s.id,
  s.title,
  s.desc,
  s.author,
  u.name AS authorName,
  COUNT(l.userId) AS likesCount
FROM summaries s
JOIN users u ON s.author = u.id
LEFT JOIN likes l ON s.id = l.summaryId
WHERE s.author = ?
GROUP BY s.id, s.title, s.desc, s.author, u.name;

  `,
      args: [authorId],
    });

    if (!res.rows.length) {
      return [];
    }
    return res.rows.map((row: any) => {
      const data = row;
      return new SummaryWithAuthor(
        data.title,
        data.desc,
        "",
        data.author,
        data.likesCount,
        false,
        data.authorName,
        data.id,
      );
    });
  }
}
