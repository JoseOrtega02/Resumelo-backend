import { randomUUID } from "crypto";
import { ISummary } from "./ISummary";

export class Summary implements ISummary {
  private id: string;
  private title: string;
  private desc: string;
  private pdf: string;
  private author: string;
  likes: number;
  liked: boolean;

  constructor(
    title: string,
    desc: string,
    pdf: string,
    author: string,
    likes: number = 0,
    liked: boolean = false,
    id?: string
  ) {
    this.id = id || randomUUID();
    this.author = author;
    this.title = title;
    this.desc = desc;
    this.pdf = pdf;
    this.likes = likes;
    this.liked = liked;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }
  getDesc(): string {
    return this.desc;
  }

  getUrl(): string {
    return this.pdf;
  }

  getLikesCount(): number {
    return this.likes;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDesc(desc: string): void {
    this.desc = desc;
  }

  setPdf(pdf: string): void {
    this.pdf = pdf;
  }

  setLike(liked: boolean): void {
    if (this.liked !== liked) {
      this.likes += liked ? 1 : -1;
      this.liked = liked;
    }
  }

  equals(other: Summary): boolean {
    return (
      this.title === other.title &&
      this.desc === other.desc &&
      this.pdf === other.pdf &&
      this.likes === other.likes &&
      this.liked === other.liked &&
      this.id === other.id
    );
  }
}
