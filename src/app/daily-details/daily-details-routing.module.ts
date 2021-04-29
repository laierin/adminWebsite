import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyDetailsPage } from './daily-details.page';

const routes: Routes = [
  {
    path: '',
    component: DailyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyDetailsPageRoutingModule {}
