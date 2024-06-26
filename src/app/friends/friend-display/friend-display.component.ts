import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '../friend.model';
import { FriendService } from '../friend.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';

@Component({
  selector: 'app-friend-display',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.scss']
})
export class FriendDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public friends: Friend[];

  constructor(private service: FriendService,
    private userService: UserService,
    private loginService: LoginRegisterService) { }


  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getAllByUserId(this.user.id).subscribe({
            next: (data) => {
              this.friends = data;

              this.friends.forEach((element: Friend) => {
                this.userService.getById(element.friendId).subscribe({
                  next: (f) => {
                    element.friend = f;
                  }
                })
              })
            }
          })
        }
      })
    }
  }

  public btnDeleteClicked(element: Friend) {
    if (confirm("Möchtest du den Freund wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }
  }

}
