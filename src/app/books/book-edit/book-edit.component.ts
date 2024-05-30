import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public book!: Book;
  public bookForm!: FormGroup;
  public year: String;

  constructor(
    private formbuilder: FormBuilder,
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(Number(id)).subscribe({
      next: (b) => {
        this.book = b;

        this.bookForm = this.formbuilder.group({
          id: [this.book.id],
          isbn: [this.book.isbn],
          title: [this.book.title],
          author: [this.book.author],
          publisher: [this.book.publisher],
          publishingYear: [this.book.publishingYear],
          lendOut: [this.book.lendOut]
        });
      }
    });
  }

  public cancel()
  {
    this.router.navigate(['/buecher']);
  }

  public onSubmit() {
    this.book = this.bookForm.value;
    this.service.update(this.book).subscribe({
      next: (data) => this.router.navigate(['/buecher'])
    });
  }

}
