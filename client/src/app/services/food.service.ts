import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({ providedIn: 'root' })
export class foodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTags(tag: string): Observable<Food[]> {
    if (tag == 'All') {
      return this.getAll();
    }

    return this.http.get<Food[]>(FOODS_TAGS_URL);
  }

  getFoodById(foodId: string): Observable<Food> {
    console.log(foodId);
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
