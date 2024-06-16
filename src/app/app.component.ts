import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './users/user.model';
import { Login } from './login/login.model';
import { LoginRegisterService } from './common/loginRegister.service';
import { LoggedInUser } from './login/loggedInUser.model';
import { UserService } from './users/user.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  public currentYear = new Date().getFullYear();
  public loginForm!: FormGroup;
  public login: Login = new Login("", "");
  public user: User;

  public loginWrong = false;

  public currentUser$: Observable<LoggedInUser | null> = of(null)

  constructor(private formbuilder: FormBuilder, private service: LoginRegisterService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [this.login.email],
      password: [this.login.password],
    })

    this.setCurrentUser();
    this.currentUser$ = this.service.currentUser$;

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

  public setCurrentUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);
    this.service.setCurrentUser(loggedInUser);
  }

  onSubmit() {
    this.login = this.loginForm.value;
    this.service.login(this.login).subscribe({
      next: (data) => {console.log(data)},
      error: (error) => {this.loginWrong = true}
    });
    ;
  }

  logout() {
    this.service.logout();
    this.login.email = "";
    this.login.password = "";
    this.loginWrong = false;

    this.ngOnInit();
  }
}
