import { ISummary } from "./ISummary";

export class Summary implements ISummary{
    private title: string;
    private desc: string;
    private pdf: string;
    likes: number;
    liked: boolean;

    constructor(title: string, desc: string, pdf: string, likes: number = 0, liked: boolean = false) {
        this.title = title;
        this.desc = desc;
        this.pdf = pdf;
        this.likes = likes;
        this.liked = liked;
    }

    getTitle(): string {
        return this.title;
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
}