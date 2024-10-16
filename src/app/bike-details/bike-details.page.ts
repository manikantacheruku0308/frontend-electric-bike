import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../services/bike.service';
import { CartService } from '../services/cart.service'; 
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.page.html',
  styleUrls: ['./bike-details.page.scss'],
})
export class BikeDetailsPage implements OnInit {
  bikeId: string | null = null;
  bike: any = {};
  deliveryAddress: string = ''; 
  paymentMethod: string = '';

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bikeId = params.get('id');
      if (this.bikeId) {
        this.bikeService.getBikeDetails(this.bikeId).subscribe((data: any) => {
          this.bike = data;
        });
      }
    });
  }

  addToCart(bike: any) {
    const userId = this.authService.getUserId(); 
    const email = localStorage.getItem("email");

    // Check if email is available
    if (!email) {
      alert('Email is required. Please log in.');
      return;
    }

    this.cartService.addToCart(bike, userId, email).subscribe(
      (response: any) => {
        if ((response as { success: boolean }).success) {
          console.log('Added to cart:', response.message);
          this.router.navigate(['/cart']);
        } else {
          alert(response.message); 
        }
      },
      error => {
        console.error('Error adding to cart:', error);
        alert('There was an error adding the bike to the cart. Please try again.');
      }
    );
  }

  placeOrder() {
    if (!this.deliveryAddress || !this.paymentMethod) {
      alert('Please fill in delivery address and payment method.');
      return;
    }
    console.log('Order placed for:', this.bike.model);
    console.log('Delivery Address:', this.deliveryAddress);
    console.log('Payment Method:', this.paymentMethod);
    this.orderPlace();
  }

  orderPlace() {
    this.orderService.placeOrder(this.deliveryAddress, this.paymentMethod).subscribe(
      (response) => {
        console.log('Order placed successfully');
        this.router.navigate(['/order-confirmation']).then(
          () => {
            console.log('Navigation to /order-confirmation was successful');
          },
          (error) => {
            console.error('Error during navigation', error);
          }
        );
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  }
}
