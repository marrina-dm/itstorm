import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfoResponseType} from "../../../../types/user-info-response.type";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected userName = '';
  protected isLogged = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router,) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.setUserInfo();
  }

  public ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
      this.setUserInfo();
    });
  }

  protected logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  private doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']).then();
  }

  private setUserInfo(): void {
    if (this.isLogged) {
      this.userService.getUserInfo()
        .subscribe({
          next: (data: UserInfoResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const response = data as UserInfoResponseType;
            if (!response.id || !response.email || !response.name) {
              error = 'Ошибка получения информации о пользователе';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.userName = (data as UserInfoResponseType).name;
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка получения информации о пользователе');
            }
          }
        });
    }
  }
}
