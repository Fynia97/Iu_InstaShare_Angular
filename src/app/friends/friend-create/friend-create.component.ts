import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { FriendService } from '../friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Friend } from '../friend.model';

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.scss']
})
export class FriendCreateComponent implements OnInit {
  public users: User[];
  public newFriend: Friend;
  public friendForm!: FormGroup;

  public user: User;
  public friend: User

  constructor(private formbuilder: FormBuilder, private userService: UserService, private service: FriendService, private router: Router,) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      }
    }),
/*
    this.userService.getById(2).subscribe({
      next: (data) => {
        this.user = data;
      }
    }),

    this.userService.getById(1).subscribe({
      next: (data) => {
        this.friend = data;
      }
    })
*/
    this.friendForm = this.formbuilder.group({
      userId: 3,
      friendId: 4,
      status: 0,
      user: null,
      friend: null,
    })
  }

  public onSubmit() {
    this.friendForm.value.user = this.user;
    this.friendForm.value.friend = this.friend;
    this.newFriend = this.friendForm.value;
    this.service.create(this.newFriend).subscribe({
      next: () => this.router.navigate(['/freunde'])
    });
  }
}
