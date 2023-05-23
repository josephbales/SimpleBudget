import { Component } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  user: UserModel = {} as UserModel;

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe((user) => {
      this.user = user ?? {} as UserModel;
    });
  }
}
