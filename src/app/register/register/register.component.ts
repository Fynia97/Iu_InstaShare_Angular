import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/common/loginRegister.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();
  public registerForm!: FormGroup;
  public emailValidated: Boolean = false;
  public passwordValidated: Boolean = false;
  public showPassword: Boolean = false;


  constructor(
    private formbuilder: FormBuilder,
    private service: LoginRegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      id: [this.user.id],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [this.user.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[§/()=!@#$%^&.,]).{8,}')]],
    })
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
    this.router.navigate(['/']);
  }

  public onSubmit() {
    if(this.registerForm.value.firstName.includes("_iu"))
    {
      this.user = this.registerForm.value;
      this.service.register(this.user).subscribe({
        next: (data) => this.router.navigate(['/'])
      });
    }
  }
}
