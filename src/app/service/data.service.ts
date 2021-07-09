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
    this.internalCartList.next([...this.internalCartList.getValue(), ...item]);
    this.updateCartCounter();
  }

  removeItemFromCart(data: any) {
    const cartarray: any[] = this.internalCartList.getValue();

    cartarray.forEach((item, index) => {
      if (item === data) {
        cartarray.splice(index, 1);
      }
    });

    this.internalCartList.next(cartarray);
    this.updateCartCounter();
  }

  updateCartCounter() {
    this.cartCounterSource.next(this.internalCartList.getValue().length);
  }
}
