import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/users.model';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage implements OnInit, OnDestroy {

  contacts: User[] = [{
    name: 'Mitchell',
    picture: {
      data: {
        url: 'image'
      }
    },
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
    where: {
      ship:'Carnival Cruise',
      vacation: false
    }

  }];

  watchHttp: Subscription;
  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    try{
      this.httpService.getSavedUser();
    }catch(e){
      console.log(e)
    }
    this.authService.reloadDetails().then(userId => {
      this.authService.getUserDetail(userId);
    });

    this.getAllUsers();
  }
  doRefresh(event) {
    this.authService.reloadDetails().then(userID => {
      this.authService.getUserDetail(userID);
      this.getAllUsers();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  getAllUsers() {
    this.httpService.getAllUsers().subscribe((users: User[]) => {
      // this.isLoading = true;
      // if (this.isLoading) {
      //   this.presentLoading();
      // }
      this.contacts = [...users]
    }, error => {
      console.log('cant get users...' , error);
    });
  }

  ngOnDestroy() {
    this.watchHttp.unsubscribe();
  }
}

