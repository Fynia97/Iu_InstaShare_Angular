import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  public books: Book[];

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.books = data;
      }
    })
  }

}
