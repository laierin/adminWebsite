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
  // public dependentArray = [];

  constructor(
  public navCtrl: NavController,
  public afs: AngularFirestore,
  public globalVar: GlobalVariable

  ) {
    this.globalVar = globalVar; 
  }

  ngOnInit() {
    this.getCustomerData();
    
  }
 
  getCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get()
    .subscribe(resp => {
      resp.forEach(resp2 =>{
        this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        .get()
        .subscribe(resp3 => {
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

  // getDependentData(){
  //   this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
  //   .get()
  //   .subscribe(resp => {
  //     resp.forEach(resp2 =>{
  //       this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
  //       .get()
  //       .subscribe(resp3 => {
  //         resp3.forEach(resp4 => {
  //           this.customerArray.push({
  //             customerName: resp4.get('Customer_Name'),
  //             cutomerPhoneNum: resp4.get('Customer_phonenum'),
  //             cutomerwalkInDate: resp2.get('Customer_WalkInDate'),
  //             cutomerwalkInTime: resp2.get('Customer_WalkInTime'),
  //             customerTemp: resp2.get('Customer_Temperture')
  //           });
  //         });
  //       }); 
  //     });
  //   });
  // }
}