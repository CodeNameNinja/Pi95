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
  user;
  emitUser = new Subject<any>();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getSavedUser();
  }
  getSavedUser() {
    this.authService
      .getSavedUser()
      .then((user: any) => {
        this.user = user;

        this.emitUser.next(this.user);
      })
      .catch(e => {
        this.emitUser.next(e);
      });
  }
  saveUser(event: any) {
    console.log("EVENT: ", event)
    if (event !== true || event !== false) {
      const where = {
        where: {
          ship: event,
          vacation: false
        }
      };
      this.user = Object.assign(this.user, where);
    }
    if (event === undefined) {
      const where = {
        where: {
          ship: null,
          vacation: false
        }
      };
      this.user = Object.assign(this.user, where);
    }
    if (event === true || event === false) {
      const where = {
        where: {
          ship: null,
          vacation: event
        }
      };
      this.user = Object.assign(this.user, where);
    }
    console.log('After User Object is assign new values: ', this.user.where);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http
      .post<any>(
        `${environment.apiUrl}/api/users`,
        {
          id: this.user.id,
          user: this.user
        },
        httpOptions
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
