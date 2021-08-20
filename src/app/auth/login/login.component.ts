import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {AuthResponseModel} from '../../models/auth-response.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  error: string = null;
  authResponse: AuthResponseModel;

  constructor(private fb: FormBuilder,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }

    this.isLoading = true;
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
  }

  afterClose(): void {
    this.error = null;
  }
}
