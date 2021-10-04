import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewPatientFormComponent } from './new-patient-form/new-patient-form.component';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
   
}

apiCall(){
 return this.http.get('https://jsonplaceholder.typicode/')
}

//CRUD Methods for consuming API




}
