import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(protected router: Router, private data: DataService) {}

  loggedUserData: any = {};
  cartCounter: any = 0;
  username: string = '';
  isLogged: boolean = false;

  ngOnInit(): void {
    this.data.loggedUsername.subscribe((user) => (this.username = user));
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    this.getLoggedUserName();
    this.data.cartCounter.subscribe((number) => (this.cartCounter = number));
  }

  getLoggedUserName() {
    this.loggedUserData = JSON.parse(
      localStorage.getItem('loggedUser') || '{}'
    );
    if (this.loggedUserData.user) {
      this.data.changeLoggedUsername(
        this.loggedUserData.user.name ? this.loggedUserData.user.name : ''
      );
      this.data.setIsLogged(true);
    }
  }

  deleteLocalStorage() {
    if (confirm('¿Esta seguro? ')) {
      this.data.setIsLogged(false);
      localStorage.clear();
      this.router.navigate(['/']);
      this.data.showToastNotification('success', 'Deslogueo exitoso');
    }
  }
}
