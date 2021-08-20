import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {UserSaveModel} from '../../models/user-save.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  error = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.authService.signup(new UserSaveModel(this.signupForm.value.email,
      this.signupForm.value.name, this.signupForm.value.password)).subscribe(
      response => {
        this.router.navigate(['/login/SUCCESS']);
        this.signupForm.reset();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = error;
        console.log(error);
      }
    );
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.signupForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.signupForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  afterClose(): void {
    this.error = null;
  }
}
