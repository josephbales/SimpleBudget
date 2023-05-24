import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService
      .isAuthenticated.pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            return true;
          }
          else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        })
      )
  }
}
