import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { TypeActivityService } from 'src/app/y-service/Activity/type-activity.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {

  typeActivity = new TypeActivity();

  constructor(
    private _route:Router,
    private _service:NgserviceService,
    private _ActivityService:ActivityService,
    private _TypeActivityService:TypeActivityService,
    ) { }

  ngOnInit(): void {
  }

  addNewTypeActivity(){
  
    this._TypeActivityService.addNewTypeActivit(this.typeActivity).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }
}
