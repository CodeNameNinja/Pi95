import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/users.model';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage implements OnInit, OnDestroy {
  // tslint:disable-next-line: max-line-length
  user: any;
  contacts: User = {
    friends: {
      data: [
        {
          name: 'Drag Down to refresh...',
          picture: {
            data: {
              height: 50,
              is_silhouette: false,
              url: 'https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg',
              width: 50
            }
          },

        }
      ]
    },

  };
  watchSub: Subscription;
  watchHttp: Subscription;
  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.httpService.getSavedUser();
    this.watchSub = this.authService.user.subscribe(users => (this.contacts = users));

    this.authService.reloadDetails().then(userId => {
      this.authService.getUserDetail(userId);
    });

    this.watchHttp = this.httpService.emitUser.subscribe((user: any) => {
      this.user = user;
      console.log('USER: ' + user);
    });

    // this.watchSub.add(watchAuthService);
    // this.watchSub.add(watchHttp);
  }
  doRefresh(event) {
    this.authService.reloadDetails().then(userID => {
      this.authService.getUserDetail(userID);
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    });
  }

  ngOnDestroy() {
    this.watchSub.unsubscribe();
    this.watchHttp.unsubscribe();
  }
}

