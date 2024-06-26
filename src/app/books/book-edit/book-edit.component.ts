import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { formatDate } from '@angular/common';
import { BookCategoryEnum } from '../book.enum';
import { IdService } from 'src/app/common/id.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public categoryForDropdown: any;
  public id: number;
    
  public book!: Book;
  public bookForm!: FormGroup;
  public year: String;

  constructor(
    private formbuilder: FormBuilder,
    private service: BookService,
    private router: Router,
    private idService: IdService
  ) { }

  ngOnInit(): void {
    this.idService.getData().subscribe({
      next: (id) => {
        this.id = id;
      }
    })

    this.service.getById(this.id).subscribe({
      next: (b) => {
        this.book = b;

        this.categoryForDropdown = Object.keys(BookCategoryEnum).map(key => ({
          label: BookCategoryEnum[key as keyof typeof BookCategoryEnum],
          value: key
          }));

        this.bookForm = this.formbuilder.group({
          id: [this.book.id],
          isbn: [this.book.isbn],
          title: [this.book.title],
          author: [this.book.author],
          publisher: [this.book.publisher],
          publishingYear: [this.book.publishingYear],
          lendOut: [this.book.lendOut],
          category: [this.categoryForDropdown[this.book.category].value]
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
