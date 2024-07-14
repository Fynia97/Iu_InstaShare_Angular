import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from '../login/loggedInUser.model';
import { LoginRegisterService } from '../common/loginRegister.service';
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
  public loggedInUser: LoggedInUser | null;

  public numberOfBooks: number;
  public numberOfLends: number;
  public numberOfLendsRequests: number;
  public nextLendFrom: Lend;

  constructor(private loginService: LoginRegisterService, private userService: UserService, private bookService: BookService, private lendService: LendService) { }

  ngOnInit(): void {
    this.currentUser$ = this.loginService.currentUser$;

    this.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.SetUser();
          this.CountBooks();
          this.NextLendFrom();
          this.GetNumberOfLends();
          this.GetNumberOfLendsRequests();
        }
      })
    }
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
    this.bookService.getAllByUserId(this.user.id).subscribe({
      next: (data) => {
        this.numberOfBooks = data.length;
      }
    })
  }

  public NextLendFrom() {
    this.lendService.getNextLendFrom(this.user.id).subscribe({
      next: (data) => {
        this.nextLendFrom = data;
      }
    })
  }

  private GetNumberOfLends() {
    this.lendService.countLendsWithStatus(1, this.user.id).subscribe((count) => {
      this.numberOfLends = count;
    });
  }

  private GetNumberOfLendsRequests() {
    this.lendService.countLendsWithStatus(0, this.user.id).subscribe((count) => {
      this.numberOfLendsRequests = count;
    });
  }
}