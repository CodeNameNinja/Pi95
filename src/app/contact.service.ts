import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  @Output()contact: Contact[] = [
    {
      name: 'George',
      ship: 'Carnival Glory',
      port: 'Miami',
      avatar: 'https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg'
    }
  ];

  constructor() { }
}
