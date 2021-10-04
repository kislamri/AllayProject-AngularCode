import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  public doctor: any;

  constructor(private _myService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctor();
  }
  //method called OnInit
  getDoctor(){
    this._myService.getDoctor().subscribe(
      //read data and asssign to public variable dotor
      data => {this.doctor = data},
      err => console.error(err),
      () => console.log('finished loading')
    );

  }
  onDelete(doctorId: string){
    this._myService.deleteDoctor(doctorId);
  }

}
