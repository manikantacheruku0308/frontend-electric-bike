import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  isInCart(bikeId: string): boolean {
    return this.cartItems.some(item => item._id === bikeId);
  }

  addToCart(bike: any, userId: string, email: string) {
    if (!email) {
      return of({
        success: false,
        message: "Email is required"
      });
    }



    return this.isInCart(bike._id) ? 
      of({
        success: false,
        message: "Bike is already in the cart"
      }) : 
      (this.cartItems.push(bike),
      this.http.post(`${environment.server_url}/cart/addtocart`, {
        userId: userId,
        bikeId: bike._id,
        email: email
      }).pipe(
        catchError(error => {
          console.error("Error adding to cart:", error);
          return of({ success: false, message: 'Error adding to cart' });
        }),
        tap(() => {
          console.log("Current Cart Items:", this.cartItems);
        })
      ));
  }

  loadCartItems(email: string | null) {
    if (!email) {
      return of([]);  // Return an empty array if no email is found
    }
  
    return this.http.get<any[]>(`${environment.server_url}/cart/items`, {
      params: { email }
    }).pipe(
      catchError(error => {
        console.error('Error loading cart items:', error);
        return of([]);  // Return an empty array if there's an error
      })
    );
  }
  






}

