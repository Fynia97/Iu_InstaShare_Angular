export class Book {
    public id: number
    public isbn: string
    public title: string
    public author: string
    public publisher: string
    public publishingYear: Date

    constructor(id: number = 0, isbn: string = "", title: string = "", author: string = "", publisher: string = "", publishingYear: Date = "") {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishingYear = publishingYear;
    }
}