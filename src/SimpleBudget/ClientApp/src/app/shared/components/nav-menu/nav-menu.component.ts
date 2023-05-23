import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  isExpanded: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.authChanged.pipe(takeUntil(this._destroying$)).subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated;
    });
  }

  login(): void {
    const existingReturnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];
    const returnUrl = existingReturnUrl ? existingReturnUrl : this.router.routerState.snapshot.url;
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }

  public logout = () => {
    this.userService.logout();
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
