import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggedInUser } from '../login/loggedInUser.model';
import { LoginService } from '../login/login.service';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { BookService } from '../books/book.service';
import { LendService } from '../lends/lend.service';
import { Lend } from '../lends/lend.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public numberOfBooks: number;
  public numberOfLends: number;
  public numberOfLendsRequests: number;
  public nextLendFrom: Lend;

  constructor(private loginService: LoginService, private userService: UserService, private bookService: BookService, private lendService: LendService) { }

  ngOnInit(): void {
    this.currentUser$ = this.loginService.currentUser$;

    this.SetUser();
    this.CountBooks();
    this.CountLends();
    this.NextLendFrom();
    this.GetNumberOfLends();
    this.GetNumberOfLendsRequests();
  }

  public SetUser() {
    this.currentUser$.subscribe((loggedInUser: LoggedInUser | null) => {
      if (loggedInUser) {
        this.userService.getByEmail(loggedInUser.email).subscribe({
          next: (data) => {
            this.user = data;
          }
        });
      }
    });
  }

  public CountBooks() {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.numberOfBooks = data.length;
      }
    })
  }

  public CountLends() {
    this.lendService.getAll().subscribe({
      next: (data) => {
        this.numberOfLends = data.length;
      }
    })
  }

  public NextLendFrom() {
    this.lendService.getNextLendFrom().subscribe({
      next: (data) => {
        this.nextLendFrom = data;
      }
    })
  }

  private GetNumberOfLends() {
    this.lendService.countLendsWithStatus(0).subscribe((count) => {
    this.numberOfLends = count;
    });
    }
    
    private GetNumberOfLendsRequests() {
    this.lendService.countLendsWithStatus(4).subscribe((count) => {
    this.numberOfLendsRequests = count;
    });
    }
}