import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '../friend.model';
import { FriendService } from '../friend.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Observable, of, take } from 'rxjs';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { FriendStatusEnum } from '../friend.enum';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-friend-display',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.scss']
})
export class FriendDisplayComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public friends: Friend[] = [];
  public friendsAsked: Friend[] = [];
  public friendsAccepted: Friend[] = [];
  public friendsAskedForMe: Friend[] = [];

  public newFriend = new Friend();
  public friendForm!: FormGroup;

  constructor(private formbuilder: FormBuilder,
    private service: FriendService,
    private userService: UserService,
    private loginService: LoginRegisterService) { }



  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })
    
    this.friendForm = this.formbuilder.group({
      userId: 0,
      friendId: 0,
      status: 1
    })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getAllFriendsByUserId(this.user.id).subscribe({
            next: (data) => {
              this.friends = data;

              this.friends.forEach(element => {
                this.userService.getById(element.friendId).subscribe({
                  next: (data) => element.friend = data
                })

                this.userService.getById(element.userId).subscribe({
                  next: (data) => element.user = data
                })

                if (element.status.toString() == "ASKED") {
                  this.friendsAsked.push(element);
                }
                else if (element.status.toString() == "ACCEPTED") {
                  this.friendsAccepted.push(element);
                }
              });
            }
          })

          this.service.getAllFriendsAskedForMe(this.user.id).subscribe({
            next: (data) => {
              this.friendsAskedForMe = data;

              this.friendsAskedForMe.forEach(element => {
                this.userService.getById(element.friendId).subscribe({
                  next: (data) => element.friend = data
                })

                this.userService.getById(element.userId).subscribe({
                  next: (data) => element.user = data
                })
              })
            }
          })
        }
      })
    }
  }

  public btnAcceptedClicked(friend: Friend) {
    friend.status = FriendStatusEnum.ACCEPTED

    this.service.update(friend).subscribe({
      next: () => {

        this.friendForm.value.friendId = friend.userId;
        this.friendForm.value.userId = friend.friendId;

        this.newFriend = this.friendForm.value;

        this.service.create(this.newFriend).subscribe({
          next: () => {
            this.ngOnInit()
          }
        });
      }
    });
  }

  public btnDeleteClicked(element: Friend) {
    if (confirm("Möchten Sie dies wirklich?")) {
      this.service.deleteByFriendIdAndUserId(element.friendId, element.userId).subscribe({
        next: (data) => {
          this.ngOnInit();
          window.location.reload();
        }
      });
    }
  }
}
