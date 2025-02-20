export interface  ISummary{
    getTitle(): string;
    getDesc(): string;
    getUrl(): string;
    getLikesCount(): number;
    
    setTitle(title: string): void;
    setDesc(desc: string): void;
    setPdf(pdf: string): void;
    setLike(liked: boolean): void;
}