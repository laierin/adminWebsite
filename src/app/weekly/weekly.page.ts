import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  getWeeklyDetail(){
    this.navCtrl.navigateForward('weekly-details');
  }

}
