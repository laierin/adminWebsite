import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-weekly-details',
  templateUrl: './weekly-details.page.html',
  styleUrls: ['./weekly-details.page.scss'],
})
export class WeeklyDetailsPage implements OnInit {
  
  public logoImg: string;

  public datePicker;

  public firstDate;
  public secondDate;
  public thirdDate;
  public fouthDate;
  public fiveDate;
  public sixDate;
  public lastDate;

  public chooseFirstDate;

  public first = 0;
  public second = 0;
  public third = 0;
  public fouth = 0;
  public five = 0;
  public six = 0;
  public last = 0;

  public total = 0;
  public average = 0;
  public highest = 0;
  public lowest = 0;



  constructor(
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public globalVar: GlobalVariable,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController,
  ) {
    this.globalVar = globalVar;
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        
        this.datePicker = this.router.getCurrentNavigation().extras.state.chooseDate;
        // this.secondDate = this.router.getCurrentNavigation().extras.state.date_2;
        // this.thirdDate = this.router.getCurrentNavigation().extras.state.date_3;
        // this.fouthDate = this.router.getCurrentNavigation().extras.state.date_4;
        // this.fiveDate = this.router.getCurrentNavigation().extras.state.date_5;
        // this.sixDate = this.router.getCurrentNavigation().extras.state.date_6;
        // this.lastDate = this.router.getCurrentNavigation().extras.state.date_7;
        console.log(this.datePicker)
      }
    });
   }

  ngOnInit() {
    this.changeLogo();
    this.getWeektoString();
    this.getTotalCustomerData();
    this.getTotalDependentData();

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

  getDetail(){
    this.datePicker = new Date(this.datePicker);
    console.log(this.datePicker);
    this.first = 0;
    this.second = 0;
    this.third = 0;
    this.fouth = 0;
    this.five = 0;
    this.six = 0;
    this.last = 0;
    this.total = 0;
    this.getWeektoString();
    this.getTotalCustomerData();
    this.getTotalDependentData();
  };

  getWeektoString(){

    this.chooseFirstDate = new Date(this.datePicker);
      
    this.firstDate = new Date(this.chooseFirstDate).toDateString();
    this.secondDate = new Date(this.chooseFirstDate - - 24 * 60 * 60 * 1000).toDateString();
    this.thirdDate = new Date(this.chooseFirstDate - - 2 * 24 * 60 * 60 * 1000).toDateString();
    this.fouthDate = new Date(this.chooseFirstDate - - 3 * 24 * 60 * 60 * 1000).toDateString();
    this.fiveDate = new Date(this.chooseFirstDate - - 4 * 24 * 60 * 60 * 1000).toDateString();
    this.sixDate = new Date(this.chooseFirstDate - - 5 * 24 * 60 * 60 * 1000).toDateString();
    this.lastDate = new Date(this.chooseFirstDate - - 6 * 24 * 60 * 60 * 1000).toDateString();

    console.log(this.firstDate);
    console.log(this.secondDate);
    console.log(this.thirdDate);
    console.log(this.fouthDate);
    console.log(this.fiveDate);
    console.log(this.sixDate);
    console.log(this.lastDate);

  }

  getTotalCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 => {

        if(this.firstDate == resp2.get('Customer_WalkInDate'))
        {
          this.first ++;
          console.log("1" + " " + this.first)
        }else if(this.secondDate == resp2.get('Customer_WalkInDate'))
        {
          this.second ++;
          console.log("2" + " " + this.second)
        }else if(this.thirdDate == resp2.get('Customer_WalkInDate'))
        {
          this.third ++;
          console.log("3" + " " + this.third)
        }else if(this.fouthDate == resp2.get('Customer_WalkInDate'))
        {
          this.fouth ++;
          console.log("4" + " " + this.fouth)
        }else if(this.fiveDate == resp2.get('Customer_WalkInDate'))
        {
          this.five ++;
          console.log("5" + " " + this.five)
        }else if(this.sixDate == resp2.get('Customer_WalkInDate'))
        {
          this.six ++;
          console.log("6" + " " + this.six)
        }else if(this.lastDate == resp2.get('Customer_WalkInDate'))
        {
          this.last ++;
          console.log("7" + " " + this.last)
        }
      });
    });
  }

  getTotalDependentData(){
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 => {

        if(this.firstDate == resp2.get('Date'))
        {
          this.first ++;
          console.log("1" + " " + this.first + "dep")
        }else if(this.secondDate == resp2.get('Date'))
        {
          this.second ++;
          console.log("2" + " " + this.second + "dep")
        }else if(this.thirdDate == resp2.get('Date'))
        {
          this.third ++;
          console.log("3" + " " + this.third + "dep")
        }else if(this.fouthDate == resp2.get('Date'))
        {
          this.fouth ++;
          console.log("4" + " " + this.fouth + "dep")
        }else if(this.fiveDate == resp2.get('Date'))
        {
          this.five ++;
          console.log("5" + " " + this.five + "dep")
        }else if(this.sixDate == resp2.get('Date'))
        {
          this.six ++;
          console.log("6" + " " + this.six + "dep")
        }else if(this.lastDate == resp2.get('Date'))
        {
          this.last ++;
          console.log("7" + " " + this.last + "dep")
        }
      });
    });
  }

  
  getTotal(){
    // this.total;
  }
  getAverage(){
    // this.average;
  }
  getHighest(){
    // this.highest;
  }
  getLowest(){
    // this.lowest;
  }

}
