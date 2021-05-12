import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyPageRoutingModule } from './weekly-routing.module';

import { WeeklyPage } from './weekly.page';

import { CalendarModule } from 'ion2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyPageRoutingModule,
    CalendarModule
  ],
  declarations: [WeeklyPage]
})
export class WeeklyPageModule {}
