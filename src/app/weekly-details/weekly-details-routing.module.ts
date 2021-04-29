import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyDetailsPage } from './weekly-details.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyDetailsPageRoutingModule {}
