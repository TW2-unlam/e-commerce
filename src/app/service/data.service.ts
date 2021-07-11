import { Injectable } from '@angular/core';
import { Result } from 'postcss';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userNameSource = new BehaviorSubject<string>('');
  loggedUsername = this.userNameSource.asObservable();

  private isLoggedSource = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedSource.asObservable();

  private cartCounterSource = new BehaviorSubject<number>(0);
  cartCounter = this.cartCounterSource.asObservable();

  private internalCartList = new BehaviorSubject<any[]>([]);
  cartList = this.internalCartList.asObservable();

  constructor() {}

  changeLoggedUsername(username: string) {
    this.userNameSource.next(username);
  }

  setIsLogged(value: boolean) {
    this.isLoggedSource.next(value);
  }

  addToCart(item: any) {
    let result = '';
    this.updateCartCounter(this.cartCounterSource.getValue() + 1);
    const cartArray: any[] = this.internalCartList.getValue();
    if (cartArray.length > 0) {
      let forceQuit = false;
      for (let actualItem of cartArray) {
        if (actualItem._id === item[0]._id) {
          actualItem.quantity = actualItem.quantity + 1;
          result = 'Cantidad modificada';
          forceQuit = true;
          break;
        }
      }
      if (forceQuit) {
        return result;
      } else {
        result = this.addToCartExecute(item);
      }
    } else {
      result = this.addToCartExecute(item);
    }
    return result;
  }

  addToCartExecute(item: any) {
    var internalList = [...item];
    internalList[0].quantity = 1;
    this.internalCartList.next([
      ...this.internalCartList.getValue(),
      ...internalList,
    ]);

    return 'Producto agregado al carrito';
  }

  updateQty(id: any, qty: number) {
    const cartArray: any[] = this.internalCartList.getValue();
    cartArray.forEach((item) => {
      if (item._id === id) {
        item.quantity = qty;
      }
    });
    return 'Cantidad = ' + qty;
  }

  removeItemFromCart(data: any) {
    const cartArray: any[] = this.internalCartList.getValue();

    cartArray.forEach((item, index) => {
      if (item === data) {
        cartArray.splice(index, 1);
      }
    });

    this.internalCartList.next(cartArray);
  }

  updateCartCounter(number: any) {
    this.cartCounterSource.next(number);
  }
}
