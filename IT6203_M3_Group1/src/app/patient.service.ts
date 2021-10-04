import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : ' application/json'})
};


@Injectable(  /* {providedIn: 'root'} */  )

export class PatientService {

  constructor(private http:HttpClient) { }

  // Uses http.get() to load data
  getPatient(){
    return this.http.get('http://localhost:8000/patient');
  }

  // Use http.post() to post data

  addPatient(firstName:string, lastName:string, dob:Date, phone:string,
              patientType: string, gender:string, reasonOfVisit:string
              /*  street:string,cityName:string, state:string, zip:string */){
    this.http.post('http://localhost:8000/patient', {firstName, lastName, dob, 
    phone, patientType,gender,reasonOfVisit/* ,street, state, cityName, zip */})
                  .subscribe((responseData) =>{
                    console.log(responseData);
                  });
        //location.reload();          
  }

  //Delete Patient
  deletePatient(patientId: string) {
    this.http.delete('http://localhost:8000/patient/' + patientId)
        .subscribe(() => {
            console.log('Deleted: ' + patientId);
        });
       // location.reload();
}

// Update Patient
updatePatient(patientId: string, firstName: string, lastName: string,
  dob:Date, phone:string, patientType:string, gender:string, reasonOfVisit:string,
  /* street: string,cityName:string, state: string,zip: strin */){
    //request path http://localhost:8000/capstone/5xbd456xx 
    //first and last names will be send as HTTP body parameters 
    this.http.put("http://localhost:8000/patient/" + patientId,{
      firstName, lastName, dob, phone, patientType, gender,reasonOfVisit, /* street,
      cityName, state, zip */
    })
    .subscribe(() => {
      console.log('Updated: ' + patientId);

});


}

}
