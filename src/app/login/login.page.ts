import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users: User;
  isLoggedIn = false;
  constructor(
    private authService: AuthenticationService
    ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.users = user;
    });
    this.fbLogin();
  }

  fbLogin() {
   this.authService.fbLogin();
  }

  getUserDetail(userid: any) {
    this.authService.getUserDetail(userid);
  }

  logout() {
   this.authService.logout();
  }

}
