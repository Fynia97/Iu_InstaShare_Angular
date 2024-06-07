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
  
  public books: Book[] = [
    new Book(1, '123', 'Buch 1', 'Springer', 'Autor 1', new Date('2020-01-01'), false),
    new Book(2, '456', 'Buch 2', 'O\'Reilly', 'Autor 2', new Date('2019-06-15'), true),
    new Book(3, '789', 'Buch 3', 'Penguin', 'Autor 3', new Date('2018-08-23'), false),
    new Book(4, '012', 'Buch 4', 'Random House', 'Autor 4', new Date('2021-03-10'), true)
  ];
  constructor(private service: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   /* this.service.getAll().subscribe({
      next: (data) => {
        this.books = data;
      }
    })*/
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
