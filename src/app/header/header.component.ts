import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/users.model';
import { SelectShipComponent } from './select-ship/select-ship.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  users: User = {
    id: '',
    name: '', 
    email:'', 
    picture: {
      data: {
        url:''
      }
    }
  };

  constructor(
    private authService: AuthenticationService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    if (this.authService.user) {
      this.authService.user.subscribe(
        user => {
          this.users = user;
        });
    }

  }

  async selectShip() {
    const modal = await this.modalController.create({
      component: SelectShipComponent
    });
    return await modal.present();
  }
  logout() {
    this.authService.logout();
  }

}
