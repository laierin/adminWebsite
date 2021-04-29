import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  getDailyRecord(){
    this.navCtrl.navigateForward('daily-details');
  }

}
