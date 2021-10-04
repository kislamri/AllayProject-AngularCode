import { Component, OnInit, Input } from '@angular/core';
import { SicknessService } from '../sickness.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sickness-form',
  templateUrl: './sickness-form.component.html',
  styleUrls: ['./sickness-form.component.css']
})
export class SicknessFormComponent implements OnInit {

  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() emailId: string = "";
  @Input() phoneNumber: number = 0;
  @Input() patientType: string = "";
  @Input() dateOfBirth: string = "";
  @Input() symptoms1: string = "";
  @Input() symptoms2: string = "";
  @Input() symptoms3: string = "";
  @Input() diseases: string = "";

  public mode = 'Add';
  private id: any; //appointment ID
  private sickness: any;

  constructor(private _myService: SicknessService,private router:Router,public route: ActivatedRoute,
    public fb:FormBuilder,
    private db: AngularFirestore,
   private http: HttpClient) { }


ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id')){
          this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');

           //request student info based on the id
          this._myService.getSickness(this.id).subscribe(
              data => { 
                  //read data and assign to private variable student
                  this.sickness = data;
                  //populate the firstName and lastName on the page
                  //notice that this is done through the two-way bindings
                  this.firstName = this.sickness.firstName;
                  this.lastName = this.sickness.lastName;
                  this.emailId = this.sickness.emailId;
                  this.phoneNumber = this.sickness.phoneNumber;
                  this.patientType = this.sickness.patientType;
                  this.dateOfBirth = this.sickness.dateOfBirth;
                  this.symptoms1 = this.sickness.symptoms1;
                  this.symptoms2 = this.sickness.symptoms2;
                  this.symptoms3 = this.sickness.symptoms3;
                  this.diseases = this.sickness.diseases;
                },
              err => console.error(err),
              () => console.log('finished loading')
          );
      } 
      else {
          this.mode = 'Add';
          this.id = null; 
      }
  });
}

  
onSubmit(){
    console.log("You submitted: " + this.firstName + " " + this.lastName);
    if (this.mode == 'Add')
    this._myService.addSickness(this.firstName ,this.lastName, this.emailId,this.phoneNumber,this.patientType,this.dateOfBirth,this.symptoms1,this.symptoms2,this.symptoms3,this.diseases);
if (this.mode == 'Edit')
    this._myService.updateSickness(this.id,this.firstName ,this.lastName, this.emailId,this.phoneNumber,this.patientType,this.dateOfBirth,this.symptoms1,this.symptoms2,this.symptoms3,this.diseases);
    this.router.navigate(['/listSickness']);

    this.db.collection('sickness').add({

     id:this.id,
      fristName:this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      phoneNumber: this.phoneNumber,
      patientType: this.patientType,
      dataOfBirth: this.dateOfBirth,
      symptoms1: this.symptoms1,
      symptoms2: this.symptoms2,
      symptoms3:this.symptoms3,
      diseases:this.diseases
    
    });

}

}
