import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { ExternalAuthDto } from '../../../models/externalAuthDto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
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
    this.authService.authChanged.subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;
    });
  }

  //externalLogin = () => {
  //  this.showError = false;
  //  this.authService.signInWithGoogle();

  //  this.authService.extAuthChanged.subscribe(user => {
  //    const externalAuth: ExternalAuthDto = {
  //      provider: user.provider,
  //      idToken: user.idToken
  //    }

  //    this.validateExternalAuth(externalAuth);
  //  })
  //}

  public logout = () => {
    debugger;
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

  //private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //  this.authService.externalLogin(externalAuth)
  //    .subscribe({
  //      next: (res) => {
  //        localStorage.setItem("token", res.token);
  //        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //        this.router.navigate([this.returnUrl]);
  //      },
  //      error: (err: HttpErrorResponse) => {
  //        this.errorMessage = err.message;
  //        this.showError = true;
  //        this.authService.signOutExternal();
  //      }
  //    });
  //}
}
