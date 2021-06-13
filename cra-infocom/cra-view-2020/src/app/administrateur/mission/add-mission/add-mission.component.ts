import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { Mission } from 'src/app/z-model/Mission/mission';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  constructor(private _route: Router, private _service: NgserviceService) { }

  clients!: Client[];

  ngOnInit(): void {

    this._service.selectAllClient().subscribe(
      data => this.clients = data,
      error => console.log("exception" + error)
    )

  }

  newMission = new Mission();
  startDate!:string;
  endDate !: string;


  addMission() {

    this.newMission.client.id = this.idClientByRef;


    this._service.addAndUpdateMission(this.newMission, this.startDate, this.endDate).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("Remplissé tout les champs !")
      }
    )





  }

  idClientByName!: number;
  updateClientRef() {
    this.idClientByRef = this.idClientByName;
  }

  idClientByRef!: number;
  updateClientName() {
    this.idClientByName = this.idClientByRef;
  }

}
