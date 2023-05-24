import { SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, BehaviorSubject, distinctUntilChanged, map, Subject } from "rxjs";
import { AuthRequestDto } from "../dtos/authRequestDto";
import { AuthResponseDto } from "../dtos/authResponseDto";
import { UserModel } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => this.isUserAuthenticated(user)));

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
    private readonly router: Router
  ) {
      this.socialAuthService.authState.subscribe((socialUser) => {
        this.login({ provider: 0, idToken: socialUser.idToken }).subscribe((appUser) => {
          if (appUser) {
            this.setAuth(appUser);
          }
          else {
            // TODO: show an error on the screen and remove alert
            alert('User auth did not complete correctly');
            console.error('User is not authenticated.');
          }
        });
      });
    }

  login(authRequest: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>('api/auth/login', authRequest);
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  private setAuth(authResponse: AuthResponseDto): void {
    const user = authResponse as UserModel;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getUser(): UserModel | null {
    const userJson: string | null = localStorage.getItem('user');
    if (userJson !== null) {
      try {
        return JSON.parse(userJson) as UserModel;
      } catch (e) {
        console.error(e);
        this.logout();
      }
    }
    return null;
  }

  private purgeAuth(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private isUserAuthenticated(user: UserModel | null): boolean {
    if (!!user) {
      const user = this.getUser();

      if (user === null) return false;

      return this.tokensAreValid(user);
    }
    return false;
  }

  private tokensAreValid(user: UserModel): boolean {
        // TODO: validate tokens
    // if the authToken is valid, return true
    // if the authToken is NOT valid, but refresh IS valid, get new auth token
    // if both tokens are NOT valid, redirect to login
    console.log('tokensAreValid', user);
    if (!this.jwtHelper.isTokenExpired(user.authToken))
      return true;

    if (!this.jwtHelper.isTokenExpired(user.refreshToken)) {
      // attempt to get new auth token
      // set auth
      // return
      return true;
    }

    return false;

  }
}
