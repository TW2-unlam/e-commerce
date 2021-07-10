import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<string>('default message');
  private cartCounterSource = new BehaviorSubject<number>(0);
  cartCounter = this.cartCounterSource.asObservable();

  private internalCartList = new BehaviorSubject<any[]>([]);
  cartList = this.internalCartList.asObservable();

  constructor() {}

  addToCart(item: any) {
    const cartArray: any[] = this.internalCartList.getValue();
    if (cartArray.length > 0) {
      cartArray.forEach((actualItem) => {
        if (actualItem._id === item[0]._id) {
          actualItem.quantity = actualItem.quantity + 1;
        } else {
          this.addToCartExecute(item);
        }
      });
    } else {
      this.addToCartExecute(item);
    }
  }

  addToCartExecute(item: any) {
    var internalList = [...item];
    internalList[0].quantity = 1;
    this.internalCartList.next([
      ...this.internalCartList.getValue(),
      ...internalList,
    ]);

    this.updateCartCounter();
  }

  updateQty(id: any, qty: number) {
    const cartArray: any[] = this.internalCartList.getValue();
    cartArray.forEach((item) => {
      if (item._id === id) {
        item.quantity = qty;
      }
    });
  }

  removeItemFromCart(data: any) {
    const cartArray: any[] = this.internalCartList.getValue();

    cartArray.forEach((item, index) => {
      if (item === data) {
        cartArray.splice(index, 1);
      }
    });

    this.internalCartList.next(cartArray);
    this.updateCartCounter();
  }

  updateCartCounter() {
    this.cartCounterSource.next(this.internalCartList.getValue().length);
  }
}
