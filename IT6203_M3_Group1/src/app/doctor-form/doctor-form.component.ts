import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  @Input() name: string = "";
  @Input() specialities: string = "";
  @Input() location: string = "" ;
  @Input() phoneNumber: string = "" ;
  @Input() visitingHours: string = "";

  public mode = 'Add'; // default mode
  private id: any; //doctor ID
  private doctor:any;
  servicepoint = "https://ng-patient-default-rtdb.firebaseio.com/";
  condition = false;

  //initialize the call using DoctorService
  constructor( 
    private router:Router,
   public route:ActivatedRoute,
   private _myService: DoctorService,
   public fb:FormBuilder,
   private db: AngularFirestore,
   private http: HttpClient
   ) {

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
    console.log("You submited: " + this.name
    + " " + this.specialities 
    + " " + this.location
    + " " + this.phoneNumber
    + " " + this.visitingHours);

    if( this.mode =='Add')            
    this._myService.addDoctor(
      this.name,
      this.specialities,
      this.location, 
      this.phoneNumber,
      this.visitingHours
      );
    
     if( this.mode =='Edit')            
      this._myService.updateDoctor(
        this.id,
        this.name,
        this.specialities,
        this.location, 
        this.phoneNumber,
        this.visitingHours
        );
  
    this.router.navigate(['listDoctor']);

    this.db.collection('doctor').add({
      id: this.id,
    name: this.name,
    specialities: this.specialities, 
    location: this.location, 
    phoneNumber: this.phoneNumber, 
    visitingHours: this.visitingHours, 
    
    });
  }
}
