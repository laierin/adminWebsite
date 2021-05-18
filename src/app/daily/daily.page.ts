import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';
import { GlobalVariable } from '../global-variables';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  public datePicker;
  public dateSelected;
  public logoImg: string;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertController: AlertController,
    public globalVar: GlobalVariable,
    // public afs: AngularFirestore,
    ) { 
      this.globalVar = globalVar;
    }

  ngOnInit() {
    this.changeLogo();
  }

  changeLogo(){
    if(this.globalVar.current_shopID == "6YcKQ6C6hnJP5h2U4EVp"){
      this.logoImg = '../../assets/hnmLogo.png';
      console.log("h&m");
    }
    else if (this.globalVar.current_shopID == "KqfmOPxf4e4OiM8gnKbj"){
      this.logoImg = '../../assets/sushikinglogo.png';
      console.log("sushi king");
    }else if (this.globalVar.current_shopID == "bU8jSc6I97kSp5vwp3yT"){
      this.logoImg = '../../assets/watsonslogo.png';
      console.log("watson");
    }
    else{
      console.log("Logo error")
    }
  }

  changeDate(){
    this.dateSelected = new Date(this.datePicker).toDateString();
    console.log(this.dateSelected);
    console.log("aaaa" + this.datePicker);
  };

  checkDate(){
    if (this.datePicker == null){
      this.presentAlertPrompt();
    }else{
      this.passSelectedDate();
    }
  };

  passSelectedDate() { //pass date to next page
    this.changeDate();
    let navigationExtras: NavigationExtras = {
      state: {
        selectedDateFull: this.datePicker,
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
