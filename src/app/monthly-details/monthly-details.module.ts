import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyDetailsPageRoutingModule } from './monthly-details-routing.module';

import { MonthlyDetailsPage } from './monthly-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyDetailsPageRoutingModule
  ],
  declarations: [MonthlyDetailsPage]
})
export class MonthlyDetailsPageModule {}
