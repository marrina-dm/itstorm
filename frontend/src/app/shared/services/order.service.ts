import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {OrderRequestType} from "../../../types/order-request.type";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  public order(request: OrderRequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', request);
  }
}
