import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { TypeActivityService } from 'src/app/y-service/Activity/type-activity.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  date1!:Date;
  date2!:Date;
  lastName!:String;
  nbResultat!: number;


  public activitys!:Activity[];  

  
  constructor(
    private _service:NgserviceService, 
    private _route:Router,
    private _ActivityService:ActivityService,
    private _TypeActivityService:TypeActivityService,
    
    ) { }

  ngOnInit(): void {
  }

  searchActivity(){
    this._ActivityService.searchActivity(this.date1, this.date2, this.lastName).subscribe(
      data=> {this.activitys = data;
      this.nbResultat = this.activitys.length
    },
      error=>console.log("exception" +error)
      )
  }
  
  goToAddActivity(){
    this._route.navigate(['/addActivite']);

  }
  
  goGerer(){
    this._route.navigate(['/editActivite']);
  }

  goToAccueil(){
    this._route.navigate(['/administrateur']);

  }
  

}
