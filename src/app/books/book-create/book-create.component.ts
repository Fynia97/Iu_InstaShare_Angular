import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  public book: Book = new Book(0, "", "", "", "", new Date());
  public books: Book[] = [];
  public bookForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private service: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.bookForm = this.formbuilder.group({
      isbn: [this.book.isbn],
      title: [this.book.title],
      author: [this.book.author],
      publisher: [this.book.publisher],
      publishingYear: [this.book.publishingYear]
    })
  }

  public cancel()
  {
    this.router.navigate(['/buecher']);
  }
  
  public onSubmit() {
    this.book = this.bookForm.value;
    this.service.create(this.book).subscribe({
      next: (data) => this.router.navigate(['/buecher'])
    });
  }
}
