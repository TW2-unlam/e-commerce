import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  internalCartList: any = [];
  cartList: any = [];
  totalAmount: any = 0;
  isLogged: boolean = false;
  cartHasData: boolean = false;
  cartCounter: any = 0;

  constructor(protected router: Router, private data: DataService) {}

  ngOnInit(): void {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    this.data.cartCounter.subscribe((number) => (this.cartCounter = number));
    if (!this.isLogged) {
      this.data.showToastNotification(
        'info',
        'Necesita estar logueado para acceder al carrito'
      );
      this.router.navigate(['/login']);
    }
    this.data.cartList.subscribe((list) => (this.internalCartList = list));

    // Refactor por pipe
    this.cartList = Object.values(this.internalCartList);
    if (this.cartList.length > 0) {
      this.cartHasData = true;
    } else {
      this.cartHasData = false;
    }

    this.calculateTotalAmount();
  }

  delInternalItem(item: any) {
    this.data.removeItemFromCart(item);
    this.calculateTotalAmount();
    this.ngOnInit();
  }

  updateQty(id: any, event: any) {
    let qty = event.target.value;
    this.data.updateQty(id, qty);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.cartCounter = 0;
    for (var i = 0; i < this.cartList.length; i++) {
      const price = parseFloat(this.cartList[i].price.toFixed(2));
      const quantity = parseFloat(this.cartList[i].quantity);
      this.totalAmount += price * quantity;
      this.cartCounter += quantity;
    }
    this.data.updateCartCounter(this.cartCounter);
  }
}
