import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  logout() {
    console.log('logging out...');
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
