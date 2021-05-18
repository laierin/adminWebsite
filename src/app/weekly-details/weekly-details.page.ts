import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-weekly-details',
  templateUrl: './weekly-details.page.html',
  styleUrls: ['./weekly-details.page.scss'],
})
export class WeeklyDetailsPage implements OnInit {
  
  @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;
  lineChart: any;
  
  public logoImg: string;

  public datePicker;

  public firstDate;
  public secondDate;
  public thirdDate;
  public fouthDate;
  public fiveDate;
  public sixDate;
  public lastDate;

  public chooseFirstDate;
  public date;

  public first = 0;
  public second = 0;
  public third = 0;
  public fouth = 0;
  public five = 0;
  public six = 0;
  public last = 0;

  public total = 0;
  public average = 0;
  public highest = 0;
  public lowest = 0;

  public firstArray = [];
  public secondArray = [];
  public thirdArray = [];
  public fouthArray = [];
  public fiveArray = [];
  public sixArray = [];
  public lastArray = [];
  public allArray = [];

  constructor(
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public globalVar: GlobalVariable,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController,
  ) {
    this.globalVar = globalVar;
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        
        this.datePicker = this.router.getCurrentNavigation().extras.state.chooseDate;
        this.date = this.router.getCurrentNavigation().extras.state.dateString;
        // this.secondDate = this.router.getCurrentNavigation().extras.state.date_2;
        // this.thirdDate = this.router.getCurrentNavigation().extras.state.date_3;
        // this.fouthDate = this.router.getCurrentNavigation().extras.state.date_4;
        // this.fiveDate = this.router.getCurrentNavigation().extras.state.date_5;
        // this.sixDate = this.router.getCurrentNavigation().extras.state.date_6;
        // this.lastDate = this.router.getCurrentNavigation().extras.state.date_7;
        console.log(this.datePicker)
      }
    });
   }

  ngOnInit() {
    this.changeLogo();
    this.getWeektoString();
    this.getTotalCustomerData();
    this.getTotalDependentData();
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

  getDetail(){
    this.datePicker = new Date(this.date);
    console.log(this.datePicker);
    
    this.first = 0;
    this.second = 0;
    this.third = 0;
    this.fouth = 0;
    this.five = 0;
    this.six = 0;
    this.last = 0;

    this.total = 0;
    this.average = 0;
    this.highest = 0;
    this.lowest = 0;
    
    this.firstArray = [];
    this.secondArray = [];
    this.thirdArray = [];
    this.fouthArray = [];
    this.fiveArray = [];
    this.sixArray = [];
    this.lastArray = [];
    this.allArray = [];

    this.lineChart.destroy();

    this.getWeektoString();
    this.getTotalCustomerData();
    this.getTotalDependentData();
  };

  getWeektoString(){

    // this.chooseFirstDate = new Date(this.datePicker);
      
    this.firstDate = new Date(this.datePicker).toDateString();
    this.secondDate = new Date(this.datePicker - - 24 * 60 * 60 * 1000).toDateString();
    this.thirdDate = new Date(this.datePicker - - 2 * 24 * 60 * 60 * 1000).toDateString();
    this.fouthDate = new Date(this.datePicker - - 3 * 24 * 60 * 60 * 1000).toDateString();
    this.fiveDate = new Date(this.datePicker - - 4 * 24 * 60 * 60 * 1000).toDateString();
    this.sixDate = new Date(this.datePicker - - 5 * 24 * 60 * 60 * 1000).toDateString();
    this.lastDate = new Date(this.datePicker - - 6 * 24 * 60 * 60 * 1000).toDateString();

    console.log(this.firstDate);
    console.log(this.secondDate);
    console.log(this.thirdDate);
    console.log(this.fouthDate);
    console.log(this.fiveDate);
    console.log(this.sixDate);
    console.log(this.lastDate);

  }

  getTotalCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 => {

        if(this.firstDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("1" + " " + "cus")
          this.firstArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
          
        }else if(this.secondDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("2" + " " + "cus")
          this.secondArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }else if(this.thirdDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("3" + " " + "cus")
          this.thirdArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }else if(this.fouthDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("4" + " " + "cus")
          this.fouthArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }else if(this.fiveDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("5" + " " + "cus")
          this.fiveArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }else if(this.sixDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("6" + " " + "cus")
          this.sixArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }else if(this.lastDate == resp2.get('Customer_WalkInDate'))
        {
          console.log("7" + " " + "cus")
          this.lastArray.push({
            dateOfWeek: resp2.get('Customer_WalkInDate')
          })
        }
      });
      // this.arrayData();
    });
  }

  getTotalDependentData(){
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 => {

        if(this.firstDate == resp2.get('Date'))
        {
          console.log("1" + " " + "dep")
          this.firstArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.secondDate == resp2.get('Date'))
        {
          console.log("2" + " " + "dep")
          this.secondArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.thirdDate == resp2.get('Date'))
        {
          console.log("3" + " " + "dep")
          this.thirdArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.fouthDate == resp2.get('Date'))
        {
          console.log("4" + " " + "dep")
          this.fouthArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.fiveDate == resp2.get('Date'))
        {
          console.log("5" + " " + "dep")
          this.fiveArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.sixDate == resp2.get('Date'))
        {
          console.log("6" + " " + "dep")
          this.sixArray.push({
            dateOfWeek: resp2.get('Date')
          })

        }else if(this.lastDate == resp2.get('Date'))
        {
          console.log("7" + " " + "dep")
          this.lastArray.push({
            dateOfWeek: resp2.get('Date')
          })
        }
      });
      this.arrayData();
      this.getTotal();
      this.getAverage();
      this.getHighest();
      this.getLowest();
    });
  }

  arrayData(){
    this.first = this.firstArray.length;
    this.second = this.secondArray.length;
    this.third = this.thirdArray.length;
    this.fouth = this.fouthArray.length;
    this.five = this.fiveArray.length;
    this.six = this.sixArray.length;
    this.last = this.lastArray.length;

    this.allArray.push(this.firstArray.length);
    this.allArray.push(this.secondArray.length);
    this.allArray.push(this.thirdArray.length);
    this.allArray.push(this.fouthArray.length);
    this.allArray.push(this.fiveArray.length);
    this.allArray.push(this.sixArray.length);
    this.allArray.push(this.lastArray.length);

    console.log(this.first)
    console.log(this.second)
    console.log(this.third)
    console.log(this.fouth)
    console.log(this.five)
    console.log(this.six)
    console.log(this.last)
    console.log(this.allArray)

    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: [
          this.firstDate.split(' ') [0] + " " + this.firstDate.split(' ') [1] + " " + this.firstDate.split(' ') [2], 
          this.secondDate.split(' ') [0] + " " + this.secondDate.split(' ') [1] + " " + this.secondDate.split(' ') [2],
          this.thirdDate.split(' ') [0] + " " + this.thirdDate.split(' ') [1] + " " + this.thirdDate.split(' ') [2], 
          this.fouthDate.split(' ') [0] + " " + this.fouthDate.split(' ') [1] + " " + this.fouthDate.split(' ') [2],
          this.fiveDate.split(' ') [0] + " " + this.fiveDate.split(' ') [1] + " " + this.fiveDate.split(' ') [2],
          this.sixDate.split(' ') [0] + " " + this.sixDate.split(' ') [1] + " " + this.sixDate.split(' ') [2],
          this.lastDate.split(' ') [0] + " " + this.lastDate.split(' ') [1] + " " + this.lastDate.split(' ') [2]
        ],

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

            data: [this.first, this.second, this.third, this.fouth, this.five, this.six, this.last],
            // data: [7, 2, 5, 1, 2, 6, 3],
            spanGaps: false,
          }
        ]
      }
    });
  }
  
  getTotal(){
    for(var x=0; x<this.allArray.length; x++){
      this.total = this.total + (this.allArray[x])
    }
    console.log("Total: " + this.total )
  }

  getAverage(){
    this.average = this.total/7;
    console.log("Average: " + this.average.toFixed(2))
  }

  getHighest(){
    this.highest = Math.max(...this.allArray);
    console.log("Highest: " + this.highest)

  }

  getLowest(){
    this.lowest = Math.min(...this.allArray);
    console.log("Lowest: " + this.lowest)
  }

}
