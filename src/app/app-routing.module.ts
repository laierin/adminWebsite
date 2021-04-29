import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'daily',
    loadChildren: () => import('./daily/daily.module').then( m => m.DailyPageModule)
  },
  {
    path: 'weekly',
    loadChildren: () => import('./weekly/weekly.module').then( m => m.WeeklyPageModule)
  },
  {
    path: 'monthly',
    loadChildren: () => import('./monthly/monthly.module').then( m => m.MonthlyPageModule)
  },
  {
    path: 'customer-details',
    loadChildren: () => import('./customer-details/customer-details.module').then( m => m.CustomerDetailsPageModule)
  },
  {
    path: 'daily-details',
    loadChildren: () => import('./daily-details/daily-details.module').then( m => m.DailyDetailsPageModule)
  },
  {
    path: 'weekly-details',
    loadChildren: () => import('./weekly-details/weekly-details.module').then( m => m.WeeklyDetailsPageModule)
  },
  {
    path: 'monthly-details',
    loadChildren: () => import('./monthly-details/monthly-details.module').then( m => m.MonthlyDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
