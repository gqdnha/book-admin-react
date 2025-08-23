export interface BorrowQueryType {
    name?: string;
    author?: string;
    category?: string;
    current?: number;
    pageSize?: number;
}

export interface BorrowType {
    name: string;
    author: string;
    category: string;
    cover: string;
    publishAt: number;
    stock: number;
    description: string;
}