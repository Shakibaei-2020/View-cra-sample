import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Project } from 'src/app/z-model/Project/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {




  searchByProjectName!: string;
  searchByMissionName!: string;
  searchByClientName!: string;



  nbResultat!: number;

  /** PROJECT */
  projectId = new Array();
  projectCollaboratorId = new Array();
  projectTitle = new Array();
  projectMission = new Array();

  projects!: Project[];


  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {
  }



  searchProjectByName() {

    if (this.searchByProjectName!= undefined &&this.searchByProjectName != "") {

      this.projectId = [];
      this.projectCollaboratorId = [];
      this.projectTitle = [];
      this.projectMission = [];


      this._service.searchProjectByTitle(this.searchByProjectName).subscribe(
        data => {
          this.projects = data;

          for (var i = 0; i < this.projects.length; i++) {

            this.projectId.push("projectId-" + i);
            this.projectCollaboratorId.push("projectCollaboratorId-" + i);
            this.projectTitle.push("projectTitle-" + i);
            this.projectMission.push("projectMission-" + i);
          }

          this.projects.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.prenomCollab = data.firstName;

                  }
                  this.nbResultat = this.projects.length;
                },
                error => console.log("exception" + error)
              )
            }
          )

          this.projects.forEach(
            (item) => {
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  if (item != null) {
                    item.missionTitle = data.missionTitle;

                  }
                  this.nbResultat = this.projects.length;
                },
                error => console.log("exception" + error)
              )
            }
          )



        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.searchByProjectName= "";
    } else {

      this.projectId = [];
      this.projectCollaboratorId = [];
      this.projectTitle = [];
      this.projectMission = [];

      this._service.selectAllproject().subscribe(
        data => {
          this.projects = data;

          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.projectCollaboratorId.push("projectCollaboratorId-" + i);
            this.projectTitle.push("projectTitle-" + i);
            this.projectMission.push("projectMission-" + i);
          }


          this.projects.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.prenomCollab = data.firstName;

                  }
                  this.nbResultat = this.projects.length;
                },
                error => console.log("exception" + error)
              )
            }
          )

          this.projects.forEach(
            (item) => {
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  if (item != null) {
                    item.missionTitle = data.missionTitle;

                  }
                  this.nbResultat = this.projects.length;
                },
                error => console.log("exception" + error)
              )
            }
          )



          this.nbResultat = this.projects.length;
        },
        error => console.log("exception" + error)
      )
      this.searchByProjectName= "";

    }
  }



  updateProject(indexOfElement:number){

  }

  deleteProject(indexOfElement:number){

  }

  goToAccueil() {

  }

  goToAddProject() {

  }

}
