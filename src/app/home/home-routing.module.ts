import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('../customer/customer.module').then( m => m.CustomerPageModule)
      },
      {
        path: 'statistic',
        loadChildren: () => import('../statistic/statistic.module').then( m => m.StatisticPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'statistic/daily',
        loadChildren: () => import('../daily/daily.module').then( m => m.DailyPageModule)
      },
      {
        path: 'statistic/weekly',
        loadChildren: () => import('../weekly/weekly.module').then( m => m.WeeklyPageModule)
      },
      {
        path: 'statistic/monthly',
        loadChildren: () => import('../monthly/monthly.module').then( m => m.MonthlyPageModule)
      },
      {
        path: 'customer/customer-details',
        loadChildren: () => import('../customer-details/customer-details.module').then( m => m.CustomerDetailsPageModule)
      },
      {
        path: 'statistic/daily/daily-details',
        loadChildren: () => import('../daily-details/daily-details.module').then( m => m.DailyDetailsPageModule)
      },
      {
        path: 'statistic/weekly/weekly-details',
        loadChildren: () => import('../weekly-details/weekly-details.module').then( m => m.WeeklyDetailsPageModule)
      },
      {
        path: 'statistic/monthly/monthly-details',
        loadChildren: () => import('../monthly-details/monthly-details.module').then( m => m.MonthlyDetailsPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
