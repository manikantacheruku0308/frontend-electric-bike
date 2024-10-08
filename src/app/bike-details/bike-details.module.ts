import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikeDetailsPageRoutingModule } from './bike-details-routing.module';

import { BikeDetailsPage } from './bike-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikeDetailsPageRoutingModule
  ],
  declarations: [BikeDetailsPage]
})
export class BikeDetailsPageModule {}
