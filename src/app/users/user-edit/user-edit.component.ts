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
  public passwordValidated: Boolean = false;
  public showNewPassword: Boolean = false;
  public showConfirmPassword: Boolean = false;

  public newPassword: string = "";
  public confirmPassword: string = "";
  public passwordMatch: Boolean = true;

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
            email: [this.user.email],
            password: [this.user.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[§/()=!@#$%^&.,]).{8,}')]],
            street: [this.user.street],
            zip: [this.user.zip],
            city: [this.user.city],
            phoneNumber: [this.user.phoneNumber],
            newPassword: [this.newPassword, [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[§/()=!@#$%^&.,]).{8,}')]],
            confirmPassword: [this.confirmPassword]
          },
            { validator: this.passwordMatchValidator }
          );
        }
      })
    }
  }

  public validatePasswordMatch() {
    if (this.userForm.value.confirmPassword != "" && this.userForm.value.newPassword != "") {
      this.userForm.value.newPassword == this.userForm.value.confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
    }
  }

  public passwordMatchValidator(fg: FormGroup): { [key: string]: any } | null {
    const newPasswordControl = fg.get('newPassword');
    const confirmPasswordControl = fg.get('confirmPassword');

    if (!newPasswordControl) {
      return null;
    }

    if (newPasswordControl && confirmPasswordControl) {
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return newPassword === confirmPassword ? null : { 'mismatch': true };
    }

    return null;
  }

  public changeShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  public changeShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  public passwordValidate(): void {
    this.passwordValidated = true;
  }

  public cancel() {
    this.router.navigate(['/user/anzeigen']);
  }

  public onSubmit() {
    if (this.userForm.value.confirmPassword != "" && this.userForm.value.newPassword != "") {
      this.userForm.value.password = this.userForm.value.newPassword;
    }
    this.user = this.userForm.value;
    this.service.update(this.user).subscribe({
      next: (data) => this.router.navigate(['/user/anzeigen'])
    });
  }
}
