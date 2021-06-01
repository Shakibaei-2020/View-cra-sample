import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/client';
import { Mission } from 'src/app/z-model/mission';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {
  }

newMission = new Mission();
startDate = new Date();
endDate = new Date();

newClient = new Client();


addMission(){
  
  this._service.addAndupdateClient(this.newClient).subscribe(
    data =>{
      console.log("ajout effectué");
      this.newMission.clientId = this.newClient.id;
      this._service.addAndUpdateMission(this.newMission,this.startDate,this.endDate).subscribe(
        data =>{
          console.log("ajout effectué");
        },
        error =>{
          console.log("erreur ajout non-effectué")
        }
      )
    },
    error =>{
      console.log("erreur ajout non-effectué")
    }
  )
    }


}
