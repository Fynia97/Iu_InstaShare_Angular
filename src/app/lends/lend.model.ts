import { Book } from "../books/book.model"
import { User } from "../users/user.model"

export class Lend {
    public id: number
    public lendFrom: Date
    public lendTo: Date
    public borrowerId: number
    public bookId: number
    public note: string
    public book: Book | null
    public borrower: User | null

    constructor(id = 0, lendFrom: Date = new Date(), lendTo: Date = new Date(), borrowerId: number = 0, bookId: number = 0, note: string = "", book: Book = new Book(), borrower: User = new User()) {
        this.id = id;
        this.lendFrom = lendFrom;
        this.lendTo = lendTo;
        this.borrowerId = borrowerId;
        this.bookId = bookId;
        this.note = note;
        this.book = book;
        this.borrower = borrower;
    }
}