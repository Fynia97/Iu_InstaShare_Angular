import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  public user: User | undefined;
  public loggedInUser: LoggedInUser | null;

  public numberOfBooks: number;
  public numberOfLends: number;
  public numberOfLendsRequests: number;
  public nextLendFrom: Lend;

  constructor(private loginService: LoginRegisterService, private userService: UserService, private bookService: BookService, private lendService: LendService) { }

  ngOnInit(): void {
    this.currentUser$ = this.loginService.currentUser$;
    this.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    const localStorageValue = localStorage.getItem('currentUser');

    if (localStorageValue != null)
    {
    this.user = JSON.parse(localStorageValue) as User;
    
    this.CountBooks();
    this.NextLendFrom();
    this.GetNumberOfLends();
    this.GetNumberOfLendsRequests();
    }
  }

  public CountBooks() {
    if(this.user != null)
    {
      this.bookService.getAllByUserId(this.user.id).subscribe({
        next: (data) => {
          this.numberOfBooks = data.length;
        }
      })
    }
  }

  public NextLendFrom() {
    if(this.user != null){
      this.lendService.getNextLendFrom(this.user.id).subscribe({
        next: (data) => {
          this.nextLendFrom = data;
        }
      })
    }

  }

  private GetNumberOfLends() {
    if(this.user != null)
    {
      this.lendService.countLendsWithStatus(1, this.user.id).subscribe((count) => {
        this.numberOfLends = count;
      });
    }

  }

  private GetNumberOfLendsRequests() {
    if(this.user != null)
    {
      this.lendService.countLendsWithStatus(0, this.user.id).subscribe((count) => {
        this.numberOfLendsRequests = count;
      });
    }

  }
}