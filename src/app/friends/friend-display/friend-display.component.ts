import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-friend-display',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.scss']
})
export class FriendDisplayComponent implements OnInit {
  public friends: User[];

  constructor(private service: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.friends = data;
      }
    })
  }

  public btnDeleteClicked(element: User) {
    /*if (confirm("Möchtest du den Freund wirklich löschen?")) {
      this.service.deleteFriendById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }*/
  }

}
