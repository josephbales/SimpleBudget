import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExternalAuthDto} from '../models/externalAuthDto';
import { AuthResponseDto } from '../models/authResponseDto';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  public isLoggedIn = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private apiService: ApiService) {
    this.socialAuthService.authState.subscribe((user) => {
      this.apiService.externalLogin({ provider: 'Google', idToken: user.idToken }).subscribe((resp) => {
        console.log('externalLogin', resp);
        if (resp.isAuthSuccessful) {
          localStorage.setItem('token', JSON.stringify(resp));
          this.authChangeSub.next(true);
        }
        else {
          console.error('User is not authenticated.');
        }
      });
    })
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
    this.router.navigate(['/login']);
  }

  public isUserAuthenticated = (): boolean => {
    const tokenJson: string | null = localStorage.getItem('token');
    console.log('tokenJson', tokenJson);
    let auth: AuthResponseDto = {} as AuthResponseDto;
    if (tokenJson) {
      // Check for errors and handle
      try {
        auth = JSON.parse(tokenJson) as AuthResponseDto;
        console.log('auth', auth);
      } catch (e) {
        console.log('e', e);
        this.logout();
      }
    }
      
    return auth !== {} as AuthResponseDto && !this.jwtHelper.isTokenExpired(auth.token);
  }
}
