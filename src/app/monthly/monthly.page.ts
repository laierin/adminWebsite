import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
})
export class MonthlyPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  getMonthlyDetail(){
    this.navCtrl.navigateForward('monthly-details');
  }
}
