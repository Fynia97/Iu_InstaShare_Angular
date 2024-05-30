export class Book {
    public id: number
    public isbn: string
    public title: string
    public author: string
    public publisher: string
    public publishingYear: Date
    public lendOut: Boolean

    constructor(id = 0, isbn: string = "", title: string = "", author: string = "", publisher: string = "", publishingYear: Date, lendOut: Boolean = false) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishingYear = publishingYear;
        this.lendOut = lendOut;
    }
}