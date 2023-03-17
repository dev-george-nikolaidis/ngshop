import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { foodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent {
  food!: Food;
  heartIcon = faHeart;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: foodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        foodService.getFoodById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
        });
      }
    });
  }

  onAddToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
