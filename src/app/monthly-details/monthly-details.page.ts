import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.page.html',
  styleUrls: ['./monthly-details.page.scss'],
})
export class MonthlyDetailsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  getMonthlyDetails(){
    this.navCtrl.navigateForward('monthly-details');
  }

}
