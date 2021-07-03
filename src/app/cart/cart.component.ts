import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(protected router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('loggedUser')) {
      alert('Necesita estar logueado para acceder al carrito');
      this.router.navigate(['/login']);
    }
  }
}
