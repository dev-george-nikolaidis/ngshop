import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this._getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food) {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) {
      return;
    }
    this.cart.items.push(new CartItem(food));
    this._setCartToLocalStorage();
  }

  removeItemFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this._setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id == foodId);

    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this._setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this._setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private _setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSub, currentItem) => Number(prevSub + currentItem.price),
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSub, currentItem) => Number(prevSub + currentItem.quantity),
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private _getCartFromLocalStorage() {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
