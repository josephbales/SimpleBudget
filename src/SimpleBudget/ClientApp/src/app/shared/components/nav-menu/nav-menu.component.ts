import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  //user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  isExpanded: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  userImgUrl: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.authChanged.pipe(takeUntil(this._destroying$)).subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.userImgUrl = this.authService.getUserPhotoUrl();
      }
    });
    this.loggedIn = this.authService.isUserAuthenticated();
    if (this.loggedIn) {
      this.userImgUrl = this.authService.getUserPhotoUrl(); // TODO: find out why this doesn't load image on refresh
    }
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
