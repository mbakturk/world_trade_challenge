import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let logged = this.authservice.getUser();

    if (logged) {
      return true;
    }

    this.router.navigateByUrl("sign-in");
    return false;
  }
}
