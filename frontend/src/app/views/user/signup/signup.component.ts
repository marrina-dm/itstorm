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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  protected isShownPassword = false;
  protected signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-Я][а-я]+\s*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    agree: [false, [Validators.requiredTrue]]
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

  protected signup(): void {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.agree) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const response = data as LoginResponseType;
            if (!response.accessToken || !response.refreshToken || !response.userId) {
              error = 'Ошибка регистрации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(response.accessToken, response.refreshToken);
            this.authService.userId = response.userId;
            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/']).then();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          }
        })
    }
  }
}
