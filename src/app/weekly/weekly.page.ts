import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';

import { NavigationExtras, Router } from '@angular/router';
import { GlobalVariable } from '../global-variables';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  public datePicker;

  public firstDate;
  // public secondDate;
  // public thirdtDate;
  // public fouthDate;
  // public fiveDate;
  // public sixDate;
  // public lastDate;

  public logoImg: string;

  public chooseFirstDate;

  constructor(
    public navCtrl: NavController,
    public globalVar: GlobalVariable,
    public afs: AngularFirestore,
    public alertController : AlertController,
    public modalCtrl: ModalController
    ) {
      this.globalVar = globalVar;
     }

  onChange($event) {
      console.log($event);
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

  passDate(){
    
    this.chooseFirstDate = new Date(this.datePicker);
      
    this.firstDate = new Date(this.chooseFirstDate).toDateString();
    // this.secondDate = new Date(this.chooseFirstDate - - 24 * 60 * 60 * 1000).toDateString();
    // this.thirdtDate = new Date(this.chooseFirstDate - - 2 * 24 * 60 * 60 * 1000).toDateString();
    // this.fouthDate = new Date(this.chooseFirstDate - - 3 * 24 * 60 * 60 * 1000).toDateString();
    // this.fiveDate = new Date(this.chooseFirstDate - - 4 * 24 * 60 * 60 * 1000).toDateString();
    // this.sixDate = new Date(this.chooseFirstDate - - 5 * 24 * 60 * 60 * 1000).toDateString();
    // this.lastDate = new Date(this.chooseFirstDate - - 6 * 24 * 60 * 60 * 1000).toDateString();

    console.log(this.chooseFirstDate);
    // console.log(this.secondDate);
    // console.log(this.thirdtDate);
    // console.log(this.fouthDate);
    // console.log(this.fiveDate);
    // console.log(this.sixDate);
    // console.log(this.lastDate);
    console.log("From First Weekly Page");

    let navigationExtra: NavigationExtras ={
      state:{
        chooseDate: this.chooseFirstDate,
        dateString: this.firstDate,
        // date_2: this.secondDate,
        // date_3: this.thirdtDate,
        // date_4: this.fouthDate,
        // date_5: this.fiveDate,
        // date_6: this.sixDate,
        // date_7: this.lastDate
      }
    };

    this.navCtrl.navigateForward('home/statistic/weekly/weekly-details', navigationExtra);
  }

  checekDate(){
    if(this.datePicker == null){
      this.presentAlertPrompt();
    }else{
      this.passDate();
    }
  }

  async presentAlertPrompt() { //Alert box when datePicker is null
    const alert = await this.alertController.create({
      header: 'Input Error',
      subHeader: 'Please select a date.',
      buttons: ['OK']
    });
    await alert.present();
  };

  getWeeklyDetail(){
  }

}
