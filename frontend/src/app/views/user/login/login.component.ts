import {FormBuilder, Validators} from "@angular/forms";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../core/auth/auth.service";
import {Component} from '@angular/core';
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponseType} from "../../../../types/login-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected isShownPassword = false;
  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,) {
  }

  protected toggleShowPassword(): void {
    this.isShownPassword = !this.isShownPassword;
  }

  protected login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const response = data as LoginResponseType;
            if (!response.accessToken || !response.refreshToken || !response.userId) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(response.accessToken, response.refreshToken);
            this.authService.userId = response.userId;
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']).then();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        })
    }
  }
}
