import { SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject, distinctUntilChanged, map, Subject } from "rxjs";
import { AuthRequestDto } from "../dtos/authRequestDto";
import { AuthResponseDto } from "../dtos/authResponseDto";
import { TokenModel } from "../models/token.model";
import { UserModel } from "../models/user.model";
import { TokenService } from "./token.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
    private tokenService: TokenService,
    private readonly router: Router
  ) {
      this.socialAuthService.authState.subscribe((socialUser) => {
        this.login({ provider: 0, idToken: socialUser.idToken }).subscribe((appUser) => {
          if (appUser) {
            this.setAuth(appUser);
            this.authChangeSub.next(true);
          }
          else {
            console.error('User is not authenticated.');
          }
        });
      });
    }

  login(authRequest: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>('api/auth/login', authRequest);
  }

  setAuth(authResponse: AuthResponseDto): void {
    const user = authResponse as UserModel;
    this.setUser(user);
    this.tokenService.saveToken({ authToken: user.authToken, refreshToken: user.refreshToken }); //TODO: generate refresh tokens
    this.currentUserSubject.next(user);
  }

  setUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  purgeAuth(): void {
    this.tokenService.destroyToken();
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
