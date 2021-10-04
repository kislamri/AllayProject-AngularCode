import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : ' application/json'})
};

@Injectable(  /* {providedIn: 'root'} */  )

export class DoctorService {

  constructor(private http:HttpClient) { }

  // Uses http.get() to load data
  getDoctor(){
    return this.http.get('http://localhost:8000/doctor');
  }

  // Use http.post() to post data
  addDoctor(name:string, specialities:string, location:string,
              phoneNumber: string, visitingHours:string){
    this.http.post('http://localhost:8000/doctor', {name, specialities, location, phoneNumber,
                  visitingHours })
                  .subscribe((responseData) =>{
                    console.log(responseData);
                  });
        //location.reload();          
  }

  //Delete Doctor
  deleteDoctor(doctorId: string) {
    this.http.delete('http://localhost:8000/doctor/' + doctorId)
        .subscribe(() => {
            console.log('Deleted: ' + doctorId);
        });
       // location.reload();
}
// Update Doctor
updateDoctor(doctorId: string, name: string, specialities: string,
   location:string, phoneNumber:string, visitingHours:string, 
  /* street: string,cityName:string, state: string,zip: strin */){
    //request path http://localhost:8000/capstone/5xbd456xx 
    //first and last names will be send as HTTP body parameters 
    this.http.put("http://localhost:8000/doctor/" + doctorId,{
      name, specialities, location, phoneNumber, visitingHours, 
    })
    .subscribe(() => {
      console.log('Updated: ' + doctorId);
});

}
}