import { Component, OnInit } from '@angular/core';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { User } from 'src/app/users/user.model';
import { BookService } from 'src/app/books/book.service';
import { UserService } from 'src/app/users/user.service';


@Component({
  selector: 'app-lend-create',
  templateUrl: './lend-create.component.html',
  styleUrls: ['./lend-create.component.scss']
})
export class LendCreateComponent implements OnInit {
  public lend: Lend;
  public lends: Lend[] = [];
  public lendForm!: FormGroup;

  public user: User;
  public book: Book;

  constructor(
    private formbuilder: FormBuilder,
    private service: LendService,
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getById(1).subscribe({
      next: (u) => {this.user = u;}});

    this.bookService.getById(1).subscribe({
      next: (b) => {this.book = b;}});

    this.lendForm = this.formbuilder.group({
      lendFrom: [this.lend.lendFrom],
      lendTo: [this.lend.lendTo],
      borrower: this.user,
      book: this.book,
      note: [this.lend.note]
    });
  }

  public cancel()
  {
    this.router.navigate(['/ausleihe']);
  }
  
  public onSubmit() {
    this.lendForm.value.borrower = this.user;
    this.lendForm.value.book = this.book;

    this.lend = this.lendForm.value;
    this.service.create(this.lend).subscribe({
      next: (data) => this.router.navigate(['/ausleihe'])
    });
  }
}
