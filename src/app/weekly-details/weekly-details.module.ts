import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyDetailsPageRoutingModule } from './weekly-details-routing.module';

import { WeeklyDetailsPage } from './weekly-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyDetailsPageRoutingModule
  ],
  declarations: [WeeklyDetailsPage]
})
export class WeeklyDetailsPageModule {}
