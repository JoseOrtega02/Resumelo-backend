export interface  ISummary{
    getTitle(): string;
    getDesc(): string;
    getUrl(): string;
    getLikesCount(): number;
    getId():string;
    
    setTitle(title: string): void;
    setDesc(desc: string): void;
    setPdf(pdf: string): void;
    setLike(liked: boolean): void;
}