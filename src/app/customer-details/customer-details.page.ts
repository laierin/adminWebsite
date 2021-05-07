import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';



@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
})
export class CustomerDetailsPage implements OnInit {

  public customerArray = [];
  public dependentArray = [];

  constructor(
  public navCtrl: NavController,
  public afs: AngularFirestore,
  public globalVar: GlobalVariable

  ) {
    this.globalVar = globalVar; 
  }

  ngOnInit() {
    //this.getCustomerData();
    
  }
  
  getDate(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get()
    .subscribe(resp => {
      resp.forEach(resp2 =>{
        // if datepicker == 'Customer_WalkInDate'
        // this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        // .get()
        // .subscribe(resp3 => {
        //   resp3.forEach(resp4 => {
        //     // this.customerArray.push({
        //     //   customerID: resp4.get('Customer_ID'),
        //     //   customerName: resp4.get('Customer_Name'),
        //     //   cutomerContact: resp4.get('Customer_Contact'),
        //     //   cutomerWalkInDate: resp2.get('Customer_WalkInDate'),
        //     //   cutomerWalkInTime: resp2.get('Customer_WalkInTime'),
        //     //   customerTemp: resp2.get('Customer_Temperature')
        //     // });
        //   });
        // }); 

      });
    });
  }

  getCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 =>{
        this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        .get().subscribe(resp3 => {
          resp3.forEach(resp4 => {
            this.customerArray.push({
              customerID: resp4.get('Customer_ID'),
              customerName: resp4.get('Customer_Name'),
              cutomerContact: resp4.get('Customer_Contact'),
              cutomerWalkInDate: resp2.get('Customer_WalkInDate'),
              cutomerWalkInTime: resp2.get('Customer_WalkInTime'),
              customerTemp: resp2.get('Customer_Temperature')
            });
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
                    this.dependentArray.push({
                      dependentName: resp4.get('Dependent_Name'), //Dependent 
                      dependentPhoneNum: resp8.get('Customer_Contact'), //Customer 
                      dependentwalkInDate: resp2.get('Date'), //DependentRecord 
                      dependentwalkInTime: resp6.get('Customer_WalkInTime'), //CustomerRecord
                      dependentTemp: resp2.get('Dependent_Temperature') //DependentRecord 
                    });
                  });
                }); 
              });
            }); 
          });
        }); 
      });
    });
  }

  
  
  getCustomerDetails(){
    this.getCustomerData();
    this.getDependentData();
    console.log("clickkkk")
  }

  getData(){
    console.log("pdf")
  }

}