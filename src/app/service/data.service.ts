import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // implementar / modificar
  private cartSource = new BehaviorSubject<number>(0);
  private messageSource = new BehaviorSubject<string>('default message');
  cartCounter = this.cartSource.asObservable();
  currentMessage = this.messageSource.asObservable();

  private internalCartList = new BehaviorSubject<any[]>([]);
  cartList = this.internalCartList.asObservable();

  constructor() {}

  // implementar / modificar
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  addToCart(item: any) {
    this.internalCartList.next([...this.internalCartList.getValue(), ...item]);
  }

  removeItemFromCart(data: any) {
    const cartarray: any[] = this.internalCartList.getValue();

    cartarray.forEach((item, index) => {
      if (item === data) {
        cartarray.splice(index, 1);
      }
    });

    this.internalCartList.next(cartarray);
  }
}
