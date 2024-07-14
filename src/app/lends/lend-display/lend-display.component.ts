import { Component, OnInit } from '@angular/core';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LendStatusEnum } from '../lendStatus.enum';
import { BookService } from 'src/app/books/book.service';
import { BookCategoryEnum } from 'src/app/books/book.enum';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-lend-display',
  templateUrl: './lend-display.component.html',
  styleUrls: ['./lend-display.component.scss']
})
export class LendDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public book: Book;

  public lendsOfUserAccepted: Lend[] = [];
  public lendsOfUserOpen: Lend[] = [];
  public lendsFromUserAccepted: Lend[] = [];
  public lendsFromUserOpen: Lend[] = [];

  constructor(
    private service: LendService,
    private loginService: LoginRegisterService,
    private userService: UserService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getAllLendsFromUserByUserId(this.user.id).subscribe({
            next: (data) => {
              data.forEach(element => {
                if (element.lendStatus == LendStatusEnum.REQUESTMADE) {
                  this.lendsFromUserOpen.push(element);
                }
                else if (element.lendStatus == LendStatusEnum.ACCEPTED || element.lendStatus == LendStatusEnum.CLOSED) {
                  this.lendsFromUserAccepted.push(element);
                }
              })

              this.service.getAllLendsOfUserByUserId(this.user.id).subscribe({
                next: (data) => {
                  data.forEach(element => {
                    if (element.lendStatus == LendStatusEnum.REQUESTMADE) {
                      this.lendsOfUserOpen.push(element);
                    }
                    else if (element.lendStatus == LendStatusEnum.ACCEPTED || element.lendStatus == LendStatusEnum.CLOSED) {
                      this.lendsOfUserAccepted.push(element);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }

  public btnDeleteClicked(element: Lend) {
    if (confirm("Möchtest du dies wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: () => {
          this.ngOnInit()
        }
      });
    }
  }

  public handedBack(element: Lend) {
    if (confirm("Wurde das Buch zurückgegeben?")) {
      this.service.deleteById(element.id).subscribe({
        next: () => {

          if (element.book != null) {

            this.bookService.getByIdAndUserId(element.book.id, element.book.userId).subscribe({
              next: (data) => {
                this.book = data;

                this.book.lendOut = false;

                this.bookService.update(this.book).subscribe({
                  next: () => {
                    this.ngOnInit()
                  }
                })
              }
            })
          }
        }
      });
    }
  }
}
