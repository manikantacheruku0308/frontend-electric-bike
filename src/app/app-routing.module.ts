import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'bike-details/:id', loadChildren: () => import('./bike-details/bike-details.module').then(m => m.BikeDetailsPageModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule) },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule) }, 
  { path: 'order-confirmation', loadChildren: () => import('./order-confirmation/order-confirmation.module').then(m => m.OrderConfirmationPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
