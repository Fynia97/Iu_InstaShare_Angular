import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  constructor(
    private service: UserService,
    private loginService: LoginRegisterService
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if(this.loggedInUser != null)
      {
        this.service.getByEmail(this.loggedInUser.email).subscribe({
          next: (u) => {
            this.user = u;
          }
        })
      }
  }

  public btnDeleteClicked(user: User) {
    if (confirm("Möchtest du den Account wirklich löschen?")) {
      this.service.deleteById(user.id).subscribe({
        next: (data) => this.ngOnInit()
      });
    }
  }
}
