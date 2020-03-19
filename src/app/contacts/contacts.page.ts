import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/users.model';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage implements OnInit {
  // tslint:disable-next-line: max-line-length
  user = null;
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

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService
  ) {}

 ngOnInit() {
   this.authService.user.subscribe(
     users => {
      this.contacts = users;
     });

   this.authService.reloadDetails().then(userId => {
       this.authService.getUserDetail(userId);
     });

   this.httpService.emitUser.subscribe((user) => {
      this.user = "any";
     });
 }
doRefresh(event) {
  this.authService.reloadDetails().then((userID) => {
    this.authService.getUserDetail(userID);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  });
}

}
