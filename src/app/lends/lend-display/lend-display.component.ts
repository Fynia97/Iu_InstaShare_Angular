import { Component, OnInit } from '@angular/core';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/books/book.service';
import { UserService } from 'src/app/users/user.service';
import { Book } from 'src/app/books/book.model';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-lend-display',
  templateUrl: './lend-display.component.html',
  styleUrls: ['./lend-display.component.scss']
})
export class LendDisplayComponent implements OnInit {
  public lends: Lend[];

  constructor(
    private service: LendService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.lends = data;
      }
    })
  }

  public btnDeleteClicked(element: Lend) {
    if (confirm("Möchtest du das Thema wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }
  }

}
