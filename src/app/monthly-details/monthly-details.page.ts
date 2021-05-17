import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.page.html',
  styleUrls: ['./monthly-details.page.scss'],
})
export class MonthlyDetailsPage implements OnInit {

  @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;
  lineChart: any;

  public datePicker;
  public dateSelected: string;
  public monthSelected;

  public logoImg: string;

  public date_1 = 0;
  public date_2 = 0;
  public date_3 = 0;
  public date_4 = 0;
  public date_5 = 0;
  public date_6 = 0;
  public date_7 = 0;
  public date_8 = 0;
  public date_9 = 0;
  public date_10 = 0;
  public date_11 = 0;
  public date_12 = 0;
  public date_13 = 0;
  public date_14 = 0;
  public date_15 = 0;
  public date_16 = 0;
  public date_17 = 0;
  public date_18 = 0;
  public date_19 = 0;
  public date_20 = 0;
  public date_21 = 0;
  public date_22 = 0;
  public date_23 = 0;
  public date_24 = 0;
  public date_25 = 0;
  public date_26 = 0;
  public date_27 = 0;
  public date_28 = 0;
  public date_29 = 0;
  public date_30 = 0;
  public date_31 = 0;

  public total = 0;
  public average = 0;
  public highest = 0;
  public lowest = 0;

