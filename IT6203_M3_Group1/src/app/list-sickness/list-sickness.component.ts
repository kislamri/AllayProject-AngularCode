import { Component, OnInit } from '@angular/core';
import { SicknessService } from '../sickness.service';

@Component({
  selector: 'app-list-sickness',
  templateUrl: './list-sickness.component.html',
  styleUrls: ['./list-sickness.component.css']
})
export class ListSicknessComponent implements OnInit {

 //declare variable to hold response and make it public to be
    // accessible from components.html
    public sickness: any;
 

  constructor(private _myService: SicknessService){}
  ngOnInit(){
    this.getSickness();
  }
  //method called OnInit
  getSickness(){
    this._myService.getSickness("").subscribe(
      //read data and assign to public variable students
      data => { this.sickness = data},
      err => console.error(err),
      () => console.log('finished loading')
  );
  }
  onDelete(sicknessId: string) {
    this._myService.deleteSickness(sicknessId);
}


 
  }