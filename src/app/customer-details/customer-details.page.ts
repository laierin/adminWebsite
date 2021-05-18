import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalVariable } from '../global-variables';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
})
export class CustomerDetailsPage implements OnInit {

  // letterObj = {
  //   to: '',
  //   from: '',
  //   text: ''
  // }
  public customerArray = [];
  public dependentArray = [];

  public datePicker;
  public dateSelected;

  public logoImg: string;

  public pdfObj = null;
  public customerName;
  public cusName: string="";
  public cusHP: string="";
  public cusTemp: string="";
  public cusTime: string="";
  public depName: string="";
  public depHP: string="";
  public depTemp: string="";
  public depTime: string="";

  constructor(
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public globalVar: GlobalVariable,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController,
    private plt: Platform, 
    private file: File, 
    private fileOpener: FileOpener
  ) {

    this.globalVar = globalVar; 
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.dateSelected = this.router.getCurrentNavigation().extras.state.selectedDate;
        console.log(this.dateSelected)
      }
    });
  }

  ngOnInit() {
    this.getCustomerData();
    this.getDependentData();
    this.changeLogo();
    
  }
  
  changeLogo(){
    if(this.globalVar.current_shopID == "6YcKQ6C6hnJP5h2U4EVp"){
      this.logoImg = '../../assets/hnmLogo.png';
      // console.log("h&m");
    }
    else if (this.globalVar.current_shopID == "KqfmOPxf4e4OiM8gnKbj"){
      this.logoImg = '../../assets/sushikinglogo.png';
      // console.log("sushi king");
    }else if (this.globalVar.current_shopID == "bU8jSc6I97kSp5vwp3yT"){
      this.logoImg = '../../assets/watsonslogo.png';
      // console.log("watson");
    }
    else{
      // console.log("Logo error")
    }
  }

  getCustomerDetails(){
    this.customerArray = [];
    this.dependentArray = [];
    this.dateSelected = new Date(this.dateSelected).toDateString();
    console.log(this.dateSelected);
    this.getCustomerData();
    this.getDependentData();
  }

  getCustomerData(){
    this.afs.collection('CustomerRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 =>{
        this.afs.collection('Customer', ref => ref.where('Customer_ID', '==', resp2.get('Customer_ID')))
        .get().subscribe(resp3 => {
          resp3.forEach(resp4 => {
            if(this.dateSelected == resp2.get('Customer_WalkInDate')){
              console.log("Customer")
              this.customerArray.push({
                customerID: resp4.get('Customer_ID'), //Customer
                customerName: resp4.get('Customer_Name'), //Customer
                cutomerContact: resp4.get('Customer_Contact'),//Customer
                cutomerWalkInDate: resp2.get('Customer_WalkInDate'), //CustomerRecord
                cutomerWalkInTime: resp2.get('Customer_WalkInTime'), //CustomerRecord
                customerTemp: resp2.get('Customer_Temperature') //Customer
              });
            }
          });
        }); 
      });
    });
  }

  getDependentData(){
    this.afs.collection('DependentRecord', ref => ref.where('Shop_ID', '==', this.globalVar.current_shopID))
    .get().subscribe(resp => {
      resp.forEach(resp2 =>{
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
                      console.log("Dependent")
                      this.dependentArray.push({
                        dependentName: resp4.get('Dependent_Name'), //Dependent 
                        dependentPhoneNum: resp8.get('Customer_Contact'), //Customer 
                        dependentwalkInDate: resp2.get('Date'), //DependentRecord 
                        dependentwalkInTime: resp6.get('Customer_WalkInTime'), //CustomerRecord
                        dependentTemp: resp2.get('Dependent_Temperature') //DependentRecord 
                      });
                    }
                  });
                }); 
              });
            }); 
          });
        }); 
      });
    });
  }

  createPDF() {

	var body:string[][] = [];

	body = [['Name','Phone Number','Temperature','Walk In Time']];
    for(var x=0; x<this.customerArray.length; x++) { 
		  this.cusName=this.customerArray[x].customerName;
		  this.cusHP=this.customerArray[x].cutomerContact;
		  this.cusTemp=this.customerArray[x].customerTemp;
		  this.cusTime=this.customerArray[x].cutomerWalkInTime;
		  body.push([this.cusName,this.cusHP,this.cusTemp, this.cusTime]);
	 }
   for(var x=0; x<this.dependentArray.length; x++) { 
    this.depName=this.dependentArray[x].dependentName;
    this.depHP=this.dependentArray[x].dependentPhoneNum;
    this.depTemp=this.dependentArray[x].dependentTemp;
    this.depTime=this.dependentArray[x].dependentwalkInTime;
    body.push([this.depName,this.depHP,this.depTemp, this.depTime]);
 }

    var docDefinition = {
      content: [

        {text: 'Record Date:', style: 'subheader' },
        {text: new Date(this.dateSelected).toDateString()},

        // { text: 'REMINDER', style: 'header' },
        // { text: new Date().toTimeString(), alignment: 'right' },
 
        // { text: 'From', style: 'subheader' },
        // { text: this.letterObj.from },
 
        // { text: 'To', style: 'subheader' },
        // this.letterObj.to,
 
        // { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          table: {
          body: body
        }
      }
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  getData(){
    console.log("pdf")
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
    
  }

}