import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      keepLogged: [false]
    });

    // this.authService.hideSpinner();
  }

  onSubmit(): void {
    const value = this.loginForm.value;

    const creds = {
      username: value.username,
      password: value.password
    };

    // this.authService.login(creds, value.keepLogged);
  }

}
