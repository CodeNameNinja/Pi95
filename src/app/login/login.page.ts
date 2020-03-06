import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loading: any;
  constructor(
    private router: Router,
    private fb: Facebook,
    public loadingController: LoadingController,
    // private fireAuth: AngularFireAuth
  ) {

  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


  async login() {

    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + error);
      });
  }
  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    firebase.auth().signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(['/tabs']);
        this.loading.dismiss();
      });

  }
  onLoginError(err) {
    console.log(err);
  }
}
