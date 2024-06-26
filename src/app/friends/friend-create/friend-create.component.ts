import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { FriendService } from '../friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Friend } from '../friend.model';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.scss']
})
export class FriendCreateComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public possibleFriends: User[];
  public newFriend: Friend;
  public friendForm!: FormGroup;

  public friend: User

  constructor(private formbuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginRegisterService, private service: FriendService, private router: Router,) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    this.friendForm = this.formbuilder.group({
      userId: 0,
      friendId: 0,
      status: 0
    })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getAllPossibleFriends(this.user.id).subscribe({
            next: (data) => {
              this.possibleFriends = data;
            }
          })
        }
      })
    }
  }

  public onSubmit(id: number) {
    this.friendForm.value.userId = this.user.id;
    this.friendForm.value.friendId = id;
    this.newFriend = this.friendForm.value;

    this.service.create(this.newFriend).subscribe({
      next: () => this.router.navigate(['/freunde'])
    });
  }
}
