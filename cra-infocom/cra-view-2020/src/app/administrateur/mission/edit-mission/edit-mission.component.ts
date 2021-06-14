import { DatePipe } from '@angular/common';
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


  /** data */

  clientName = "clientName";
  clientRef = "clientRef";
  missionTitle = "missionTitle";
  dateStartMission = "dateStartMission";
  dateEndMission = "dateEndMission";


  ngOnInit(): void {

    this._service.selectMissionById(4).subscribe(
      data => {
        this.mission = data

        this._service.selectClientById(this.mission.client.id).subscribe(
          data => this.clientSeleted = data,
          error => console.log("exception" + error)
        )
      },
      error => console.log("exception" + error)
    )

    this._service.selectAllClient().subscribe(
      data => this.clients = data,
      error => console.log("exception" + error)
    )

  }

  pipeDate = new DatePipe('fr-FR');

  missionToUpdate = new Mission();
  updatedMission = new Mission();
  newClientMission = new Client();

  newStartDate!: string;
  newEndDate!: string;

  updateMission() {

    this._service.selectMissionById(4).subscribe(
      data1 => {
        this.missionToUpdate = data1;

        this.updatedMission.id = this.missionToUpdate.id;

        this._service.selectClientById(+(<HTMLInputElement>document.getElementById(this.clientRef)).value).subscribe(
          data2 => {
            this.newClientMission = data2;

            this.updatedMission.missionTitle = (<HTMLInputElement>document.getElementById(this.missionTitle)).value;
            this.newStartDate = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartMission)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.missionToUpdate.startDate, 'yyyy-MM-dd') || '2000-02-14';
            this.newEndDate = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndMission)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.missionToUpdate.endDate, 'yyyy-MM-dd') || '2000-02-14';
            this.updatedMission.client = this.newClientMission || this.missionToUpdate.client;

            this._service.addAndUpdateMission(this.updatedMission, this.newStartDate, this.newEndDate).subscribe(
              data => {
                console.log("update effectué");
              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
            window.location.reload();
          },
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )
  }


  deleteMission() {

    this._service.deleteMission(4).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur delete non-effectué")
      }
    )
  }





  updateClientRef() {
    (<HTMLInputElement>document.getElementById(this.clientRef)).value =  (<HTMLInputElement>document.getElementById(this.clientName)).value;
  }

  updateClientName() {
    (<HTMLInputElement>document.getElementById(this.clientName)).value =  (<HTMLInputElement>document.getElementById(this.clientRef)).value;
  }


  goToSearch(){
    this._route.navigate(['/searchMission']);

  }
}
