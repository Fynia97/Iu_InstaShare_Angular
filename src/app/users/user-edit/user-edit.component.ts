import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  //TODO: E-Mail muss eindeutig sein

  public user!: User;
  public userForm!: FormGroup;  
  public emailValidated: Boolean = false;
  public passwordValidated: Boolean = false;
  public showPassword: Boolean = false;


  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(Number(id)).subscribe({
      next: (u) => {
        this.user = u;

        this.userForm = this.formbuilder.group({
          id: [this.user.id],
          firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [this.user.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[§/()=!@#$%^&.,]).{8,}')]],
      street: [this.user.street],
      zip: [this.user.zip],
      city: [this.user.city]
        })
      }
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

  public cancel()
  {
    this.router.navigate(['/user/' + this.user.id + '/anzeigen']);
  }

  public onSubmit() {
    this.user = this.userForm.value;
    this.service.update(this.user).subscribe({
      next: (data) => this.router.navigate(['/user/' + this.user.id + '/anzeigen'])
    });
  }
}
