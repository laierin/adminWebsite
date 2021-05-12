import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
})
export class CustomerDetailsPage implements OnInit {

  public customerArray = [];
  public dependentArray = [];
  public datePicker;
  public dateSelected;
  public logoImg: string;

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
        this.dateSelected = this.router.getCurrentNavigation().extras.state.selectedDate;
        console.log(this.dateSelected)
      }
    });
  }

  ngOnInit() {
    this.getCustomerData();
    this.getDependentData();
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

  getCustomerDetails(){
    this.customerArray = [];
    this.dependentArray = [];
    this.dateSelected = new Date(this.dateSelected).toDateString();
    console.log(this.dateSelected);
    this.getCustomerData();
    this.getDependentData();
  }

  getCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 =>{
        this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        .get().subscribe(resp3 => {
          resp3.forEach(resp4 => {
            if(this.dateSelected == resp2.get('Customer_WalkInDate')){
              this.customerArray.push({
                customerID: resp4.get('Customer_ID'), //Customer
                customerName: resp4.get('Customer_Name'), //Customer
                cutomerContact: resp4.get('Customer_Contact'),//Customer
                cutomerWalkInDate: resp2.get('Customer_WalkInDate'), //CustomerRecord
                cutomerWalkInTime: resp2.get('Customer_WalkInTime'), //CustomerRecord
                customerTemp: resp2.get('Customer_Temperature') //Customer
              });
            }
          });
        }); 
      });
    });
  }

  getDependentData(){
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 =>{
        this.afs.collection('Dependent', ref => ref.where('Dependent_ID', '==', resp2.get('Dependent_ID')))
        .get().subscribe(resp3 => {
          resp3.forEach(resp4 => {
            this.afs.collection('CustomerRecord', ref => ref.where('Customer_ID', '==', resp4.get('Customer_ID')))
            .get().subscribe(resp5 => {
              resp5.forEach(resp6 => {
                this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp6.get('Customer_ID')))
                .get().subscribe(resp7 => {
                  resp7.forEach(resp8 => {
                    if(this.dateSelected == resp2.get('Date')){
                      this.dependentArray.push({
                        dependentName: resp4.get('Dependent_Name'), //Dependent 
                        dependentPhoneNum: resp8.get('Customer_Contact'), //Customer 
                        dependentwalkInDate: resp2.get('Date'), //DependentRecord 
                        dependentwalkInTime: resp6.get('Customer_WalkInTime'), //CustomerRecord
                        dependentTemp: resp2.get('Dependent_Temperature') //DependentRecord 
                      });
                    }
                  });
                }); 
              });
            }); 
          });
        }); 
      });
    });
  }

  getData(){
    console.log("pdf")
  }

}