import { Book } from "../books/book.model"
import { User } from "../users/user.model"
import { LendStatusEnum } from "./lendStatus.enum"

export class Lend {
    public id: number
    public lendFrom: Date | null
    public lendTo: Date | null
    public borrowerId: number
    public bookId: number
    public note: string
    public book: Book | null
    public borrower: User | null
    public lendStatus: LendStatusEnum

    constructor(id = 0, lendFrom: Date | null = null, lendTo: Date | null = null, borrowerId: number = 0, bookId: number = 0, note: string = "", book: Book = new Book(), borrower: User = new User(), lendStatus: LendStatusEnum = LendStatusEnum.REQUESTMADE) {
        this.id = id;
        this.lendFrom = lendFrom;
        this.lendTo = lendTo;
        this.borrowerId = borrowerId;
        this.bookId = bookId;
        this.note = note;
        this.book = book;
        this.borrower = borrower;
        this.lendStatus = lendStatus;
    }
}