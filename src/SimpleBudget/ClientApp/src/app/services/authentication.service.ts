import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExternalAuthDto} from '../models/externalAuthDto';
import { AuthResponseDto } from '../models/authResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  //private extAuthChangeSub = new Subject<SocialUser>();
  //public isLoggedIn = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  //public extAuthChanged = this.extAuthChangeSub.asObservable();
  public isLoggedIn = new ReplaySubject<boolean>(1);
  //public isExternalAuth: boolean = false;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      let appToken = this.externalLogin({ provider: 'Google', idToken: user.idToken });
      //this.extAuthChangeSub.next(user);
      //this.isExternalAuth = true;
      //this.isLoggedIn.next(user != null);
      localStorage.setItem("token", appToken);
      this.authChangeSub.next(true);
    })
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = (): boolean => {
    const token: string = localStorage.getItem("token") ?? "";
    return token !== "" && !this.jwtHelper.isTokenExpired(token);
  }

  public signOutExternal = () => {
    this.socialAuthService.signOut();
  }

  public externalLogin = (body: ExternalAuthDto): string => {
    return 'abc123';
    //return this.http.post<AuthResponseDto>('api/auth/external-login', body);
  }
}
