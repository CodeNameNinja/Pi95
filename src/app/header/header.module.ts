import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectShipComponentModule } from './select-ship/select-ship.module';

@NgModule({
  imports: [
    SelectShipComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: []
})
export class HeaderComponentModule {}
