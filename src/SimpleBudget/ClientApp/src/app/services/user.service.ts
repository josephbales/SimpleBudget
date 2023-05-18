import { SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { AuthRequestDto } from "../dtos/authRequestDto";
import { AuthResponseDto } from "../dtos/authResponseDto";
import { TokenModel } from "../models/token.model";
import { UserModel } from "../models/user.model";
import { TokenService } from "./token.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
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
        this.login({ provider: socialUser.provider, idToken: socialUser.idToken }).subscribe((appUser) => {
          if (appUser.isAuthenticated) {
            localStorage.setItem('token', appUser.token ?? "");
            localStorage.setItem('user', JSON.stringify(socialUser)); // TODO: oh my, please fix this so that user comes from backend
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

  setAuth(user: UserModel): void {
    this.tokenService.saveToken({ authToken: user.token, refreshToken: user.token }); //TODO: generate refresh tokens
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  purgeAuth(): void {
    this.tokenService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
