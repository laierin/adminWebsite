import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyDetailsPageRoutingModule } from './daily-details-routing.module';

import { DailyDetailsPage } from './daily-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyDetailsPageRoutingModule
  ],
  declarations: [DailyDetailsPage]
})
export class DailyDetailsPageModule {}
