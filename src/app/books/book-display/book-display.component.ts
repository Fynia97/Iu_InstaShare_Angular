import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  public books: Book[];

  constructor(private service: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.books = data;
      }
    })
  }

  public btnDeleteClicked(element: Book) {
    if (confirm("Möchtest du das Thema wirklich löschen?")) {
      this.service.deleteById(element.id).subscribe({
        next: (data) => {
          this.ngOnInit()
        }
      });
    }
  }

}
