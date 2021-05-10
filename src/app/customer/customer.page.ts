import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  public datePicker;
  public choosenDate;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertController : AlertController,
    ) { }

  ngOnInit() {
  }


  getDate(){
    this.choosenDate = new Date(this.datePicker).toDateString();
    console.log(this.choosenDate);
    let navigationExtra: NavigationExtras ={
      state:{
        selectedDate: this.choosenDate
      }
    };
    this.navCtrl.navigateForward('home/customer/customer-details', navigationExtra);
  }
}


