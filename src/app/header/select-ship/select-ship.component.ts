import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-select-ship',
  templateUrl: './select-ship.component.html',
  styleUrls: ['./select-ship.component.scss'],
})
export class SelectShipComponent implements OnInit {
  onVacation = true;
  selectedShip = '';
  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];
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
    private storage: Storage
  ) { }

  ngOnInit() {
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
    this.storage.set('boxState', event.target.checked);
  }
  onSelectShip(event) {
    this.storage.set('selectedShip', event.target.value );
  }
}
