import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.as.logout();
  }

  isLogged() {
    return localStorage['id'] ? true : false;
  }

  isAdmin() {
    return localStorage['admin'] == 1 ? true : false;
  }

  getName() {
    return localStorage['name'];
  }

}
