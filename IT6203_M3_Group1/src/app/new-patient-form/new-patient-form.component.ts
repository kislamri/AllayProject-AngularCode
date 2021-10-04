import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PatientService } from '../patient.service';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.css']
})
export class NewPatientFormComponent implements OnInit {

  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() dob: Date ;
  @Input() phone: string;
  @Input() patientType: string = "";
  @Input() gender: string = "";
  @Input() reasonOfVisit: string = ""
 /*  @Input() street: string = "";
  @Input() cityName: string = "";
  @Input() state: string = "";
  @Input() zip: string = ""; */


  
  public mode = 'Add'; //default mode
  
 
  private id: any; //patient ID
  private patient:any;
  servicepoint = "https://ng-patient-default-rtdb.firebaseio.com/";
  condition = false;


//initialize the call using PatientprotalService
  constructor(private router: Router, public route: ActivatedRoute,
    private _myService: PatientService, public fb:FormBuilder, 
    private db: AngularFirestore,
    private apiService: ApiService, private http: HttpClient) {
     /*  this. cityName = ""; */
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
    console.log("You submitted "  + this. firstName +
                " " + this.lastName +
                " " + this.dob +
                " " + this.phone+
                " " + this.patientType+
                " " + this.gender+
                " " + this.reasonOfVisit
               /*  " " + this.street+
                " " + this.cityName+
                " " + this.state+
                " " + this.zip */
                );
    if( this.mode =='Add')            
    this._myService.addPatient(
      this.firstName,
      this.lastName, 
      this.dob, 
      this.phone, 
      this.patientType, 
      this.gender, 
      this.reasonOfVisit
   
      );
    
    
     if( this.mode =='Edit')            
      this._myService.updatePatient(
        this.id,
        this.firstName,
        this.lastName, 
        this.dob, 
        this.phone, 
        this.patientType, 
        this.gender, 
        this.reasonOfVisit
     
        );
        this.router.navigate(['/listPatients']) ;


        this.db.collection('patient').add({
          id: this.id,
        firstName: this.firstName,
        lastName: this.lastName, 
        dob: this.dob, 
        phone: this.phone, 
        patientType: this.patientType, 
        gender: this.gender, 
        reasonOfVisit: this.reasonOfVisit
        });

  } 


}
