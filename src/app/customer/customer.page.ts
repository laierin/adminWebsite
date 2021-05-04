import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  // getCustomerDetails(){
  //   this.navCtrl.navigateForward('customer-details');
  // }

  public datePicker
  changeDate(){
    console.log(this.datePicker);
    this.router.navigate(['home/customer/customer-details']);
  }
  
}


