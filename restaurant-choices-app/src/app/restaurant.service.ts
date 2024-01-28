import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  submitRestaurant(restaurantName: string): Observable<any> {
    const body = { name: restaurantName };
    return this.http.post(`${this.apiUrl}/submit`, body);
  }

  getRandomRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random`);
  }

  getRestaurants(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/restaurants`).pipe(
      tap(data => console.log('Received data:', data))
    );
  }
}
