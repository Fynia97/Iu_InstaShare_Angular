import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public books: Book[];
  public filteredBooks: Book[];
  public searchText: string;

  constructor(private service: BookService,
    private userService: UserService,
    private loginService: LoginRegisterService) { }

  ngOnInit(): void {
    const localStorageCurrentUser = localStorage.getItem('currentUser');
    const localStorageUser = localStorage.getItem('user');

    if (localStorageUser != null && localStorageCurrentUser != null) {
      this.loggedInUser = JSON.parse(localStorageUser) as LoggedInUser;
        this.user = JSON.parse(localStorageCurrentUser) as User;
  
        this.service.getAllByUserId(this.user.id).subscribe({
          next: (data) => {
            this.books = data;
            this.filteredBooks = data;
          }
        })
      }
    }

  protected onBooksSearched() {
    if (this.searchText === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(books => {
        const searchTerm = this.searchText.trim();

        return books.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || books.author.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  public btnDeleteClicked(element: Book) {
    if (confirm("Möchtest du das Thema wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }
  }

}
