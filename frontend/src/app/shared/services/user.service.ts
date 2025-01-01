import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserInfoResponseType} from "../../../types/user-info-response.type";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public getUserInfo(): Observable<DefaultResponseType | UserInfoResponseType> {
    return this.http.get<DefaultResponseType | UserInfoResponseType>(environment.api + 'users');
  }
}
