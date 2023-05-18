import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getAuthToken(): TokenModel {
    return { authToken: localStorage['authToken'], refreshToken: localStorage['refreshToken'] };
  }

  saveToken(tokenModel: TokenModel): void {
    localStorage['authToken'] = tokenModel.authToken;
    localStorage['refreshToken'] = tokenModel.refreshToken;
  }

  destroyToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}
