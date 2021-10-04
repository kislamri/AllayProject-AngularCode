import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { ApiService } from '../api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Input() findLocation: string = "";
  @Input() planVisit: string = "";
  @Input() findDoctor: string = "";
  @Input() insured: string = "";

  public mode = 'Add'; // default mode
  private id: any; //appointment ID
  private appointment:any;
  

  //initialize the call using AppointmentService
  constructor( 
    private router:Router,
    private api: ApiService,
   public route:ActivatedRoute,
   private _myService: AppointmentService,
   public fb:FormBuilder,
   private db: AngularFirestore,
   private http: HttpClient) {

    }
   bindedTwoWays = '';

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if (paramMap.has('_id'))
      { this.mode = 'Edit'; /*request had a parameter _id*/
        this.id = paramMap.get('_id');
      }
      
      else{
        this.mode = 'Add';
        this.id = null;
      }

    });
    
  }
  
  onSubmit(){
    console.log("You submited: " + this.findLocation
    + " " + this.planVisit 
    + " " + this.findDoctor
    + " " + this.insured);

    if( this.mode =='Add')            
    this._myService.addAppointment(
      this.findLocation,
      this.planVisit, 
      this.findDoctor,
      this.insured
      );
    
     if( this.mode =='Edit')            
      this._myService.updateAppointment(
        this.id,
        this.findLocation,
        this.planVisit, 
        this.findDoctor,
        this.insured
        );
  
    this.router.navigate(['listAppointments']);

    this.db.collection('appointment').add({

   
      findLocation: this.findLocation,
      planVisit:this.planVisit, 
      findDoctor:this.findDoctor,
      insured:this.insured

    });
  }

}
 
 