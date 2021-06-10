import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { Mission } from 'src/app/z-model/Mission/mission';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent implements OnInit {

  constructor(private _service: NgserviceService, private _route: Router) { }

  mission = new Mission();
  clientSeleted = new Client();
  clients!: Client[];


  ngOnInit(): void {

    this._service.selectMissionById(4).subscribe(
      data => {
      this.mission = data

      this._service.selectClientById( this.mission.client.id).subscribe(
        data => this.clientSeleted = data,
        error => console.log("exception" + error)
      ) },
      error => console.log("exception" + error)
    )

    this._service.selectAllClient().subscribe(
      data => this.clients = data,
      error => console.log("exception" + error)
    ) 
  }

  newEndDate = new Date();
  newStartDate = new Date();
  updatedMission = new Mission();


  updateMission() {

    this.updatedMission.id = this.mission.id;
    this.updatedMission.client.id = this.idClientByRef;

    this._service.addAndUpdateMission(this.updatedMission, this.newStartDate, this.newEndDate).subscribe(
      data => {
        console.log("maj effectué");
      },
      error => {
        console.log("erreur maj non-effectué")
      }
    )

    window.location.reload();

  }

  deleteMission() {

    this._service.deleteMission(2).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur delete non-effectué")
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
