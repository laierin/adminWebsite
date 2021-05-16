import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.page.html',
  styleUrls: ['./monthly-details.page.scss'],
})
export class MonthlyDetailsPage implements OnInit {

  public datePicker;
  public dateSelected: string;
  public monthSelected;

  public logoImg: string;

  public date_1 = 0;
  public date_2 = 0;
  public date_3 = 0;
  public date_4 = 0;
  public date_5 = 0;
  public date_6 = 0;
  public date_7 = 0;
  public date_8 = 0;
  public date_9 = 0;
  public date_10 = 0;
  public date_11 = 0;
  public date_12 = 0;
  public date_13 = 0;
  public date_14 = 0;
  public date_15 = 0;
  public date_16 = 0;
  public date_17 = 0;
  public date_18 = 0;
  public date_19 = 0;
  public date_20 = 0;
  public date_21 = 0;
  public date_22 = 0;
  public date_23 = 0;
  public date_24 = 0;
  public date_25 = 0;
  public date_26 = 0;
  public date_27 = 0;
  public date_28 = 0;
  public date_29 = 0;
  public date_30 = 0;
  public date_31 = 0;

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
          this.monthSelected = this.router.getCurrentNavigation().extras.state.selectedMonth;
          console.log(this.monthSelected)
        }
      });
    }

  ngOnInit() {
    this.changeLogo();
    this.getTotalCustomer();
    this.getTotalDependent();

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
      console.log("Logo error");
    }
  }

  getDetails(){
    this.dateSelected = new Date(this.dateSelected).toDateString();
    // console.log(this.dateSelected);
    this.monthSelected = this.dateSelected.split(' ')[1] + " " + this.dateSelected.split(' ')[3] ;
    console.log(this.monthSelected);
    this.getTotalCustomer();
    this.getTotalDependent();
  }


  getTotalCustomer(){
    
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      console.log("Customer");
      resp.forEach(resp2 => {

        let month = resp2.get('Customer_WalkInDate').split(' ') [1] + " " + resp2.get('Customer_WalkInDate').split(' ') [3];
        let day = resp2.get('Customer_WalkInDate').split(' ') [2];

        if(month == this.monthSelected)
        {
          if(day == "01"){
            console.log("1");
            this.date_1 ++;

          }else if(day == "02"){
            console.log("2");
            this.date_2 ++;

          }else if(day == "03"){
            console.log("3");
            this.date_3 ++;

          }else if(day == "04"){
            console.log("4");
            this.date_4 ++;

          }else if(day == "05"){
            console.log("5");
            this.date_5 ++;

          }else if(day == "06"){
            console.log("6");
            this.date_6 ++;

          }else if(day == "07"){
            console.log("7");
            this.date_7 ++;

          }else if(day == "08"){
            console.log("8");
            this.date_8 ++;

          }else if(day == "09"){
            console.log("9");
            this.date_9 ++;

          }else if(day == "10"){
            console.log("10");
            this.date_10 ++;

          }else if(day == "11"){
            console.log("11");
            this.date_11 ++;

          }else if(day == "12"){
            console.log("12");
            this.date_12 ++;

          }else if(day == "13"){
            console.log("13");
            this.date_13 ++;

          }else if(day == "14"){
            console.log("14");
            this.date_14 ++;

          }else if(day == "15"){
            console.log("15");
            this.date_15 ++;

          }else if(day == "16"){
            console.log("16");
            this.date_16 ++;

          }else if(day == "17"){
            console.log("17");
            this.date_17 ++;

          }else if(day == "18"){
            console.log("18");
            this.date_18 ++;

          }else if(day == "19"){
            console.log("19");
            this.date_19 ++;

          }else if(day == "20"){
            console.log("20");
            this.date_20 ++;
            this.date_20 ++;

          }else if(day == "21"){
            console.log("21");
            this.date_21 ++;

          }else if(day == "22"){
            console.log("22");
            this.date_22 ++;

          }else if(day == "23"){
            console.log("23");
            this.date_23 ++;

          }else if(day == "24"){
            console.log("24");
            this.date_24 ++;

          }else if(day == "25"){
            console.log("25");
            this.date_25 ++;

          }else if(day == "26"){
            console.log("26");
            this.date_26 ++;

          }else if(day == "27"){
            console.log("27");
            this.date_27 ++;

          }else if(day == "28"){
            console.log("28");
            this.date_28 ++;

          }else if(day == "29"){
            console.log("29");
            this.date_29 ++;

          }else if(day == "30"){
            console.log("30");
            this.date_30 ++;

          }else if(day == "31"){
            console.log("31");
            this.date_31 ++;

          }
        }

      });
      
    });
  }

  getTotalDependent(){
    
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      console.log("Dependent");
      resp.forEach(resp2 => {

        let depmonth = resp2.get('Date').split(' ') [1] + " " + resp2.get('Date').split(' ') [3];
        let depday = resp2.get('Date').split(' ') [2];

        if(depmonth == this.monthSelected)
        {

          if(depday == "01"){
            console.log("1");
            this.date_1 ++;

          }else if(depday == "02"){
            console.log("02");
            this.date_2 ++;

          }else if(depday == "03"){
            console.log("3");
            this.date_3 ++;

          }else if(depday == "04"){
            console.log("4");
            this.date_4 ++;

          }else if(depday == "05"){
            console.log("5");
            this.date_5 ++;

          }else if(depday == "06"){
            console.log("6");
            this.date_6 ++;

          }else if(depday == "07"){
            console.log("7");
            this.date_7 ++;

          }else if(depday == "08"){
            console.log("8");
            this.date_8 ++;

          }else if(depday == "09"){
            console.log("9");
            this.date_9 ++;

          }else if(depday == "10"){
            console.log("10");
            this.date_10 ++;

          }else if(depday == "11"){
            console.log("11");
            this.date_11 ++;

          }else if(depday == "12"){
            console.log("12");
            this.date_12 ++;

          }else if(depday == "13"){
            console.log("13");
            this.date_13 ++;

          }else if(depday == "14"){
            console.log("14");
            this.date_14 ++;

          }else if(depday == "15"){
            console.log("15");
            this.date_15 ++;

          }else if(depday == "16"){
            console.log("16");
            this.date_16 ++;

          }else if(depday == "17"){
            console.log("17");
            this.date_17 ++;

          }else if(depday == "18"){
            console.log("18");
            this.date_18 ++;

          }else if(depday == "19"){
            console.log("19");
            this.date_19 ++;

          }else if(depday == "20"){
            console.log("20");
            this.date_20 ++;
            this.date_20 ++;

          }else if(depday == "21"){
            console.log("21");
            this.date_21 ++;

          }else if(depday == "22"){
            console.log("22");
            this.date_22 ++;

          }else if(depday == "23"){
            console.log("23");
            this.date_23 ++;

          }else if(depday == "24"){
            console.log("24");
            this.date_24 ++;

          }else if(depday == "25"){
            console.log("25");
            this.date_25 ++;

          }else if(depday == "26"){
            console.log("26");
            this.date_26 ++;

          }else if(depday == "27"){
            console.log("27");
            this.date_27 ++;

          }else if(depday == "28"){
            console.log("28");
            this.date_28 ++;

          }else if(depday == "29"){
            console.log("29");
            this.date_29 ++;

          }else if(depday == "30"){
            console.log("30");
            this.date_30 ++;

          }else if(depday == "31"){
            console.log("31");
            this.date_31 ++;

          }
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
