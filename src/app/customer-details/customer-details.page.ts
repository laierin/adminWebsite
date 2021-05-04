import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
})
export class CustomerDetailsPage implements OnInit {
  constructor(
     public navCtrl: NavController,
     public db : AngularFireDatabase,
     private afs : AngularFirestore,
    ) { 
      // this.GetData();
    }

  ngOnInit() {
  }

  // GetData(){
  //   firebase.database().ref('CustomerRecord/').once('value').then(function(data){
  //     alert(JSON.stringify(data.val()));
  //   })
  // }
  
  // itemCollection : AngularFirestoreCollection<any>;
  // item: Observable <any[]>;

  // getDataFromDatabase(){
  //   this.itemCollection = this.afs.collection('CustomerRecord');
  //   this.item = this.itemCollection.valueChanges()
  //   console.log(this.item)

  // }

 }

 

