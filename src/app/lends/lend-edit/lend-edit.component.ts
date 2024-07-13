import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { Book } from 'src/app/books/book.model';
import { BookService } from 'src/app/books/book.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';

@Component({
  selector: 'app-lend-edit',
  templateUrl: './lend-edit.component.html',
  styleUrls: ['./lend-edit.component.scss']
})
export class LendEditComponent  implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public lend = new Lend();
  public lends: Lend[] = [];
  public lendForm!: FormGroup;

  public book: Book;

  constructor(
    private formbuilder: FormBuilder,
    private service: LendService,
    private bookService: BookService,
    private loginService: LoginRegisterService,
    private userService: UserService,
    private router: Router
  ) { }

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

          this.bookService.getByIdAndUserId(17, 8).subscribe({
            next: (b) => { this.book = b; }
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
