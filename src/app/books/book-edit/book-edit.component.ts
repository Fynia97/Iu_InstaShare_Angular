import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { DatePipe, formatDate } from '@angular/common';
import { BookCategoryEnum } from '../book.enum';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public categoryForDropdown: any;

  public book!: Book;
  public bookForm!: FormGroup;
  public year: String;

  public publishingYearWithoutTime: any;

  constructor(
    private formbuilder: FormBuilder,
    private service: BookService,
    private userService: UserService,
    private loginService: LoginRegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const localStorageCurrentUser = localStorage.getItem('currentUser');
    const localStorageUser = localStorage.getItem('user');

    if (localStorageUser != null && localStorageCurrentUser != null) {
      this.loggedInUser = JSON.parse(localStorageUser) as LoggedInUser;
      this.user = JSON.parse(localStorageCurrentUser) as User;

      this.service.getByIdAndUserId(Number(id), this.user.id).subscribe({
        next: (b) => {
          this.book = b;

          this.categoryForDropdown = Object.keys(BookCategoryEnum).map(key => ({
            label: BookCategoryEnum[key as keyof typeof BookCategoryEnum],
            value: key
          }));

          this.bookForm = this.formbuilder.group({
            id: [this.book.id],
            isbn: [this.book.isbn],
            title: [this.book.title],
            author: [this.book.author],
            publisher: [this.book.publisher],
            publishingYear: [formatDate(this.book.publishingYear, 'yyyy-MM-dd', 'en')],
            lendOut: [this.book.lendOut],
            category: [this.book.category],
            userId: this.user.id
          })
        }
      })
    }
  }

  public cancel() {
    this.router.navigate(['/buecher']);
  }

  public onSubmit() {
    this.book = this.bookForm.value;
    this.service.update(this.book).subscribe({
      next: (data) => this.router.navigate(['/buecher'])
    });
  }

}
