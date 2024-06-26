import { Component, OnInit } from '@angular/core';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/books/book.service';
import { UserService } from 'src/app/users/user.service';
import { Book } from 'src/app/books/book.model';
import { User } from 'src/app/users/user.model';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';

@Component({
  selector: 'app-lend-display',
  templateUrl: './lend-display.component.html',
  styleUrls: ['./lend-display.component.scss']
})
export class LendDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public lends: Lend[];

  constructor(
    private service: LendService,
    private loginService: LoginRegisterService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getAllByUserId(this.user.id).subscribe({
            next: (data) => {
              this.lends = data;
            }
          })
        }
      })
    }
  }

  public btnDeleteClicked(element: Lend) {
    if (confirm("Möchtest du das Thema wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }
  }

}
