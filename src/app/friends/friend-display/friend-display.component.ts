import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '../friend.model';
import { FriendService } from '../friend.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-friend-display',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.scss']
})
export class FriendDisplayComponent implements OnInit {
  public friends: Friend[];

  constructor(private service: FriendService, private userService: UserService) { }


  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.friends = data;

        this.friends.forEach((element: Friend) => {
          this.userService.getById(element.friendId).subscribe({
          next: (f) => {
          element.friend = f;
          }
          });
          });

      }
    })
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
