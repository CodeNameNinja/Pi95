import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import {Router } from '@angular/router';
import { User } from '../models/users.model';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  isLoggedIn = false;
  userId;
  user = new EventEmitter<User>();

  constructor(
    private fb: Facebook,
    private route: Router,
    private storage: Storage
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

  ngOnInit() {
    this.storage.get('userID').then(val => {
      this.userId = val;
    });
    
  }

  fbLogin() {
    // this.route.navigate(['/tabs']);

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          this.storage.set('userID', res.authResponse.userID);
          this.route.navigate(['/tabs']);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture.width(800).height(800),friends{id,name,picture}', ['public_profile'])
      .then(res => {
        this.storage.set('user', JSON.stringify(res));
        this.user.emit(res); // is subscribed in header component and in http service
      })
      .catch(e => {
        console.log(e);
      });
  }
  reloadDetails() {
    return new Promise((resolve, reject) => {
      this.storage.get('userID').then(val => {
        resolve(val);
      });
    }) ;
  }
getSavedUser(){
  this.storage.get('user').then(user => {
    if (user !== null || user !== undefined) {
      this.user.emit(user);
    }
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

