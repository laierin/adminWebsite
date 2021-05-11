import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { NavigationExtras, Router } from '@angular/router';
import { GlobalVariable } from '../global-variables';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
})
export class MonthlyPage implements OnInit {

  public datePicker;
  public choosenDate;
  public choosenMonth;
  public logoImg: string;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertController : AlertController,
    public globalVar: GlobalVariable,
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

  getMonth(){
    
    this.choosenMonth= this.choosenDate.split(' ')[1] + " " + this.choosenDate.split(' ')[3] ;
    console.log(this.choosenMonth);
  }

  getDate(){
    if(this.datePicker == null){
      this.presentAlertPrompt();
    }else{
      this.choosenDate = new Date(this.datePicker).toDateString();
      console.log(this.choosenDate);
      this.choosenMonth= this.choosenDate.split(' ')[1] + " " + this.choosenDate.split(' ')[3] ;
      console.log(this.choosenMonth);
  
      let navigationExtra: NavigationExtras ={
        state:{
          selectedMonth: this.choosenMonth
        }
      };
  
      this.navCtrl.navigateForward('home/statistic/monthly/monthly-details', navigationExtra);
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
}
