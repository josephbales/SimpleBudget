import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.authChanged.subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
