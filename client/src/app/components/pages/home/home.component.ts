import { Component } from '@angular/core';
import { foodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  foods: Food[] = [];
  hearIcon = faHeart;
  timeIcon = faClock;

  constructor(
    private foodService: foodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        foodObservable = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      } else if (params['tag']) {
        foodObservable = this.foodService.getAllFoodsByTags(params['tag']);
      } else {
        foodObservable = this.foodService.getAll();
      }
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }
}
