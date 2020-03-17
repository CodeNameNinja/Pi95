import { Injectable, EventEmitter } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import {Router } from '@angular/router';
import { User } from '../models/users.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;

  user = new EventEmitter<User>();
  users: User;
  constructor(
    private fb: Facebook,
    private route: Router,

    ) {
    fb.getLoginStatus()
  .then(res => {
    console.log(res.status);
    if (res.status === 'connect') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  })
  .catch(e => console.log(e));
   }

  ngOnInit() {}

  fbLogin() {
    // this.route.navigate(['/tabs']);

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          this.route.navigate(['/tabs']);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.user.emit(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    this.fb.logout()
      .then( res => {
        this.isLoggedIn = false;
        this.route.navigate(['/login']);
      })
      .catch(e => console.log('Error logout from Facebook', e));
 

  }

}
