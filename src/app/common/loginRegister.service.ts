import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoggedInUser } from '../login/loggedInUser.model';
import { Login } from '../login/login.model';
import { User } from '../users/user.model';
import { AppConfigService } from './appConfig.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  //um den currentUser in components aufzurufen, nutze this.loginService.currentUser$.pipe(take(1)).subscribe({next: (user) => this.loggedInUser = user})
  private currentUser = new BehaviorSubject<LoggedInUser | null>(null);
  private name = ""
  currentUser$ = this.currentUser.asObservable();

  constructor(protected client: HttpClient, private appConfigService: AppConfigService) {
    this.name = appConfigService.apiEndpoint + "Account/"
   }

  public login(login: Login)
  {
    return this.client.post<LoggedInUser>(this.name + "login", login).pipe(
      map((data: LoggedInUser) => {
        const user = data;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUser.next(user);
        }
      })
    )
  }

  public setCurrentUser(user: LoggedInUser)
  {
    this.currentUser.next(user);
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }

  public register(user: User): Observable<User> {
    return this.client.post<User>(this.name + 'register', user);
  }
}
