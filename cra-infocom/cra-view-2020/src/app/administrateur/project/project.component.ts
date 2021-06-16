import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';

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
  collabToAffect = new Array();
  collabToDelete = new Array();
  //projectCollaboratorId = new Array();
  //projectTitle = new Array();
  //projectMission = new Array();



  projects!: Project[];
  missions!: Mission[];

  collaborators!: Collaborator[];
  projectsCollaborators!: ProjectCollaborator[];

  allCollaborators!: Collaborator[];

  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {


    this._service.selectAllCollab().subscribe(
      data => this.allCollaborators = data,
      error => console.log("excepetion" + error)

    )

  }



  searchProjectByName() {

    /** search while only project Name */
    if ((this.searchByProjectName != undefined && this.searchByProjectName != "") && (this.searchByMissionName === undefined || this.searchByMissionName === "") && (this.searchByClientName === undefined || this.searchByClientName === "")) {

      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchProjectByProjectTitle(this.searchByProjectName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);

          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";
      /** search while only Mission name */
    } else if ((this.searchByProjectName === undefined || this.searchByProjectName === "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName === undefined || this.searchByClientName === "")) {
      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchProjectByMissionTitle(this.searchByMissionName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";

      /** search while only client name */
    } else if ((this.searchByProjectName === undefined || this.searchByProjectName === "") && (this.searchByMissionName === undefined || this.searchByMissionName === "") && (this.searchByClientName != undefined && this.searchByClientName != "")) {
      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;

          this.missions.forEach(

            (item) => {

              this._service.selectAllProjectByMissionId(item.id).subscribe(
                data => {

                  this.projects = data;

                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                  }


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

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";

      /** search while  mission and project title name */
    } else if ((this.searchByProjectName != undefined && this.searchByProjectName != "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName === undefined || this.searchByClientName === "")) {

      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchProjectByMissionProjectTitle(this.searchByProjectName, this.searchByMissionName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);


      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";


      /** search white ALL */
    } else if ((this.searchByProjectName != undefined && this.searchByProjectName != "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName != undefined && this.searchByClientName != "")) {


      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;
          this.missions.forEach(
            (item) => {

              this._service.searchProjectByMissionProjectTitle(item.missionTitle, this.searchByProjectName).subscribe(
                data => {
                  this.projects = data;
                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                  }
                },
                error => console.log("exception" + error)
              )
              setTimeout(() => {
              }, 50);
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";

      /** with  mission  Client */
    } else if ((this.searchByProjectName != undefined && this.searchByProjectName != "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName != undefined && this.searchByClientName != "")) {

      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;
          this.missions.forEach(
            (item) => {
              this._service.selectAllProjectByMissionId(item.id).subscribe(
                data => {
                  this.projects = data;

                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                  }


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

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";

      /** search all  */
    } else if ((this.searchByProjectName === undefined || this.searchByProjectName === "") && (this.searchByMissionName === undefined || this.searchByMissionName === "") && (this.searchByClientName === undefined || this.searchByClientName === "")) {


      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._service.selectAllproject().subscribe(
        data => {
          this.projects = data;

          for (var i = 0; i < this.projects.length; i++) {

            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.searchByClientName = "";
      this.searchByMissionName = "";
      this.searchByProjectName = "";

    } else {

      console.log("hello")
    }

  }





  theCollabToAffect = new Collaborator();
  projectToAffect = new Project();

  affectCollabToProject(indexOfElement: number) {


    console.log((<HTMLInputElement>document.getElementById(this.collabToAffect[indexOfElement])).value)

    this._service.selectOneCollabById(+(<HTMLInputElement>document.getElementById(this.collabToAffect[indexOfElement])).value).subscribe(
      data => {

        this.theCollabToAffect = data;

        this._service.selectProjectById(+(<HTMLInputElement>document.getElementById(this.projectId[indexOfElement])).value).subscribe(
          data1 => {
            this.projectToAffect = data1;

            this.theCollabToAffect.projects[1] = this.projectToAffect;

            this._service.updateCollab(this.theCollabToAffect).subscribe(
              data=>console.log("project affecté effectué"),
              error=>console.log("affectaiton non effectué")
            )



          },
          error => console.log("exception" + error)
        )




      },
      error => console.log("exception" + error)
    )



  }

  deleteCollabOfProject(indexOfElement: number) {

    console.log((<HTMLInputElement>document.getElementById(this.collabToDelete[indexOfElement])).value)

  }

  updateTheProjectName(indexOfElement: number) {

  }

  deleteProject(indexOfElement: number) {

  }

  goToAccueil() {

  }

  goToAddProject() {

  }

}
