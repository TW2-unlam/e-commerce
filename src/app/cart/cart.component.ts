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

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('loggedUser')) {
      this.showToastNotification(
        'info',
        'Necesita estar logueado para acceder al carrito'
      );
      this.router.navigate(['/login']);
    }
    this.data.cartList.subscribe((list) => (this.internalCartList = list));

    // Refactor por pipe
    this.cartList = Object.values(this.internalCartList);
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
}
