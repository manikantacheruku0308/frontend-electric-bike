import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  backend_url = environment.server_url ;
  private cartItems: any[] = []; 
  constructor(private http: HttpClient) {}

  addToCart(item: any, userId: string, email : any): Observable<any> {
    if (!this.isInCart(item._id)) {
        this.cartItems.push(item);
        return this.http
            .post('{server_url}/cart/addtocart', {
                userId,
                bikeId: item._id,
                email
            })
            .pipe(
                catchError((error) => {
                    console.error('Error adding to cart:', error); 
                    return throwError(error);
                }),
                tap(() => {
                    console.log('Current Cart Items:', this.cartItems);
                })
            );
    } else {
        return of({ success: false, message: 'Bike is already in the cart' });
    }
}


  loadCartItems(email: any): Observable<any[]> {
    return this.http.get<any[]>(`{server_url}/cart/${email}`).pipe(
      tap((items) => {
        this.cartItems = items; 
        console.log('Loaded Cart Items:', this.cartItems); 
      }),
      catchError(this.handleError)
    );
  }

  getCartItems() {
    return this.cartItems;
  }

  isInCart(bikeId: string): boolean {
    return this.cartItems.some(item => item._id === bikeId);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
