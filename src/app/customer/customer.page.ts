import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  getCustomerDetails(){
    this.navCtrl.navigateForward('customer-details');
  }
  
}


