import {AuthService} from "./auth.service";
import {CanActivateFn} from '@angular/router';
import {Location} from "@angular/common";
import {inject} from "@angular/core";


export const authForwardGuard: CanActivateFn = () => {
  if (inject(AuthService).getIsLoggedIn()) {
    inject(Location).back();
    return false;
  }
  return true;
};
