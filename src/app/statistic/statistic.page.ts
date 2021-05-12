import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { GlobalVariable } from '../global-variables';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

  public logoImg: string;

  constructor(
    public navCtrl: NavController,
    public globalVar: GlobalVariable,
    public afs: AngularFirestore,
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
