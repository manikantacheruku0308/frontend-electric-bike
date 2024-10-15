import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  addToCart(item: any, userId: string, email: string): Observable<any> {
    if (this.isInCart(item._id)) {
      return of({ success: false, message: 'Bike is already in the cart' });
    } else {
      this.cartItems.push(item);
      return this.http
        .post(`${environment.server_url}/cart/addtocart`, {
          userId,
          bikeId: item._id,
          email,
        })
        .pipe(
          tap(() => {
            console.log('Current Cart Items:', this.cartItems);
          }),
          catchError((error) => {
            console.error('Error adding to cart:', error);
            return throwError(error);
          })
        );
    }
  }

  isInCart(bikeId: string): boolean {
    return this.cartItems.some(item => item._id === bikeId);
  }
}
