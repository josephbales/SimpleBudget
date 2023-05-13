import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  user: SocialUser = {} as SocialUser;

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getUser() ?? this.user;
  }
}
