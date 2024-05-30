import { Book } from "../books/book.model"
import { User } from "../users/user.model"

export class Lend {
    public id: number
    public lendFrom: Date
    public lendTo: Date
    public borrower: User
    public book: Book
    public note: string

    constructor(id = 0, lendFrom: Date, lendTo: Date, borrower: User, book: Book, note: string = "") {
        this.id = id;
        this.lendFrom = lendFrom;
        this.lendTo = lendTo;
        this.borrower = borrower;
        this.book = book;
        this.note = note;
    }
}