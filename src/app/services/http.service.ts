import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/users.model';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  user;
  isLoading = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getSavedUser();
  }
  getSavedUser() {

    this.authService.user.subscribe(
      user => {
        this.user = user;
      });
  }
  updateUser(vacation: boolean, ship: string) {
    this.isLoading.next(false);
    if (vacation === false) {
      const where = {
        where: {
          ship,
          vacation: false
        }
      };
      this.user = Object.assign(this.user, where);
    }
    if (vacation === undefined && ship === undefined) {
      const where = {
        where: {
          ship: null,
          vacation: false
        }
      };
      this.user = Object.assign(this.user, where);
    }
    if (vacation === true) {
      const where = {
        where: {
          ship: null,
          vacation: true
        }
      };
      this.user = Object.assign(this.user, where);
    }
    // console.log('After User Object is assign new values: ', this.user.where);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    console.log("Update User: ", this.user.id);
    this.http
      .post<any>(
        `${environment.apiUrl}/api/update/user/${this.user.id}`,
        this.user,
        httpOptions
      )
      .subscribe(res => {
        this.isLoading.next(true);
        console.log(res);
      });
  }

  getAllUsers(){
   
    return this.http.get(`${environment.apiUrl}/api/users`);

  }

}
