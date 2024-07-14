import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { Book } from 'src/app/books/book.model';
import { BookService } from 'src/app/books/book.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { Lend } from '../lend.model';
import { LendService } from '../lend.service';
import { LendStatusEnum } from '../lendStatus.enum';

@Component({
  selector: 'app-lend-edit',
  templateUrl: './lend-edit.component.html',
  styleUrls: ['./lend-edit.component.scss']
})
export class LendEditComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public user: User;
  public loggedInUser: LoggedInUser | null;

  public lend = new Lend();
  public lends: Lend[] = [];
  public lendForm!: FormGroup;
  public lendId: string | null;

  public book: Book;

  public userIsBorrower: Boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private service: LendService,
    private bookService: BookService,
    private loginService: LoginRegisterService,
    private userService: UserService,
    private lendService: LendService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.userService.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.route.paramMap.subscribe(params => {
            this.lendId = params.get('id');

            this.lendService.getByIdAndUserId(Number(this.lendId), this.user.id).subscribe({
              next: (l) => {
                this.lend = l;
                if (this.lend.borrowerId == this.user.id) {
                  this.userIsBorrower = true;
                }
                
                this.bookService.getByIdAndUserId(this.lend.bookId, Number(this.lend.book?.userId)).subscribe({
                  next: (b) => {
                    this.book = b;
                  }
                })
              }
            })
          })
        }
      })
    }
    this.lendForm = this.formbuilder.group({
      id: [this.lend.id],
      lendFrom: [this.lend.lendFrom],
      lendTo: [this.lend.lendTo],
      borrowerId: 0,
      bookId: 0,
      note: [this.lend.note],
      lendStatus: [this.lend.lendStatus]
    });
  }


  public cancel() {
    this.router.navigate(['/ausleihe']);
  }

  public onSubmit() {
    this.lendForm.value.borrowerId = this.user.id;
    this.lendForm.value.bookId = this.book.id;

    this.lend = this.lendForm.value;

    console.log(this.lend)

    this.service.update(this.lend).subscribe({
      next: () => this.router.navigate(['/ausleihe'])
    });
  }

  public deleteLend() {
    if (confirm("Möchtest du das Thema wirklich tun?")) {
      this.service.deleteById(this.lend.id).subscribe({
        next: () => {
          this.router.navigate(['/ausleihe'])
        }
      });
    }
  }

  public acceptLend() {
    this.lend.lendStatus = LendStatusEnum.ACCEPTED;
    this.book.lendOut = true;

    this.service.update(this.lend).subscribe({
      next: () => { 
        
        this.bookService.update(this.book).subscribe({
          next: () => { 
            this.router.navigate(['/ausleihe']) 
          }
        });
      }
    });
  }
}
