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

  validateForm!: FormGroup;
  isLoading = false;
  error: string = null;
  authResponse: AuthResponseModel;

  constructor(private fb: FormBuilder,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.isLoading = true;
    this.authService
      .login(this.validateForm.value.username, this.validateForm.value.password).subscribe(
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
