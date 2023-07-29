import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'sb-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit, OnDestroy {
  private returnUrl: string = "";

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  isExpanded: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.authChanged.pipe(takeUntil(this._destroying$)).subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;
    });
    this.loggedIn = this.authService.isUserAuthenticated();
  }

  login(): void {
    const existingReturnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];
    const returnUrl = existingReturnUrl ? existingReturnUrl : this.router.routerState.snapshot.url;
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }

  public logout = () => {
    this.authService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
