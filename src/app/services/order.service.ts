import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.server_url}/order`;  

  constructor(private http: HttpClient) {}

  // Place an order
  placeOrder(deliveryAddress: string, paymentMethod: string): Observable<any> {
    const userId = localStorage.getItem('userId');  // Fetch user ID from local storage
    return this.http.post(this.apiUrl, { userId, deliveryAddress, paymentMethod });
  }
  
  getOrders(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
