import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeDetailsPage } from './bike-details.page';

const routes: Routes = [
  {
    path: '',
    component: BikeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikeDetailsPageRoutingModule {}
