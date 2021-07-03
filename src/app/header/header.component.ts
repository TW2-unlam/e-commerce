import { RecursiveAstVisitor } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  loggedUserData: any = {};
  loggedUserName: string = '';
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.loggedUserName = this.getLoggedUserName();
    // this.isLoggedIn = this.
  }

  getLoggedUserName() {
    this.loggedUserData = JSON.parse(
      localStorage.getItem('loggedUser') || '{}'
    );
    if (this.loggedUserData.user) {
      this.isLoggedIn = true;
      return this.loggedUserData.user.name ? this.loggedUserData.user.name : '';
    }
  }

  deleteLocalStorage() {
    if (confirm('¿Esta seguro? ' + name)) {
      localStorage.clear();
    }
  }
}
