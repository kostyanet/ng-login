import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  isLoading: boolean;
  loginForm: FormGroup;

  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['User', Validators.required],
      password: ['Pass', Validators.required],
      keepLogged: false
    });

    this.authService.clearUserData();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    const { keepLogged, login, password } = this.loginForm.value;

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login({ login, password }, keepLogged, this.returnUrl)
      .catch((err: string) => {
        this.isLoading = false;
        this.errorMessage = err;
      });
  }

}
