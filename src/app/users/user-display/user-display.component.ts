import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {

  user: User;

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(Number(id)).subscribe({
      next: (u) => {
        this.user = u;
      }
    })
  }

  public btnDeleteClicked(user: User) {
    if (confirm("Möchtest du den Account wirklich löschen?")) {
      this.service.deleteById(user.id).subscribe({
        next: (data) => this.ngOnInit()
      });
    }
  }
}

