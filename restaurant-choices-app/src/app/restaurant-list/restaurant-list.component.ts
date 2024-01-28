import { Component, HostListener, ElementRef} from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {
  restaurants: any[] = [];
  isListShow: Boolean = false;

  constructor(
  private restaurantService: RestaurantService,
  private el: ElementRef
  ) {}

  ngOnInit(): void {
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.restaurants = data,
        this.toggleList();
      },
      error => console.error(error)
    );
  }

  // Close the list when clicking outside of it
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeList();
    }
  }

  toggleList(): void {
    this.isListShow = !this.isListShow;
  }

  closeList(): void {
    this.isListShow = false;
  }
}
