import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { GlobalVariable } from '../global-variables';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{

  admin_email: string = "";
  admin_password: string = "";
  logindeterminer: boolean = false;
  public shopID: string;

  constructor(
    public navCtrl: NavController,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public globalVar: GlobalVariable, 
    public afs: AngularFirestore
    ) {
      this.globalVar = globalVar;
  }

  ngOnInit(){
  }

  isLoggedIn() {
    return this.ngFireAuth.authState.pipe(first()).toPromise();
  }
  async login(){

    const { admin_email, admin_password } = this;

    this.ngFireAuth.signInWithEmailAndPassword(admin_email, admin_password).then(
      async () => {
        const user = await this.isLoggedIn();
        if (user)
          this.router.navigate(['home']);
          this.admin_email = ''; //Clear inputs
          this.admin_password = '';
      },
      (err) => alert(err.message)
    ).catch(err => alert(err.message));
    this.getIdFromEmail();
  }

  getIdFromEmail() { //get id from db with email
    this.afs.collection(
      'Shop', ref => ref.where('Email', '==', this.admin_email)).get().subscribe(resp => {
      resp.forEach(element => {
        this.shopID = element.get('Shop_ID');
        this.globalVar.current_shopID = this.shopID;
        console.log("Success log in as admin")

      }) 
    }); //use subscribe, foreach if no document id
  }

}
