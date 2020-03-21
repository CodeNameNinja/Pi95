import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-select-ship',
  templateUrl: './select-ship.component.html',
  styleUrls: ['./select-ship.component.scss'],
})
export class SelectShipComponent implements OnInit, OnDestroy{
  onVacation = false;
  selectedShip = '';
  isLoading =  false;
  watchSub = new Subscription;
  ships: any[] = [
    {
      id: 1,
      shipName: 'Carnival Cruise'
    },
    {
      id: 2,
      shipName: 'Carnival Ectasy'
    },
    {
      id: 3,
      shipName: 'Carnival Glory'
    },
  ];

  constructor(
    public modalController: ModalController,
    private storage: Storage,
    private httpService: HttpService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.watchSub = this.httpService.isLoading.subscribe(
      res => {
        this.isLoading = res;
        if (this.isLoading) {
          this.presentLoading();
        }
      }
    );
    this.storage.get('selectedShip').then(
      val => {
        this.selectedShip = val;
      }
    );
    this.storage.get('boxState').then(
      val => {
        this.onVacation = val;
      }
    );
  }
  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    await this.modalController.dismiss();
  }

  changeBoxState(event) {

    this.onVacation = event.target.checked;
    this.storage.set('boxState', this.onVacation);
    this.httpService.updateUser( this.onVacation, this.selectedShip);

  }
  onSelectShip(event) {
    this.selectedShip = event.target.value;
    this.storage.set('selectedShip', this.selectedShip );
    this.httpService.updateUser( this.onVacation, this.selectedShip);
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

  ngOnDestroy(){
    this.watchSub.unsubscribe();
  }
}
