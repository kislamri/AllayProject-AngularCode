import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/service/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial= null;
  currentIndex = -1;
  title = '';

  constructor(private tutorialServiece: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials():void{
    this.tutorialServiece.getAll()
    .subscribe(
      data =>{
        this.tutorials= data;
        console.log(data)
      },
      error =>{
        console.log(error);
      }
    );
  }
  refreshList():void{
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial():void{
    this.currentTutorial = null;
    this.currentIndex = -1;

  }

  removeAlTutorials():void{
    this.tutorialServiece.deleteAll()
    .subscribe(
      response =>{
        console.log(response);
        this.retrieveTutorials();
      },
      error =>{
        console.log(error);
      }
    );
  }
  searchTitle():void{
    this.tutorialServiece.findByTitle(this.title)
    .subscribe(
      data =>{
        this.tutorials = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
      
    )
  }

}
