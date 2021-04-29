import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{

  admin_email: string = "";
  admin_password: string = "";
  logindeterminer: boolean = false;

  constructor(
    public navCtrl: NavController,
    public ngFireAuth: AngularFireAuth,
    public router: Router) {
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
      },
      (err) => alert(err.message)
    ).catch(err => alert(err.message));
  }
}
