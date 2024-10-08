import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const email = localStorage.getItem("email");
    this.cartService.loadCartItems(email).subscribe(

      (items) => {
        this.cartItems = items;
        console.log('Cart Items:', this.cartItems); 
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }
  imageError(image: string) {
    console.log(`Image not found for: ${image}`);
    return 'assets/images/default-bike.png'; 
  }
}
