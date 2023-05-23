import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.authChanged.pipe(takeUntil(this._destroying$)).subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;

      if (isAuthenticated) {
        let returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      }
    });

    //this.loggedIn = this.userService.isAuthenticated;
  }

  logout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
