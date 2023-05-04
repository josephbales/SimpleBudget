import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient) { }

  testUser(): Observable<User> {
    return this.http.get<User>('api/user');
  }
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
