import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { GlobalVariable } from '../global-variables';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalendarModal, CalendarModalOptions, DayConfig,CalendarResult, CalendarComponentOptions  } from 'ion2-calendar';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  public logoImg: string;

  // date: string;
  // type: 'string';

  dateRange: { from: string; to: string; };
  type: 'string';
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };

  constructor(
    public navCtrl: NavController,
    public globalVar: GlobalVariable,
    public afs: AngularFirestore,
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

  async openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'RANGE'
    };
  
    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });
  
    myCalendar.present();
  
    const event: any = await myCalendar.onDidDismiss();
    const date = event.data;
    const from: CalendarResult = date.from;
    const to: CalendarResult = date.to;
  
    console.log(date, from, to);
  }

  getWeeklyDetail(){
    this.navCtrl.navigateForward('weekly-details');
  }

}
