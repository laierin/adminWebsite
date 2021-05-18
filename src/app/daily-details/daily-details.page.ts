import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-daily-details',
  templateUrl: './daily-details.page.html',
  styleUrls: ['./daily-details.page.scss'],
})

export class DailyDetailsPage implements OnInit {

  @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;
  lineChart: any;

  public logoImg: string;

  public firstThreeHours = [];
  public secondThreeHours = [];
  public thirdThreeHours = [];
  public fourthThreeHours = [];
  public fifthThreeHours = [];
  public sixthThreeHours = [];
  public seventhThreeHours = [];
  public eighthThreeHours = [];

  public timeArray = [];

  public first = 0;
  public second = 0;
  public third = 0;
  public fouth = 0;
  public five = 0;
  public six = 0;
  public seven = 0;
  public eight = 0;

  public highestValue = 0;
  public lowestValue = 0;
  public average = 0;
  public total = 0;
  public finalTotal = 0;
  
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
    this.changeLogo();
    this.getTimeData();
    this.getDependentTime();

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

  this.lineChart.destroy();

  this.dateSelected = new Date(this.dateSelected).toDateString();
  console.log(this.dateSelected)
  this.getTimeData();
  this.getDependentTime();

  }

  calculateTotal(){
    for (this.counter = 0;this.counter < 8; this.counter++){
      this.total = this.total + (this.timeArray[this.counter])
    }
  }

  getTimeData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      console.log("Customer Database...")
      resp.forEach(resp2 =>{
        console.log("Comparing Date...")
        console.log(resp2.get('Customer_WalkInDate'))
        if(this.dateSelected == resp2.get('Customer_WalkInDate')){
          console.log("Date Comparing Done")
          let dbTime = resp2.get('Customer_WalkInTime').split(':')[0]; 
          let dbPeriod = resp2.get('Customer_WalkInTime').split(' ')[1];
          console.log(dbTime)
          console.log(dbPeriod)
          
          if((((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'AM')) || (dbTime == '00') || (dbTime == '01') || (dbTime == '02')){
            console.log("Pushing Data...")
            this.firstThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("First Array: ",(this.firstThreeHours).length)
          }
          else if((((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'AM')) || (dbTime == '03') || (dbTime == '04') || (dbTime == '05')){
            console.log("Pushing Data...")
            this.secondThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Second Array: ",(this.secondThreeHours).length)
          }
          else if((((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'AM')) || (dbTime == '06') || (dbTime == '07') || (dbTime == '08')){
            console.log("Pushing Data...")
            this.thirdThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Third Array: ",(this.thirdThreeHours).length)
          }
          else if((((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'AM')) || (dbTime == '09') || (dbTime == '10') || (dbTime == '11')){
            console.log("Pushing Data...")
            this.fourthThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Fourth Array: ",(this.fourthThreeHours).length)
          }
          else if((((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'PM')) || (dbTime == '12') || (dbTime == '13') || (dbTime == '14')){
            console.log("Pushing Data...")
            this.fifthThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Fifth Array: ",(this.fifthThreeHours).length)
          }
          else if((((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'PM')) || (dbTime == '15') || (dbTime == '16') || (dbTime == '17')){
            console.log("Pushing Data...")
            this.sixthThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Sixth Array: ",(this.sixthThreeHours).length)
          }
          else if((((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'PM')) || (dbTime == '18') || (dbTime == '19') || (dbTime == '20')){
            console.log("Pushing Data...")
            this.seventhThreeHours.push({
              cutomerWalkInTime: resp2.get('Customer_WalkInTime')
            });
            console.log("Seventh Array: ",(this.seventhThreeHours).length)
          }
          else if((((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'PM')) || (dbTime == '21') || (dbTime == '22') || (dbTime == '23')){
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
        console.log("Dependent Database")
        this.afs.collection('CustomerRecord', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        .get().subscribe(resp3 => {
          resp3.forEach(resp4 => {
            if(this.dateSelected == resp2.get('Date')){
              console.log("Date Comparing Done")
              let dbTime = resp4.get('Customer_WalkInTime').split(':')[0]; 
              let dbPeriod = resp4.get('Customer_WalkInTime').split(' ')[1];
              console.log(dbTime)
              console.log(dbPeriod)
              if((((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'AM')) || (dbTime == '00') || (dbTime == '01') || (dbTime == '02')){
                console.log("Pushing Dependent Data...")
                this.firstThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("First Array: ",(this.firstThreeHours).length)
              }
              else if((((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'AM')) || (dbTime == '03') || (dbTime == '04') || (dbTime == '05')){
                console.log("Pushing Dependent Data...")
                this.secondThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Second Array: ",(this.secondThreeHours).length)
              }
              else if((((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'AM')) || (dbTime == '06') || (dbTime == '07') || (dbTime == '08')){
                console.log("Pushing Dependent Data...")
                this.thirdThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Third Array: ",(this.thirdThreeHours).length)
              }
              else if((((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'AM')) || (dbTime == '09') || (dbTime == '10') || (dbTime == '11')){
                console.log("Pushing Dependent Data...")
                this.fourthThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Fourth Array: ",(this.fourthThreeHours).length)
              }
              else if((((dbTime == '12') || (dbTime == '1') || (dbTime == '2')) && (dbPeriod == 'PM')) || (dbTime == '12') || (dbTime == '13') || (dbTime == '14')){
                console.log("Pushing Dependent Data...")
                this.fifthThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Fifth Array: ",(this.fifthThreeHours).length)
              }
              else if((((dbTime == '3') || (dbTime == '4') || (dbTime == '5')) && (dbPeriod == 'PM')) || (dbTime == '15') || (dbTime == '16') || (dbTime == '17')){
                console.log("Pushing Dependent Data...")
                this.sixthThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Sixth Array: ",(this.sixthThreeHours).length)
              }
              else if((((dbTime == '6') || (dbTime == '7') || (dbTime == '8')) && (dbPeriod == 'PM')) || (dbTime == '18') || (dbTime == '19') || (dbTime == '20')){
                console.log("Pushing Dependent Data...")
                this.seventhThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Seventh Array: ",(this.seventhThreeHours).length)
              }
              else if((((dbTime == '9') || (dbTime == '10') || (dbTime == '11')) && (dbPeriod == 'PM')) || (dbTime == '21') || (dbTime == '22') || (dbTime == '23')){
                console.log("Pushing Dependent Data...")
                this.eighthThreeHours.push({
                  cutomerWalkInTime: resp4.get('Customer_WalkInTime')
                });
                console.log("Eighth Array: ",(this.eighthThreeHours).length)
              }
            }
          });
          this.arrayData();
        }); 
      });
    });
  }

  arrayData(){
    this.first = this.firstThreeHours.length;
    this.second = this.secondThreeHours.length;
    this.third = this.thirdThreeHours.length;
    this.fouth = this.fourthThreeHours.length;
    this.five = this.fifthThreeHours.length;
    this.six = this.sixthThreeHours.length;
    this.seven = this.seventhThreeHours.length;
    this.eight = this.eighthThreeHours.length;

    this.timeArray.push((this.firstThreeHours).length)
    this.timeArray.push((this.secondThreeHours).length)
    this.timeArray.push((this.thirdThreeHours).length)
    this.timeArray.push((this.fourthThreeHours).length)
    this.timeArray.push((this.fifthThreeHours).length)
    this.timeArray.push((this.sixthThreeHours).length)
    this.timeArray.push((this.seventhThreeHours).length)
    this.timeArray.push((this.eighthThreeHours).length)

    console.log(this.first)
    console.log(this.second)
    console.log(this.third)
    console.log(this.fouth)
    console.log(this.five)
    console.log(this.six)
    console.log(this.seven)
    console.log(this.eight)

    console.log(this.timeArray)

    this.highestValue = Math.max(...this.timeArray);
    this.lowestValue = Math.min(...this.timeArray);
    this.calculateTotal();
    this.finalTotal = this.total/3
    this.average = this.total/((this.timeArray).length)

    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['12AM-2AM', '3AM-5AM', '6AM-8AM', '9AM-11AM', '12PM-2PM', '3PM-5PM', '6PM-8PM', '9PM-11PM'],

        datasets: [
          {
            label: 'Total Number of People',
            fill: false,
            tension: 0.05,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.first, this.second, this.third, this.fouth, this.five, this.six, this.seven, this.eight],
            // data: [this.first, 2, 5, 1, 2, 6, 3],
            spanGaps: false,
          }
        ]
      }
    });
  }
}