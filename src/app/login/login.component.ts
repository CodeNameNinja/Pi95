import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  fbLogin() {
    this.userService.fbLogin().then(() => {
      console.log('Called service from login component');
      // console.log(response);
      this.router.navigate(['dashboard']);
    });
  }

}
