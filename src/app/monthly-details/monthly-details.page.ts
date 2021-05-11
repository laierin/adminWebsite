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
  public test: string;
  public testtt = [];

  public totalCustomer: number = 0;
  public totalDependent: number = 0;
  public allTotal: number = 0;

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
  }


  getTotalCustomer(){
    
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 => {

        let dbDate = resp2.get('Customer_WalkInDate').split(' ') [1] + " " + resp2.get('Customer_WalkInDate').split(' ') [3];

        if(dbDate == this.monthSelected)
        {
          console.log(dbDate)
        }

      });
      
    });

    // this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', visitingShop)).get().subscribe(resp2 => {
    //   resp2.forEach(element2 => {
    //     if ((element2.get('Customer_WalkInDate') == this.checkDate) && (element2.get('Customer_Temperature') != null)) {
    //       if (element2.data.length != 0) {
    //         this.totalPeople = element2.data.length;
    //         this.addTotalNumberInShop(visitingShop, this.totalPeople);
    //       }
    //     }
    //   })
    // })

  }

  getTotolDependent(){

  }

  getData(){
    console.log("pdf")
  }
  
}
