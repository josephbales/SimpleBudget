import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  public user: User = {} as User;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User>(baseUrl + 'api/user').subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
