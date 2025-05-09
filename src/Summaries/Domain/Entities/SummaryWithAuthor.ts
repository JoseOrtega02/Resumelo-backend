import { ISummaryWithAuthor } from "./ISummaryWithAuthor";
import { Summary } from "./Summary";

export class SummaryWithAuthor extends Summary implements ISummaryWithAuthor {
  authorData: { name: string };

  constructor(
    title: string,
    desc: string,
    pdf: string,
    author: string,
    likes: number = 0,
    liked: boolean = false,
    authorData: { name: string },
    id?: string
  ) {
    super(title, desc, pdf, author, likes, liked, id);
    this.authorData = authorData;
  }
}
