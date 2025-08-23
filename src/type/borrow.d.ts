import { BookType } from "./book";

export interface BorrowQueryType {
    name?: string;
    author?: string;
    category?: string;
    current?: number;
    pageSize?: number;
}

export interface BorrowType {
    book:BookType;
    borrowAt:number;
    returnAt:number;
    // TODO
    user:any;
}