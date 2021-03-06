import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  activity = new Activity();
  updatedActivity = new Activity();


  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
    this._service.selectActivityById(2).subscribe(
      data=> this.activity = data,
      error=>console.log("exception" +error)
      )
  }


  dateOfStart = new Date().toLocaleDateString();

  updateActivity(){

    this.updatedActivity.id = this.activity.id;
    this.updatedActivity.projectId = this.activity.projectId;
    this.updatedActivity.collaboratorId = this.activity.collaboratorId;


    this._service.addAndUpdateActivity(this.updatedActivity,this.dateOfStart).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteActivity(){

    this.activity.id;
    this._service.DeleteActivityById(2).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }
}
