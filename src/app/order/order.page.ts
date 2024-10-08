import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.orderService.getOrders(userId).subscribe(
        (response) => {
          this.orders = response.orders;
          console.log('Orders loaded:', this.orders);
        },
        (error) => {
          console.error('Error loading orders', error);
        }
      );
    } else {
      console.error('No user ID found in local storage');
    }
  }
  
}
