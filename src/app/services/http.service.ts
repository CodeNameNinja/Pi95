import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/users.model';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  user: User;
  emitUser = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.getSavedUser();
    this.authService.user.subscribe(user => {
      this.user = user;
      this.emitUser.emit(user);
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
      .post<any>(`${environment.apiUrl}/api/users`, JSON.stringify(this.user), httpOptions)
      .subscribe(res => {
        console.log(res);
      });
  }
}

