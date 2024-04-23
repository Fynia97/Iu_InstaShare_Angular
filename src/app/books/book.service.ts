import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService extends AbstractService<Book> {
  protected name = "Book"
}
