import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { Leave } from 'src/app/z-model/Leave/leave';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  date1!: Date;
  date2!: Date;
  clientName!: string;
  nbResultat!: number;
  error!: string;


  /** MISSION */
  missionId = new Array();
  clientNameMission = new Array();
  debutMission = new Array();
  nameMission = new Array();
  refClientMission = new Array();
  finMission = new Array();



  public missions!: Mission[];
  clients!: Client[];




  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {


    this._service.selectAllClient().subscribe(
      data => this.clients = data,
      error => console.log("exception" + error)
    )
  }


  info!: string;

  searchMission() {


    if ((this.date1 != undefined && this.date2 != undefined) && (this.clientName != undefined && this.clientName != "")) {

      this.missionId = [];
      this.clientNameMission = [];
      this.debutMission = [];
      this.nameMission = [];
      this.refClientMission = [];
      this.finMission = [];

      this._service.searchMission(this.date1, this.date2, this.clientName).subscribe(
        data => {
          this.missions = data;

          this.missions.forEach(
            (item) => {
              this._service.selectClientById(item.client.id).subscribe(
                data => {
                  if (item != null) {
                    item.clientName = data.name;
                    item.clientref = data.ref;
                    item.oldStartDate = this.pipeDate.transform(item.startDate, 'yyyy-MM-dd') || '2000-02-14';
                    item.oldEndDate = this.pipeDate.transform(item.endDate, 'yyyy-MM-dd') || '2000-02-14';
                  }
                },
                error => console.log("exception" + error)
              )



            }
          )



          this.missions.forEach(
            (item) => {
              this._service.selectProjectByMissionId(item.id).subscribe(
                data => {
                  console.log(data)
                  item.porjectName = data.missionTitle;

                },
                error => console.log("exception" + error)
              )
            }
          )



          for (var i = 0; i < this.missions.length; i++) {
            this.missionId.push("missionId-" + i);
            this.clientNameMission.push("clientNameMission-" + i);
            this.debutMission.push("debutMission-" + i);
            this.nameMission.push("nameMission-" + i);
            this.refClientMission.push("refClientMission-" + i);
            this.finMission.push("finMission-" + i);
          }


          this.nbResultat = this.missions.length
          if(this.nbResultat= 0){
            this.error = " aucun resultat";
          }
        },
        error => console.log("exception" + error)
      )


      this.clientName = "";
      this.error = "";

    } else if ((this.date1 === undefined || this.date2 === undefined) && (this.clientName != undefined && this.clientName != "")) {

      this.missionId = [];
      this.clientNameMission = [];
      this.debutMission = [];
      this.nameMission = [];
      this.refClientMission = [];
      this.finMission = [];

      this._service.searchMissionByClientName(this.clientName).subscribe(
        data => {
          this.missions = data;


          this.missions.forEach(
            (item) => {
              this._service.selectClientById(item.client.id).subscribe(
                data => {
                  if (item != null) {
                    item.clientName = data.name;
                    item.clientref = data.ref;
                    item.oldStartDate = this.pipeDate.transform(item.startDate, 'yyyy-MM-dd') || '2000-02-14';
                    item.oldEndDate = this.pipeDate.transform(item.endDate, 'yyyy-MM-dd') || '2000-02-14';

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )


          for (var i = 0; i < this.missions.length; i++) {
            this.missionId.push("missionId-" + i);
            this.clientNameMission.push("clientNameMission-" + i);
            this.debutMission.push("debutMission-" + i);
            this.nameMission.push("nameMission-" + i);
            this.refClientMission.push("refClientMission-" + i);
            this.finMission.push("finMission-" + i);
          }



          this.nbResultat = this.missions.length;
          if(this.nbResultat= 0){
            this.error = " aucun resultat";
          }
        },
        error => console.log("exception" + error)
      )
      this.clientName = "";
      this.error = "";


    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.clientName === undefined || this.clientName === "")) {

      this.missionId = [];
      this.clientNameMission = [];
      this.debutMission = [];
      this.nameMission = [];
      this.refClientMission = [];
      this.finMission = [];


      this._service.searchMissionByDate(this.date1, this.date2).subscribe(
        data => {
          this.missions = data;


          this.missions.forEach(
            (item) => {
              this._service.selectClientById(item.client.id).subscribe(
                data => {
                  if (item != null) {
                    item.clientName = data.name;
                    item.clientref = data.ref;
                    item.oldStartDate = this.pipeDate.transform(item.startDate, 'yyyy-MM-dd') || '2000-02-14';
                    item.oldEndDate = this.pipeDate.transform(item.endDate, 'yyyy-MM-dd') || '2000-02-14';



                  }
                },
                error => console.log("exception" + error)
              )
            }
          )


          for (var i = 0; i < this.missions.length; i++) {
            this.missionId.push("missionId-" + i);
            this.clientNameMission.push("clientNameMission-" + i);
            this.debutMission.push("debutMission-" + i);
            this.nameMission.push("nameMission-" + i);
            this.refClientMission.push("refClientMission-" + i);
            this.finMission.push("finMission-" + i);
          }



          this.nbResultat = this.missions.length;
          if(this.nbResultat= 0){
            this.error = " aucun resultat";
          }
        },
        error => console.log("exception" + error)
      )

      this.clientName = "";
      this.error = "";

    } else if ((this.date1 === undefined && this.date2 === undefined) && (this.clientName === undefined || this.clientName == "")) {

      this.missionId = [];
      this.clientNameMission = [];
      this.debutMission = [];
      this.nameMission = [];
      this.refClientMission = [];
      this.finMission = [];

      this._service.searchAllMission().subscribe(
        data => {
          this.missions = data;


          this.missions.forEach(
            (item) => {
              this._service.selectClientById(item.client.id).subscribe(
                data => {
                  if (item != null) {
                    item.clientName = data.name;
                    item.clientref = data.ref;
                    item.oldStartDate = this.pipeDate.transform(item.startDate, 'yyyy-MM-dd') || '2000-02-14';
                    item.oldEndDate = this.pipeDate.transform(item.endDate, 'yyyy-MM-dd') || '2000-02-14';
                  }
                },
                error => console.log("exception" + error)
              )
              this._service.selectProjectByMissionId(item.id).subscribe(
                data => {
                  item.porjectName = data.missionTitle;
                },
                error => console.log("exception" + error)
              )
            }
          )

          for (var i = 0; i < this.missions.length; i++) {
            this.missionId.push("missionId-" + i);
            this.clientNameMission.push("clientNameMission-" + i);
            this.debutMission.push("debutMission-" + i);
            this.nameMission.push("nameMission-" + i);
            this.refClientMission.push("refClientMission-" + i);
            this.finMission.push("finMission-" + i);
          }



          this.nbResultat = this.missions.length;
          if(this.nbResultat= 0){
            this.error = " aucun resultat";
          }
        },
        error => console.log("exception" + error)
      )
    } else {

      this.error = "Merci de vérifier que les deux champs dates  ont été bien remplies.";

    }
  }


  pipeDate = new DatePipe('fr-FR');

  missionToUpdate = new Mission();
  updatedMission = new Mission();
  newClientMission = new Client();

  newStartDate!: string;
  newEndDate!: string;

  updateMission(indexOfElement: number) {

    this._service.selectMissionById(+(<HTMLInputElement>document.getElementById(this.missionId[indexOfElement])).value).subscribe(
      data1 => {
        this.missionToUpdate = data1;

        this.updatedMission.id = this.missionToUpdate.id;

        this._service.selectClientById(+(<HTMLInputElement>document.getElementById(this.refClientMission[indexOfElement])).value).subscribe(
          data2 => {
            this.newClientMission = data2;

            this.updatedMission.missionTitle = (<HTMLInputElement>document.getElementById(this.nameMission[indexOfElement])).value;
            this.newStartDate = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.debutMission[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.missionToUpdate.startDate, 'yyyy-MM-dd') || '2000-02-14';
            this.newEndDate = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.finMission[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.missionToUpdate.endDate, 'yyyy-MM-dd') || '2000-02-14';
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

  deleteMission(indexOfElement: number) {

    this._service.deleteMission(indexOfElement).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur delete non-effectué")
      }
    )
  }


  updateClientRef(indexOfElement: number) {
    (<HTMLInputElement>document.getElementById(this.refClientMission[indexOfElement])).value = (<HTMLInputElement>document.getElementById(this.clientNameMission[indexOfElement])).value;
  }

  updateClientName(indexOfElement: number) {
    (<HTMLInputElement>document.getElementById(this.clientNameMission[indexOfElement])).value = (<HTMLInputElement>document.getElementById(this.refClientMission[indexOfElement])).value;
  }





  deleteTheProject(idProject: number) {


    this._service.deleteProjectById(idProject).subscribe(
      data => console.log("delete effectué"),
      error => console.log("delete non effectué")
    )

  }



  /** NAVIGATION */

  goGerer() {
    this._route.navigate(['/editMission']);

  }

  goToAddMission() {
    this._route.navigate(['/addMission']);

  }
  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }

  allProjectOfMission!: Project[];

  projectToUpdateName = new Array();

  OnInitModal(missionId: number,indexOfelement:number) {
    this.projectToUpdateName = [];


    this._service.selectAllProjectByMissionId(missionId).subscribe(
      data => {
        this.allProjectOfMission = data;


          for (var i = 0; i < this.allProjectOfMission.length; i++) {
            this.projectToUpdateName.push("projectToUpdateName-" + i+ "-"  + indexOfelement);
            console.log(this.projectToUpdateName)
        }

        },
    )



  }



  projectToUpdate = new Project;
  newtitle!: string;
  valeur!: string;

  majTheProject(idProject: number, indexOfElement: number) {

    this._service.selectProjectById(idProject).subscribe(
      data => {
        this.projectToUpdate = data;

        console.log((<HTMLInputElement>document.getElementById(this.projectToUpdateName[indexOfElement])).value)
        this.projectToUpdate.projectTitle = (<HTMLInputElement>document.getElementById(this.projectToUpdateName[indexOfElement])).value;

        console.log(this.projectToUpdate.projectTitle)


        this._service.addAndUpdateProject2(this.projectToUpdate).subscribe(
          data => console.log("maj reussie"),
          error => console.log("maj echoué")
        )

      },
      error => console.log("select echoué"),
    )


  }

}
