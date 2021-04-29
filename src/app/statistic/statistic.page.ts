import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  selectDate(){
    this.navCtrl.navigateForward('daily');
  }

  selectWeek(){
    this.navCtrl.navigateForward('weekly');
  }

  selectMonth(){
    this.navCtrl.navigateForward('monthly');
  }

}
