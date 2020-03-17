import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SelectShipComponent } from './select-ship.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  entryComponents: [SelectShipComponent],
  providers: [SelectShipComponent],
  declarations: [SelectShipComponent]
})
export class SelectShipComponentModule {}
