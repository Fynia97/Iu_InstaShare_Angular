import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;
  public deleted: Boolean = false;

  constructor(
    private service: UserService,
    private loginService: LoginRegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
        const localStorageCurrentUser = localStorage.getItem('currentUser');
    const localStorageUser = localStorage.getItem('user');

    if (localStorageUser != null && localStorageCurrentUser != null) {
      this.loggedInUser = JSON.parse(localStorageUser) as LoggedInUser;    
      
      if (this.loggedInUser != null) {
        this.service.getByEmail(this.loggedInUser.email).subscribe({
          next: (u) => {
            this.user = u;
          }
        })
      }
    }
  }

  public btnDeleteClicked(user: User) {
    if (confirm("Möchtest du den Account wirklich löschen?")) {
      this.service.deleteById(user.id).subscribe({
        next: (data) => 
          this.deleted = true
      });
    }
  }
}