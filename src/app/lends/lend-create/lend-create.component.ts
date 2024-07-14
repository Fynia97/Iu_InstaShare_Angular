import { Component, OnInit } from '@angular/core';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { User } from 'src/app/users/user.model';
import { BookService } from 'src/app/books/book.service';
import { UserService } from 'src/app/users/user.service';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { BookCategoryEnum } from 'src/app/books/book.enum';


@Component({
  selector: 'app-lend-create',
  templateUrl: './lend-create.component.html',
  styleUrls: ['./lend-create.component.scss'],
  template: `<div>Received ID: {{friendId, bookId}}</div>`
})
export class LendCreateComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public lend = new Lend();
  public lends: Lend[] = [];
  public lendForm!: FormGroup;

  public book: Book;
  public bookCategoryEnum = BookCategoryEnum;

  public bookId: Number;
  public friendId: Number;

  constructor(
    private formbuilder: FormBuilder,
    private service: LendService,
    private bookService: BookService,
    private loginService: LoginRegisterService,
    private userService: UserService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { friendId: number, bookId: number };
    this.friendId = state.friendId;
    this.bookId = state.bookId;
  }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    this.lendForm = this.formbuilder.group({
      lendFrom: [this.lend.lendFrom],
      lendTo: [this.lend.lendTo],
      borrowerId: 0,
      bookId: 0,
      note: [this.lend.note]
    });

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.bookService.getByIdAndUserId(Number(this.bookId), Number(this.friendId)).subscribe({
            next: (b) => { 
              this.book = b;
            }
          });
        }
      })
    }
  }

  public cancel() {
    this.router.navigate(['/ausleihe']);
  }

  public onSubmit() {
    this.lendForm.value.borrowerId = this.user.id;
    this.lendForm.value.bookId = this.book.id;

    this.lend = this.lendForm.value;

    this.service.create(this.lend).subscribe({
      next: () => this.router.navigate(['/ausleihe'])
    });
  }
}
