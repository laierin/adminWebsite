import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import {  ActivatedRoute,Router,NavigationExtras } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { count, max } from 'rxjs/operators';

@Component({
  selector: 'app-daily-details',
  templateUrl: './daily-details.page.html',
  styleUrls: ['./daily-details.page.scss'],
})

export class DailyDetailsPage implements OnInit {

  public firstThreeHours = [];
  public secondThreeHours = [];
  public thirdThreeHours = [];
  public fourthThreeHours = [];
  public fifthThreeHours = [];
  public sixthThreeHours = [];
  public seventhThreeHours = [];
  public eighthThreeHours = [];

  public timeArray = [];

  public highestValue = 0;
  public lowestValue = 0;
  public average = 0;
  public total = 0;
  
  public counter;
  public datePicker;
  public dateSelected;

  constructor(
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public globalVar: GlobalVariable,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController
  ) {
      this.globalVar = globalVar; 
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) { //receive data from daily page
          this.dateSelected = this.router.getCurrentNavigation().extras.state.selectedDate;
          console.log(this.dateSelected)
        }
      });
    }
  
    ngOnInit() {
      console.log(this.dateSelected)
      this.getTimeData();
      this.getDependentTime();
      console.log("1st Val:", this.timeArray[0])
      console.log("Highest:", this.highestValue)
      console.log("Lowest:", this.lowestValue)
      console.log("Total:" , this.total)
      console.log("Average:", this.average)
    }

    changeDate(){
      console.log(this.dateSelected);
    }

    renewData(){

    this.firstThreeHours = []
    this.secondThreeHours = []
    this.thirdThreeHours = []
    this.fourthThreeHours = []
    this.fifthThreeHours = []
    this.sixthThreeHours = []
    this.seventhThreeHours = []
    this.eighthThreeHours = []
    this.timeArray = []

    this.total = 0
    this.highestValue = 0
    this.lowestValue = 0
    this.average = 0
    this.dateSelected = new Date(this.dateSelected).toDateString();
    console.log(this.dateSelected)
    this.getTimeData();
    this.getDependentTime();
    }

    calculateTotal(){
      for (this.counter = 0;this.counter < (this.timeArray).length; this.counter++){
        this.total = this.total + (this.timeArray[this.counter])
      }
    }

    maxVal(){
      for (this.counter = 0;this.counter < ((this.timeArray).length - 1); this.counter++){
        if(((this.timeArray[this.counter]) > (this.timeArray[(this.counter + 1)])) || 
        ((this.timeArray[this.counter]) == (this.timeArray[(this.counter + 1)]))){
          this.highestValue = (this.timeArray[this.counter])
        }else{
          this.highestValue = (this.timeArray[(this.counter + 1)])
        }
      }
      console.log("Highest after func. :",this.highestValue)
    }

    minVal(){
      for (this.counter = 0;this.counter < ((this.timeArray).length - 1); this.counter++){
        if (((this.timeArray[this.counter]) < (this.timeArray[(this.counter + 1)])) ||
        ((this.timeArray[this.counter]) == (this.timeArray[(this.counter + 1)]))){
          this.lowestValue = (this.timeArray[this.counter])
        }else{
          this.lowestValue = (this.timeArray[(this.counter + 1)])
        }
      }
    }
  
    getTimeData(){
      this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
      .get().subscribe(resp => {
        console.log("Accessing Database...")
        resp.forEach(resp2 =>{
          console.log("Comparing Date...")
          console.log(resp2.get('Customer_WalkInDate'))

          if(this.dateSelected == resp2.get('Customer_WalkInDate')){
            console.log("Date Comparing Done")
            
            let dbTime = resp2.get('Customer_WalkInTime').split(':')[0]; 
            let dbPeriod = resp2.get('Customer_WalkInTime').split(' ')[1];
            
            console.log(dbTime)
            console.log(dbPeriod)

            if(((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'AM')){
              console.log("Pushing Data...")
              this.firstThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("First Array: ",(this.firstThreeHours).length)
            }
            else if(((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'AM')){
              console.log("Pushing Data...")
              this.secondThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Second Array: ",(this.secondThreeHours).length)
            }
            else if(((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'AM')){
              console.log("Pushing Data...")
              this.thirdThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Third Array: ",(this.thirdThreeHours).length)
            }
            else if(((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'AM')){
              console.log("Pushing Data...")
              this.fourthThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Fourth Array: ",(this.fourthThreeHours).length)
            }
            else if(((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'PM')){
              console.log("Pushing Data...")
              this.fifthThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Fifth Array: ",(this.fifthThreeHours).length)
            }
            else if(((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'PM')){
              console.log("Pushing Data...")
              this.sixthThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Sixth Array: ",(this.sixthThreeHours).length)
            }
            else if(((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'PM')){
              console.log("Pushing Data...")
              this.seventhThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Seventh Array: ",(this.seventhThreeHours).length)
            }
            else if(((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'PM')){
              console.log("Pushing Data...")
              this.eighthThreeHours.push({
                cutomerWalkInTime: resp2.get('Customer_WalkInTime')
              });
              console.log("Eighth Array: ",(this.eighthThreeHours).length)
            }
          }
        });
      });
    }

    getDependentTime(){
      this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
      .get().subscribe(resp => {
        resp.forEach(resp2 =>{
          console.log("Accessing Dependent Database...")
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
                        console.log("Date Comparing Done")
                        let dbTime = resp6.get('Customer_WalkInTime').split(':')[0]; 
                        let dbPeriod = resp6.get('Customer_WalkInTime').split(' ')[1];
                        console.log(dbTime)
                        console.log(dbPeriod)
                        if(((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'AM')){
                          console.log("Pushing Dependent Data...")
                          this.firstThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("First Array: ",(this.firstThreeHours).length)
                        }
                        else if(((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'AM')){
                          console.log("Pushing Dependent Data...")
                          this.secondThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Second Array: ",(this.secondThreeHours).length)
                        }
                        else if(((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'AM')){
                          console.log("Pushing Dependent Data...")
                          this.thirdThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Third Array: ",(this.thirdThreeHours).length)
                        }
                        else if(((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'AM')){
                          console.log("Pushing Dependent Data...")
                          this.fourthThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Fourth Array: ",(this.fourthThreeHours).length)
                        }
                        else if(((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'PM')){
                          console.log("Pushing Dependent Data...")
                          this.fifthThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Fifth Array: ",(this.fifthThreeHours).length)
                        }
                        else if(((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'PM')){
                          console.log("Pushing Dependent Data...")
                          this.sixthThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Sixth Array: ",(this.sixthThreeHours).length)
                        }
                        else if(((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'PM')){
                          console.log("Pushing Dependent Data...")
                          this.seventhThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Seventh Array: ",(this.seventhThreeHours).length)
                        }
                        else if(((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'PM')){
                          console.log("Pushing Dependent Data...")
                          this.eighthThreeHours.push({
                            cutomerWalkInTime: resp6.get('Customer_WalkInTime')
                          });
                          console.log("Eighth Array: ",(this.eighthThreeHours).length)
                        }
                      }
                      this.timeArray.push((this.firstThreeHours).length)
                      this.timeArray.push((this.secondThreeHours).length)
                      this.timeArray.push((this.thirdThreeHours).length)
                      this.timeArray.push((this.fourthThreeHours).length)
                      this.timeArray.push((this.fifthThreeHours).length)
                      this.timeArray.push((this.sixthThreeHours).length)
                      this.timeArray.push((this.seventhThreeHours).length)
                      this.timeArray.push((this.eighthThreeHours).length)
                      console.log(this.timeArray)
                      this.maxVal();
                      this.minVal();
                      this.calculateTotal();
                      this.average = this.total/((this.timeArray).length)
                    });
                  }); 
                });
              }); 
            });
          }); 
        });
      });
    }
}