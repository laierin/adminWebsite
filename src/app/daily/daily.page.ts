import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  public datePicker;
  public dateSelected;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  getDailyRecord(){
    this.navCtrl.navigateForward('home/statistic/daily/daily-details');
  };

  changeDate(){
    this.dateSelected = new Date(this.datePicker).toDateString();
    console.log(this.dateSelected);
    //this.router.navigate(['home/statistic/daily/daily-details']);
  };

  checkDate(){
    if (this.datePicker == null){
      this.presentAlertPrompt();
    }else{
      this.passSelectedDate();
    }
  };

  passSelectedDate() { //pass date to next page
    let navigationExtras: NavigationExtras = {
      state: {
        selectedDate: this.dateSelected
      }
    };
    this.navCtrl.navigateForward('home/statistic/daily/daily-details', navigationExtras);
  };

  async presentAlertPrompt() { //Alert box when datePicker is null
    const alert = await this.alertController.create({
      header: 'Input Error',
      subHeader: 'Please select a date.',
      buttons: ['OK']
    });
    await alert.present();
  };

}
