import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeItemFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityString: string) {
    const quantity = parseInt(quantityString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}