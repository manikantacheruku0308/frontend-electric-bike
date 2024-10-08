import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private API_URL = 'http://localhost:2900/bike';
  private CART_URL = 'http://localhost:2900/cart';  
  private ORDER_URL = 'http://localhost:2900/order'; 

  constructor(private http: HttpClient) {}

 
  getBikes(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getBikeDetails(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addBike(bikeData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, bikeData);
  }

  editBike(id: string, bikeData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/edit`, bikeData);
  }

  deleteBike(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}/delete`);
  }

  trialBike(id: string, userId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/trial`, { userId });
  }

  buyBike(id: string, userId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/buy`, { userId });
  }

 
  addToCart(bikeId: string, userId: string): Observable<any> {
    return this.http.post(`${this.CART_URL}/addtocart`, { userId, bikeId });
  }

  getCart(userId: string): Observable<any> {  
    return this.http.get(`${this.CART_URL}/user/${userId}`);
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.ORDER_URL}/placeorder`, orderData);
  }
}
