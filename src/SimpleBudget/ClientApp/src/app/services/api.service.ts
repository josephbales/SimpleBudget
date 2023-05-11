import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseDto } from '../models/authResponseDto';
import { ExternalAuthDto } from '../models/externalAuthDto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient) {
  }

  public externalLogin = (body: ExternalAuthDto): Observable<AuthResponseDto> => {
    return this.http.post<AuthResponseDto>('api/auth/external-login', body);
  }
}
