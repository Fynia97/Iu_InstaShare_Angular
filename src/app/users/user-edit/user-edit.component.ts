import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { Observable, of, take } from 'rxjs';
import { LoggedInUser } from 'src/app/login/loggedInUser.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public currentUser$: Observable<LoggedInUser | null> = of(null);
  public loggedInUser: LoggedInUser | null;

  public user!: User;
  public userForm!: FormGroup;
  public emailValidated: Boolean = false;
  public passwordValidated: Boolean = false;
  public showPassword: Boolean = false;


  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private loginService: LoginRegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser$.pipe(take(1)).subscribe({ next: (u) => this.loggedInUser = u })

    if (this.loggedInUser != null) {
      this.service.getByEmail(this.loggedInUser.email).subscribe({
        next: (u) => {
          this.user = u;

          this.service.getById(Number(this.user.id)).subscribe({
            next: (u) => {
              this.user = u; 
            }
          })

          this.userForm = this.formbuilder.group({
            id: [this.user.id],
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            email: [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            password: [this.user.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[§/()=!@#$%^&.,]).{8,}')]],
            street: [this.user.street],
            zip: [this.user.zip],
            city: [this.user.city],
            phoneNumber: [this.user.phoneNumber]
          })
        }
      })
    }
  }

  public changeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  public emailValidate(): void {
    this.emailValidated = true;
  }
  public passwordValidate(): void {
    this.passwordValidated = true;
  }

  public cancel() {
    this.router.navigate(['/user/anzeigen']);
  }

  public onSubmit() {
    this.user = this.userForm.value;
    this.service.update(this.user).subscribe({
      next: (data) => this.router.navigate(['/user/anzeigen'])
    });
  }
}
