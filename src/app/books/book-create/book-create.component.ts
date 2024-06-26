import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { User } from 'src/app/users/user.model';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { UserService } from 'src/app/users/user.service';
import { BookCategoryEnum } from '../book.enum';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  public categoryForDropdown: any;
    
  public book = new Book();
  public books: Book[] = [];
  public bookForm!: FormGroup;

  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  constructor(
    private formbuilder: FormBuilder,
    private service: BookService,
    private router: Router,
    private userService: UserService,
    private loginService: LoginRegisterService
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if(this.loggedInUser != null)
      {
        this.userService.getByEmail(this.loggedInUser.email).subscribe({
          next: (u) => {
            this.user = u;
          }
        })
      }

    this.bookForm = this.formbuilder.group({
      isbn: [this.book.isbn],
      title: [this.book.title],
      author: [this.book.author],
      publisher: [this.book.publisher],
      publishingYear: [this.book.publishingYear],
      lendOut: [this.book.lendOut],
      category: [this.book.category],
      userId: [this.book.userId]
    })

    this.categoryForDropdown = Object.keys(BookCategoryEnum).map(key => ({
     label: BookCategoryEnum[key as keyof typeof BookCategoryEnum],
     value: key
     }));
  }

  public cancel()
  {
    this.router.navigate(['/buecher']);
  }
  
  public onSubmit() {
    if(this.bookForm.value.category == "Sonstiges")
      {
        this.bookForm.value.category = "OTHER";
      }
    this.book = this.bookForm.value;
    this.book.userId = this.user.id;
    this.service.create(this.book).subscribe({
      next: (data) => this.router.navigate(['/buecher'])
    });
  }
}
