import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public activitys!:Activity[];  

  
  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  searchActivity(){
    this._service.searchActivity(this.date1, this.date2, this.lastName).subscribe(
      data=> this.activitys = data,
      error=>console.log("exception" +error)
      )
  }
  
  goToAddActivity(){
    this._route.navigate(['/addActivite']);

  }
  
  goGerer(){
    this._route.navigate(['/editActivite']);
  }


}
