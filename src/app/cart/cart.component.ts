import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    if (!this.isLogged) {
      this.showToastNotification(
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
    }
    this.calculateTotalAmount();
  }

  showToastNotification(type: string, message: string) {
    // Passed to ToastrService.success/error/warning/info/show()
    switch (type) {
      case 'success': {
        this.toastr.success(message, 'Success');
        break;
      }
      case 'error': {
        this.toastr.error(message, 'Error');
        break;
      }
      case 'warning': {
        this.toastr.warning(message, 'Warning');
        break;
      }
      case 'info': {
        this.toastr.info(message, 'Info');
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  delInternalItem(item: any) {
    this.data.removeItemFromCart(item);
    this.ngOnInit();
  }

  updateQty(id: any, event: any) {
    let qty = event.target.value;
    this.data.updateQty(id, qty);
    this.calculateTotalAmount();
    console.log(this.cartList.length);
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    for (var i = 0; i < this.cartList.length; i++) {
      const price = parseFloat(this.cartList[i].price.toFixed(2));
      const quantity = parseFloat(this.cartList[i].quantity);
      this.totalAmount += price * quantity;
    }
  }
}
