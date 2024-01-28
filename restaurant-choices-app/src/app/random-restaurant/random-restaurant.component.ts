import { Component } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-random-restaurant',
  templateUrl: './random-restaurant.component.html',
  styleUrls: ['./random-restaurant.component.css']
})
export class RandomRestaurantComponent {
  randomRestaurant: any = "";

  constructor (
    private restaurantService: RestaurantService
  ) {}

  getRandomRestaurant(): void {
    this.restaurantService.getRandomRestaurant().subscribe(
      restaurant => {
        this.randomRestaurant = restaurant;
      },
      error => console.error(error)
    );
  }
}
