import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContactsPage } from './contacts.page';
import { SelectShipComponentModule } from '../header/select-ship/select-ship.module';

@NgModule({
  imports: [
    SelectShipComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ContactsPage }])
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
