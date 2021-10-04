import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

//declare variable to hold response and make it publid to be accssible from
  //component.html
  public appointment: any;
  //initialize the call using StudentService
  constructor(private _myService:AppointmentService){}
  ngOnInit(){
    this.getAppointment();
  }
  //Fuction called OnInit
  getAppointment(){
    this._myService.getAppointment().subscribe(
      //read data and assign to public variable appointment
      data =>{this.appointment = data},
      err => console.error(err),
      () => console.log('finish loading')
    );
  }
  onDelete(appointmentId: string) {
    this._myService.deleteAppointment(appointmentId);
}

}
