import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { ClientService } from 'src/app/y-service/Client/client.service';
import { TypeClientService } from 'src/app/y-service/Client/type-client.service';
import { CollabJoinProjectService } from 'src/app/y-service/CollabJoinProject/collab-join-project.service';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
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
  newNameProject = new Array();
  //projectCollaboratorId = new Array();
  //projectTitle = new Array();
  //projectMission = new Array();



  projects!: Project[];
  missions!: Mission[];

  collaborators!: Collaborator[];
  projectsCollaborators!: ProjectCollaborator[];

  allCollaborators!: Collaborator[];

  constructor(
     private _route: Router,
     private _CollaboratorService:CollaboratorService,
     private _ClientService: ClientService,
     private _MissionService: MissionService,
     private _ProjectService : ProjectService,
     private _CollabJoinProjectService:CollabJoinProjectService,

     
     ) { }

  ngOnInit(): void {


    this._CollaboratorService.selectAllCollab().subscribe(
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
      this.newNameProject = [];

      this._ProjectService.searchProjectByProjectTitle(this.searchByProjectName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
            this.newNameProject.push("newNameProject-" + i);


          }

          this.projects.forEach(
            (item) => {
              this._MissionService.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._ClientService.selectClientById(data.client.id).subscribe(
                    data => {
                      item.prenomClient = data.name;
                    },
                    error => console.log("exception" + error)
                  )
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
      /** search while only Mission name */
    } else if ((this.searchByProjectName === undefined || this.searchByProjectName === "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName === undefined || this.searchByClientName === "")) {
      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];

      this._ProjectService.searchProjectByMissionTitle(this.searchByMissionName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
            this.newNameProject.push("newNameProject-" + i);

          }

          this.projects.forEach(
            (item) => {
              this._MissionService.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._ClientService.selectClientById(data.client.id).subscribe(
                    data => {
                      item.prenomClient = data.name;
                    },
                    error => console.log("exception" + error)
                  )
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

      /** search while only client name */
    } else if ((this.searchByProjectName === undefined || this.searchByProjectName === "") && (this.searchByMissionName === undefined || this.searchByMissionName === "") && (this.searchByClientName != undefined && this.searchByClientName != "")) {
      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];
      this.newNameProject = [];

      this._MissionService.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;

          this.missions.forEach(

            (item) => {

              this._ProjectService.selectAllProjectByMissionId(item.id).subscribe(
                data => {

                  this.projects = data;

                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._MissionService.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._ClientService.selectClientById(data.client.id).subscribe(
                            data => {
                              item.prenomClient = data.name;
                            },
                            error => console.log("exception" + error)
                          )
                        },
                        error => console.log("exception" + error)
                      )
                    }
                  )


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
      this.newNameProject = [];

      this._ProjectService.searchProjectByMissionProjectTitle(this.searchByProjectName, this.searchByMissionName).subscribe(
        data => {
          this.projects = data;
          for (var i = 0; i < this.projects.length; i++) {
            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
            this.newNameProject.push("newNameProject-" + i);

          }

          this.projects.forEach(
            (item) => {
              this._MissionService.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._ClientService.selectClientById(data.client.id).subscribe(
                    data => {
                      item.prenomClient = data.name;
                    },
                    error => console.log("exception" + error)
                  )
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


      /** search white ALL */
    } else if ((this.searchByProjectName != undefined && this.searchByProjectName != "") && (this.searchByMissionName != undefined && this.searchByMissionName != "") && (this.searchByClientName != undefined && this.searchByClientName != "")) {


      this.projectId = [];
      this.collabToAffect = [];
      this.collabToDelete = [];
      this.newNameProject = [];

      this._MissionService.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;
          this.missions.forEach(
            (item) => {

              this._ProjectService.searchProjectByMissionProjectTitle(item.missionTitle, this.searchByProjectName).subscribe(
                data => {
                  this.projects = data;
                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._MissionService.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._ClientService.selectClientById(data.client.id).subscribe(
                            data => {
                              item.prenomClient = data.name;
                            },
                            error => console.log("exception" + error)
                          )
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
      this.newNameProject = [];

      this._MissionService.searchMissionByClientName(this.searchByClientName).subscribe(
        data => {
          this.missions = data;
          this.missions.forEach(
            (item) => {
              this._ProjectService.selectAllProjectByMissionId(item.id).subscribe(
                data => {
                  this.projects = data;

                  for (var i = 0; i < this.projects.length; i++) {
                    this.projectId.push("projectId-" + i);
                    this.collabToAffect.push("collabToAffect-" + i);
                    this.collabToDelete.push("collabToDelete-" + i);
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._MissionService.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._ClientService.selectClientById(data.client.id).subscribe(
                            data => {
                              item.prenomClient = data.name;
                            },
                            error => console.log("exception" + error)
                          )
                        },
                        error => console.log("exception" + error)
                      )
                    }
                  )


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
      this.newNameProject = [];

      this._ProjectService.selectAllproject().subscribe(
        data => {
          this.projects = data;

          for (var i = 0; i < this.projects.length; i++) {

            this.projectId.push("projectId-" + i);
            this.collabToAffect.push("collabToAffect-" + i);
            this.collabToDelete.push("collabToDelete-" + i);
            this.newNameProject.push("newNameProject-" + i);

          }


          this.projects.forEach(
            (item) => {
              this._MissionService.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._ClientService.selectClientById(data.client.id).subscribe(
                    data => {
                      item.prenomClient = data.name;
                    },
                    error => console.log("exception" + error)
                  )
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

    } else {

      console.log("hello")
    }
  }



  collaboratorInputLastName = new Collaborator();
  searchedCollabs!: Collaborator[];

  nbResultatRecherche!: number;
  searchOneCollab() {

    if (this.collaboratorInputLastName.lastName != undefined && this.collaboratorInputLastName.lastName != "") {
      this.nbResultatRecherche = 0;

      this._CollaboratorService.selectCollabByName(this.collaboratorInputLastName.lastName).subscribe(
        data => {
          this.searchedCollabs = data;
          this.nbResultatRecherche = this.searchedCollabs.length;
          console.log(this.nbResultatRecherche)
        },
        error => console.log("exception" + error)
      )

      if( this.nbResultatRecherche = 0){
      }
      this.collaboratorInputLastName.lastName = "";
    } else {
      this.nbResultatRecherche = 0;
      this._CollaboratorService.selectAllCollab().subscribe(
        data => {
          this.searchedCollabs = data;
          this.nbResultatRecherche = this.searchedCollabs.length;

        },
        error => console.log("exception" + error)
      )
    }
  }

  theCollabToAffect = new Collaborator();
  projectToAffect = new Project();
  nbCollabOnProject!: number;

  affectCollabToProject(idProject: number, idCollab: number, searchedCollabs: Collaborator[], collaborateur: Collaborator) {



    this._CollaboratorService.selectOneCollabById(idCollab).subscribe(
      data => {

        this.theCollabToAffect = data;

        this._ProjectService.selectProjectById(idProject).subscribe(
          data1 => {
            this.projectToAffect = data1;
            this._CollabJoinProjectService.addCollabToProject(this.theCollabToAffect.id, this.projectToAffect.id).subscribe(
              data => {
                console.log("affectation reussie");

                this.allCollabOfProject.push(this.theCollabToAffect)

                const index = searchedCollabs.indexOf(collaborateur);
                if (index > -1) {
                  searchedCollabs.splice(index, 1);
                }

              },
              error => console.log("affectation raté")
            )
          },
          error => console.log("exception" + error)
        )
      },
      error => console.log("exception" + error)
    )


  }

  deleteTheProject(indexOfElement: number) {

    this._CollabJoinProjectService.deleteAllCollabAffectedToProject(indexOfElement).subscribe(
      data => {
        console.log("All project collab of this id project deleted");

        this._ProjectService.deleteProjectById(indexOfElement).subscribe(
          data => console.log("project deleted"),
          error => console.log("project not deleted")
        )

      },
      error => console.log("Collabs of project not deleted")
    )
  }


  allCollabOfProject!: Collaborator[];
  modelInfo(indexOfElement: number) {

    this._CollaboratorService.selectCollabByProjectId(indexOfElement).subscribe(
      data => {
        this.allCollabOfProject = data;
      },
      error => console.log("exception" + error),
    )


  }


  deleteCollabOfProject(projetId: number, collaboratorId: number, allCollabOfProject: Collaborator[], collaborateur: Collaborator) {


    this._CollabJoinProjectService.deleteCollabOfThisProject(collaboratorId, projetId).subscribe(
      data => {
        console.log("collaborateur supprimer");

        const index = allCollabOfProject.indexOf(collaborateur);
        if (index > -1) {
          allCollabOfProject.splice(index, 1);
        }

      },

      error => console.log("collaborateur non supprimer")
    )

  }


  updateTheProjectName(indexOfElement: number) {


    this._ProjectService.majProjectTitle(+((<HTMLInputElement>document.getElementById(this.projectId[indexOfElement])).value), (<HTMLInputElement>document.getElementById(this.newNameProject[indexOfElement])).value).subscribe(
      data => console.log("maj reussi"),
      error => console.log("maj raté")
    )

  }


  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }

  goToAddProject() {
    this._route.navigate(['addProject']);
  }

}
