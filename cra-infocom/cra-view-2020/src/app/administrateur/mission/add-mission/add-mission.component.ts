import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $, error } from 'protractor';
import { ClientService } from 'src/app/y-service/Client/client.service';
import { TypeClientService } from 'src/app/y-service/Client/type-client.service';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
import { Client } from 'src/app/z-model/Client/client';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  constructor(
    private _route: Router,
     private _service: NgserviceService,
     private _ClientService: ClientService,
     private _MissionService: MissionService,
     private _ProjectService: ProjectService,


     
     ) { }

  clients!: Client[];

  ngOnInit(): void {

    this._ClientService.selectAllClient().subscribe(
      data => this.clients = data,
      error => console.log("exception" + error)
    )

  }


  newProject = new Project();
  newMission = new Mission();
  startDate!: string;
  endDate !: string;

  projectTitle!: string;
  missionOfproject!: number;
  missionToAdd = new Mission();
  projectToAdd = new Project();

  lastMissionAddedId!: number;


  projects = new Array();
  projectsToinsert = new Array();


  addedMission!: Mission;

  addMission() {

    for (var i = 0; i < this.fieldArray.length; i++) {
      this.projects.push("projectName-" + i);
    }

    for (var i = 0; i < this.fieldArray.length; i++) {
      this.projectsToinsert.push((<HTMLInputElement>document.getElementById(this.projects[i])).value)
    }

    this.newMission.client.id = this.idClientByRef;



    this._MissionService.addAndUpdateMission(this.newMission, this.startDate, this.endDate).subscribe(
      data => {
        console.log("ajout effectué")

        this.addedMission = data;


        this.projectsToinsert.forEach(
          (item) => {
            this._MissionService.selectMissionById(this.addedMission.id).subscribe(
              data => {
                this.missionToAdd = data;

                this.projectToAdd.projectTitle = item;
                this.projectToAdd.mission = this.missionToAdd;

                this._ProjectService.addAndUpdateProject(this.projectToAdd).subscribe(
                  data => console.log("ajout reussie"),
                  error => console.log("exception" + error)
                )
              },
              error => console.log("exception" + error)
            )
          }
        )



      },
      error => {
        console.log("Remplissé tout les champs !")
      }


    )

    console.log(this.addedMission)







  }

  idClientByName!: number;
  updateClientRef() {
    this.idClientByRef = this.idClientByName;
  }

  idClientByRef!: number;
  updateClientName() {
    this.idClientByName = this.idClientByRef;
  }

  goToSearch() {
    this._route.navigate(['/searchMission']);
  }




  fieldArray: Array<any> = [];
  newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }


  isShow = true;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

}
