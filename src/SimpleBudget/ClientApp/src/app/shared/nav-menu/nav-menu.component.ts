import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  isExpanded: boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: SocialAuthService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.warn(user);
      this.user = user;
      this.loggedIn = (user != null);
    });
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
