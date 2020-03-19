import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/users.model';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  user: User;
  emitUser = new Subject<any>();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getSavedUser();
  }
getSavedUser() {
  this.authService.getSavedUser().then((user: any) => {
    this.user = user;
    this.emitUser.next(this.user);
  }).catch(e => {
    this.emitUser.next(e);
  });
}
  saveUser(event: any) {
    if (this.user) {
    if (event !== true || event !== false) {
      this.user.ship = event;
    } else {
      this.user.vacation = event;
    }
  }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http
      .post<any>(`${environment.apiUrl}/api/users`, {title: 'title'}, httpOptions)
      .subscribe(res => {
        console.log(res);
      });
  }
}
