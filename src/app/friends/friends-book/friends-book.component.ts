import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/books/book.model';
import { BookService } from 'src/app/books/book.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-friends-book',
  templateUrl: './friends-book.component.html',
  styleUrls: ['./friends-book.component.scss'],
  template: `<button (click)="sendData(bookId: Number)">Send Data</button>`
})

export class FriendsBookComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public friendId: string | null = "";
  public friend: User;

  public books: Book[] = [];
  public searchText: string;

  constructor(
    private service: BookService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.friendId = params.get('id')

      this.userService.getById(Number(this.friendId)).subscribe({
        next: (data) => {
          this.friend = data;

          this.service.getAllByUserId(Number(this.friendId)).subscribe({
            next: (data) => {
              this.books = data;
            }
          })
        }
      })
    })
  }

  sendData(bookId: Number) {
    const navigationExtras: NavigationExtras = {
      state: {
        friendId: this.friendId,
        bookId: bookId
      }
    };
    this.router.navigate(['/ausleihe/erstellen'], navigationExtras);
  }
}

