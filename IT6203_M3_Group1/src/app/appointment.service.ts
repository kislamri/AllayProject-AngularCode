import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getAppointment() {
        return this.http.get('http://localhost:8000/appointment');
    }

    // Uses http.post() to post data
    addAppointment(findLocation:string, planVisit:string,
        findDoctor:string, insured:string){
            this.http.post('http://localhost:8000/appointment', {
                findLocation, planVisit, findDoctor, insured })
                .subscribe((responseData) =>{
                    console.log(responseData);
                });

       // location.reload();
        }
    
    //Delete Appointment
    deleteAppointment(appointmentId: string) {
        this.http.delete("http://localhost:8000/appointment/" + appointmentId)
            .subscribe(() => {
                console.log('Deleted: ' + appointmentId);
            });
            //location.reload();
    }

    updateAppointment(appointmentId: string, findLocation: string, 
        planVisit: string, findDoctor: string, insured: string,) {
        //request path http://localhost:8000/appointment/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/appointment/" + 
        appointmentId,{ findLocation, planVisit, findDoctor, insured, })
        .subscribe(() => {
            console.log('Updated: ' + appointmentId);
        });
    }
        
}