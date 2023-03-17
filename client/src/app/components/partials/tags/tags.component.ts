import { Component } from '@angular/core';
import { foodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  tags?: Tag[];
  constructor(foodService: foodService) {
    foodService.getAllTags().subscribe((tags) => {
      this.tags = tags;
    });
  }
}
