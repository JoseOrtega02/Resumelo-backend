import { Summary } from "./Summary";

export interface ISummaryWithAuthor extends Summary {
  authorData: {
    name: string;
  };
}
