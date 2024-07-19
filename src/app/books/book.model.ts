import { BookCategoryEnum } from "./book.enum"

export class Book {
    public id: number
    public isbn: string
    public title: string
    public author: string
    public publisher: string
    public publishingYear: Date
    public lendOut: Boolean
    public userId: number
    public category: BookCategoryEnum

    constructor(id = 0, isbn: string = "", title: string = "", author: string = "", publisher: string = "", publishingYear: Date = new Date(), lendOut: Boolean = false, userId: number = 0, category: BookCategoryEnum = BookCategoryEnum.OTHER) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishingYear = publishingYear;
        this.lendOut = lendOut;
        this.userId = userId;
        this.category = category;
    }
}