  public date_1_Array = [];
  public date_2_Array = [];
  public date_3_Array = [];
  public date_4_Array = [];
  public date_5_Array = [];
  public date_6_Array = [];
  public date_7_Array = [];
  public date_8_Array = [];
  public date_9_Array = [];
  public date_10_Array = [];
  public date_11_Array = [];
  public date_12_Array = [];
  public date_13_Array = [];
  public date_14_Array = [];
  public date_15_Array = [];
  public date_16_Array = [];
  public date_17_Array = [];
  public date_18_Array = [];
  public date_19_Array = [];
  public date_20_Array = [];
  public date_21_Array = [];
  public date_22_Array = [];
  public date_23_Array = [];
  public date_24_Array = [];
  public date_25_Array = [];
  public date_26_Array = [];
  public date_27_Array = [];
  public date_28_Array = [];
  public date_29_Array = [];
  public date_30_Array = [];
  public date_31_Array = [];
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
          this.monthSelected = this.router.getCurrentNavigation().extras.state.selectedMonth;
          console.log(this.monthSelected)
        }
      });
    }

  ngOnInit() {
    this.changeLogo();
    this.getTotalCustomer();
    this.getTotalDependent();

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
      console.log("Logo error");
    }
  }

  getDetails(){
    console.log("Second page detail button");
    this.dateSelected = new Date(this.dateSelected).toDateString();
    console.log(this.dateSelected);
    this.monthSelected = this.dateSelected.split(' ')[1] + " " + this.dateSelected.split(' ')[3] ;
    console.log(this.monthSelected);
    // all clear array
    this.date_1 = 0;
    this.date_2 = 0;
    this.date_3 = 0;
    this.date_4 = 0;
    this.date_5 = 0;
    this.date_6 = 0;
    this.date_7 = 0;
    this.date_8 = 0;
    this.date_9 = 0;
    this.date_10 = 0;
    this.date_11 = 0;
    this.date_12 = 0;
    this.date_13 = 0;
    this.date_14 = 0;
    this.date_15 = 0;
    this.date_16 = 0;
    this.date_17 = 0;
    this.date_18 = 0;
    this.date_19 = 0;
    this.date_20 = 0;
    this.date_21 = 0;
    this.date_22 = 0;
    this.date_23 = 0;
    this.date_24 = 0;
    this.date_25 = 0;
    this.date_26 = 0;
    this.date_27 = 0;
    this.date_28 = 0;
    this.date_29 = 0;
    this.date_30 = 0;
    this.date_31 = 0;

    this.total = 0;
    this.average = 0;
    this.highest = 0;
    this.lowest = 0;

    this.date_1_Array = [];
    this.date_2_Array = [];
    this.date_3_Array = [];
    this.date_4_Array = [];
    this.date_5_Array = [];
    this.date_6_Array = [];
    this.date_7_Array = [];
    this.date_8_Array = [];
    this.date_9_Array = [];
    this.date_10_Array = [];
    this.date_11_Array = [];
    this.date_12_Array = [];
    this.date_13_Array = [];
    this.date_14_Array = [];
    this.date_15_Array = [];
    this.date_16_Array = [];
    this.date_17_Array = [];
    this.date_18_Array = [];
    this.date_19_Array = [];
    this.date_20_Array = [];
    this.date_21_Array = [];
    this.date_22_Array = [];
    this.date_23_Array = [];
    this.date_24_Array = [];
    this.date_25_Array = [];
    this.date_26_Array = [];
    this.date_27_Array = [];
    this.date_28_Array = [];
    this.date_29_Array = [];
    this.date_30_Array = [];
    this.date_31_Array = [];
    this.allArray = [];

    this.lineChart.destroy();

    this.getTotalCustomer();
    this.getTotalDependent();
  }


  getTotalCustomer(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      console.log("Customer");
      resp.forEach(resp2 => {

        let month = resp2.get('Customer_WalkInDate').split(' ') [1] + " " + resp2.get('Customer_WalkInDate').split(' ') [3];
        let day = resp2.get('Customer_WalkInDate').split(' ') [2];

        if(month == this.monthSelected)
        {
          if(day == "01"){
            console.log("1 cus");
            this.date_1_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "02"){
            console.log("2 cus");
            this.date_2_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "03"){
            console.log("3 cus");
            this.date_3_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "04"){
            console.log("4 cus");
            this.date_4_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "05"){
            console.log("5 cus");
            this.date_5_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "06"){
            console.log("6 cus");
            this.date_6_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "07"){
            console.log("7 cus");
            this.date_7_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "08"){
            console.log("8 cus");
            this.date_8_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "09"){
            console.log("9 cus");
            this.date_9_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "10"){
            console.log("10 cus");
            this.date_10_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "11"){
            console.log("11 cus");
            this.date_11_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "12"){
            console.log("12 cus");
            this.date_12_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })
          }else if(day == "13"){
            console.log("13 cus");
            this.date_13_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "14"){
            console.log("14 cus");
            this.date_14_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "15"){
            console.log("15 cus");
            this.date_15_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "16"){
            console.log("16 cus");
            this.date_16_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "17"){
            console.log("17 cus");
            this.date_17_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "18"){
            console.log("18 cus");
            this.date_18_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "19"){
            console.log("19 cus");
            this.date_19_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "20"){
            console.log("20 cus");
            this.date_20_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "21"){
            console.log("21 cus");
            this.date_21_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "22"){
            console.log("22 cus");
            this.date_22_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "23"){
            console.log("23 cus");
            this.date_23_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "24"){
            console.log("24 cus");
            this.date_24_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "25"){
            console.log("25 cus");
            this.date_25_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })
          }else if(day == "26"){
            console.log("26 cus");
            this.date_26_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "27"){
            console.log("27 cus");
            this.date_27_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })
          }else if(day == "28"){
            console.log("28 cus");
            this.date_28_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "29"){
            console.log("29 cus");
            this.date_29_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })
          }else if(day == "30"){
            console.log("30 cus");
            this.date_30_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })

          }else if(day == "31"){
            console.log("31 cus");
            this.date_31_Array.push({
              dateOfMonth: resp2.get('Customer_WalkInDate')
            })
          }
        }
      });
      // this.arrayData();
    });
  }

  getTotalDependent(){
    
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      console.log("Dependent");
      resp.forEach(resp2 => {

        let depmonth = resp2.get('Date').split(' ') [1] + " " + resp2.get('Date').split(' ') [3];
        let depday = resp2.get('Date').split(' ') [2];

        if(depmonth == this.monthSelected)
        {

          if(depday == "01"){
            console.log("1");
            this.date_1_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "02"){
            console.log("02");
            this.date_2_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "03"){
            console.log("3");
            this.date_3_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "04"){
            console.log("4");
            this.date_4_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "05"){
            console.log("5");
            this.date_5_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "06"){
            console.log("6");
            this.date_6_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "07"){
            console.log("7");
            this.date_7_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "08"){
            console.log("8");
            this.date_8_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "09"){
            console.log("9");
            this.date_9_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "10"){
            console.log("10");
            this.date_10_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "11"){
            console.log("11");
            this.date_11_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "12"){
            console.log("12");
            this.date_12_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "13"){
            console.log("13");
            this.date_13_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "14"){
            console.log("14");
            this.date_14_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "15"){
            console.log("15");
            this.date_15_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "16"){
            console.log("16");
            this.date_16_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "17"){
            console.log("17");
            this.date_17_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "18"){
            console.log("18");
            this.date_18_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "19"){
            console.log("19");
            this.date_19_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "20"){
            console.log("20");
            this.date_20_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "21"){
            console.log("21");
            this.date_21_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "22"){
            console.log("22");
            this.date_22_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "23"){
            console.log("23");
            this.date_23_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "24"){
            console.log("24");
            this.date_24_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "25"){
            console.log("25");
            this.date_25_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "26"){
            console.log("26");
            this.date_26_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "27"){
            console.log("27");
            this.date_27_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "28"){
            console.log("28");
            this.date_28_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "29"){
            console.log("29");
            this.date_29_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "30"){
            console.log("30");
            this.date_30_Array.push({
              dateOfMonth: resp2.get('Date')
            })

          }else if(depday == "31"){
            console.log("31");
            this.date_31_Array.push({
              dateOfMonth: resp2.get('Date')
            })
          }
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
    this.date_1 = this.date_1_Array.length;
    this.date_2 = this.date_2_Array.length;
    this.date_3 = this.date_3_Array.length;
    this.date_4 = this.date_4_Array.length;
    this.date_5 = this.date_5_Array.length;
    this.date_6 = this.date_6_Array.length;
    this.date_7 = this.date_7_Array.length;
    this.date_8 = this.date_8_Array.length;
    this.date_9 = this.date_9_Array.length;
    this.date_10 = this.date_10_Array.length;
    this.date_11 = this.date_11_Array.length;
    this.date_12 = this.date_12_Array.length;
    this.date_13 = this.date_13_Array.length;
    this.date_14 = this.date_14_Array.length;
    this.date_15 = this.date_15_Array.length;
    this.date_16 = this.date_16_Array.length;
    this.date_17 = this.date_17_Array.length;
    this.date_18 = this.date_18_Array.length;
    this.date_19 = this.date_19_Array.length;
    this.date_20 = this.date_20_Array.length;
    this.date_21 = this.date_21_Array.length;
    this.date_22 = this.date_22_Array.length;
    this.date_23 = this.date_23_Array.length;
    this.date_24 = this.date_24_Array.length;
    this.date_25 = this.date_25_Array.length;
    this.date_26 = this.date_26_Array.length;
    this.date_27 = this.date_27_Array.length;
    this.date_28 = this.date_28_Array.length;
    this.date_29 = this.date_29_Array.length;
    this.date_30 = this.date_30_Array.length;
    this.date_31 = this.date_31_Array.length;

    this.allArray.push(this.date_1_Array.length);
    this.allArray.push(this.date_2_Array.length);
    this.allArray.push(this.date_3_Array.length);
    this.allArray.push(this.date_4_Array.length);
    this.allArray.push(this.date_5_Array.length);
    this.allArray.push(this.date_6_Array.length);
    this.allArray.push(this.date_7_Array.length);
    this.allArray.push(this.date_8_Array.length);
    this.allArray.push(this.date_9_Array.length);
    this.allArray.push(this.date_10_Array.length);
    this.allArray.push(this.date_11_Array.length);
    this.allArray.push(this.date_12_Array.length);
    this.allArray.push(this.date_13_Array.length);
    this.allArray.push(this.date_14_Array.length);
    this.allArray.push(this.date_15_Array.length);
    this.allArray.push(this.date_16_Array.length);
    this.allArray.push(this.date_17_Array.length);
    this.allArray.push(this.date_18_Array.length);
    this.allArray.push(this.date_19_Array.length);
    this.allArray.push(this.date_20_Array.length);
    this.allArray.push(this.date_21_Array.length);
    this.allArray.push(this.date_22_Array.length);
    this.allArray.push(this.date_23_Array.length);
    this.allArray.push(this.date_24_Array.length);
    this.allArray.push(this.date_25_Array.length);
    this.allArray.push(this.date_26_Array.length);
    this.allArray.push(this.date_27_Array.length);
    this.allArray.push(this.date_28_Array.length);
    this.allArray.push(this.date_29_Array.length);
    this.allArray.push(this.date_30_Array.length);
    this.allArray.push(this.date_31_Array.length);

    console.log(this.date_1)
    console.log(this.date_2)
    console.log(this.date_3)
    console.log(this.date_4)
    console.log(this.date_5)
    console.log(this.date_6)
    console.log(this.date_7)
    console.log(this.date_8)
    console.log(this.date_9)
    console.log(this.date_10)
    console.log(this.date_11)
    console.log(this.date_12)
    console.log(this.date_13)
    console.log(this.date_14)
    console.log(this.date_15)
    console.log(this.date_16)
    console.log(this.date_17)
    console.log(this.date_18)
    console.log(this.date_19)
    console.log(this.date_20)
    console.log(this.date_21)
    console.log(this.date_22)
    console.log(this.date_23)
    console.log(this.date_24)
    console.log(this.date_25)
    console.log(this.date_26)
    console.log(this.date_27)
    console.log(this.date_28)
    console.log(this.date_29)
    console.log(this.date_30)
    console.log(this.date_31)
    
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
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

            data: [ this.date_1, this.date_2, this.date_3, this.date_4, this.date_5, this.date_6, this.date_7, this.date_8, this.date_9, this.date_10,
                    this.date_11, this.date_12, this.date_13, this.date_14, this.date_15, this.date_16, this.date_17, this.date_18, this.date_19, this.date_20,
                    this.date_21, this.date_22, this.date_23, this.date_24, this.date_25, this.date_26, this.date_27, this.date_28, this.date_29, this.date_30, this.date_31],
            // data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,  
            //         1, 2, 5, 1, 2, 6, 3, 5, 8, 8,  
            //         1, 2, 5, 1, 2, 6, 3, 5, 8, 8, 9],
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
    this.average = this.total/31;
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
