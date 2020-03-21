import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  isLoggedIn = false;
  userId;

  user = new Subject<User>();

  constructor(
    private fb: Facebook,
    private route: Router,
    private storage: Storage,
    private http: HttpClient
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
      .catch(e => console.log('Error get Login status', e));
  }

  ngOnInit() {
    this.storage.get('userID').then(val => {
      this.userId = val;
    });
  }

  fbLogin() {
    // this.route.navigate(['/tabs']);
    this.fb
      .login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          this.storage.set('userID', res.authResponse.userID);
          console.log('User Id ' , res.authResponse.userID);

          this.route.navigate(['/tabs']);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb
      .api(
        '/' +
          userid +
          '/?fields=id,email,name,picture.width(800).height(800),friends{id,name,picture}',
        ['public_profile']
      )
      .then(user => {
        // gets response as JSON string
        this.getUser(userid).subscribe(res => {
          console.log('Retrieved User ', res);
        }, error => {
          console.log('Error ', error );
          console.log('Error', error.error.text);
          if (error.error.text === 'NO_USER') {
            this.createUser(user).subscribe(res => {
              console.log('Created User ', res);
              
            }, error => {
              console.log('error creating user', error);
            });
          }
        });
        console.log("set User: " , user)
        this.user.next(user); // is subscribed in header component and in http service
       
      })
      .catch(e => {
        console.log('Error get user Details ', e);
      });
  }
  reloadDetails() {
    return new Promise((resolve, reject) => {
      this.storage.get('userID').then(val => {
        resolve(val);
      });
    });
  }

  getUser(userId) {
    return this.http.get(`${environment.apiUrl}/api/users/${userId}`);
  }
  createUser(user) {
    return this.http
    .post<any>(
      `${environment.apiUrl}/api/users`,
      user,
    );

  }

  logout() {
    this.fb
      .logout()
      .then(res => {
        this.isLoggedIn = false;
        this.route.navigate(['/login']);
        this.storage.set('userID', null);
       
      })
      .catch(e => console.log('Error logout from Facebook', e));
  }
}
