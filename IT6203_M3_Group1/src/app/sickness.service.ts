import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SicknessService{
    constructor(private http:HttpClient) {}

    // Uses http.get() to load data
    getSickness(sicknessId: string) {
        return this.http.get('http://localhost:8000/sickness/');
    } 
   
    
    addSickness(firstName: string, lastName: string,emailId: string,phoneNumber: number, patientType:string,dateOfBirth:string,
        symptoms1:string,symptoms2:string,symptoms3:string,diseases:string) {
        this.http.post('http://localhost:8000/sickness',{ firstName, lastName,emailId, 
                        phoneNumber, dateOfBirth,patientType,symptoms1,symptoms2,symptoms3,diseases})
            .subscribe((responseData) => {
                console.log(responseData);
            });
            
            
        }
        updateSickness(sicknessId: string,firstName: string, lastName: string,emailId: string,
                        phoneNumber: number, patientType:string,dateOfBirth:string,
                        symptoms1:string,symptoms2:string,symptoms3:string,diseases:string,) {
            //request path http://localhost:8000/students/5xbd456xx 
            //first and last names will be send as HTTP body parameters 
            this.http.put("http://localhost:8000/sickness/" + sicknessId,
            { firstName, lastName,emailId, phoneNumber, dateOfBirth,patientType,
                symptoms1,symptoms2,symptoms3,diseases, })
            .subscribe(() => {
                console.log('Updated: ' + sicknessId);
            });
            
        }
        deleteSickness(sicknessId: string) {
            this.http.delete("http://localhost:8000/sickness/" + sicknessId)
                .subscribe(() => {
                    console.log('Deleted: ' + sicknessId);
                });
                location.reload();
        }
}