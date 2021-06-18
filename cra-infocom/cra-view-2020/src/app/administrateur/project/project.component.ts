import { newArray } from '@angular/compiler/src/util';
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
  newNameProject = new Array();
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
      this.newNameProject = [];

      this._service.searchProjectByProjectTitle(this.searchByProjectName).subscribe(
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
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._service.selectClientById(data.client.id).subscribe(
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

      this._service.searchProjectByMissionTitle(this.searchByMissionName).subscribe(
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
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._service.selectClientById(data.client.id).subscribe(
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
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._service.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._service.selectClientById(data.client.id).subscribe(
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

      this._service.searchProjectByMissionProjectTitle(this.searchByProjectName, this.searchByMissionName).subscribe(
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
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._service.selectClientById(data.client.id).subscribe(
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
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._service.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._service.selectClientById(data.client.id).subscribe(
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
                    this.newNameProject.push("newNameProject-" + i);

                  }

                  this.projects.forEach(
                    (item) => {
                      this._service.selectMissionById(item.mission.id).subscribe(
                        data => {
                          item.missionTitle = data.missionTitle;

                          this._service.selectClientById(data.client.id).subscribe(
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

      this._service.selectAllproject().subscribe(
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
              this._service.selectMissionById(item.mission.id).subscribe(
                data => {
                  item.missionTitle = data.missionTitle;

                  this._service.selectClientById(data.client.id).subscribe(
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

  searchOneCollab() {

    if (this.collaboratorInputLastName.lastName != undefined && this.collaboratorInputLastName.lastName != "") {

      this._service.selectCollabByName(this.collaboratorInputLastName.lastName).subscribe(
        data => {
          this.searchedCollabs = data;

      

        },
        error => console.log("exception" + error)
      )
      this.collaboratorInputLastName.lastName = "";
    } else {
      this._service.selectAllCollab().subscribe(
        data => {
          this.searchedCollabs = data;
          this.searchedCollabs.pop()

        },
        error => console.log("exception" + error)
      )
    }
  }


































































  theCollabToAffect = new Collaborator();
  projectToAffect = new Project();


  affectCollabToProject(idProject: number, idCollab: number, searchedCollabs:Collaborator[],collaborateur:Collaborator) {



    this._service.selectOneCollabById(idCollab).subscribe(
      data => {

        this.theCollabToAffect = data;

        this._service.selectProjectById(idProject).subscribe(
          data1 => {
            this.projectToAffect = data1;
            this._service.addCollabToProject(this.theCollabToAffect.id, this.projectToAffect.id).subscribe(
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

    this._service.deleteAllCollabAffectedToProject(indexOfElement).subscribe(
      data => {
        console.log("All project collab of this id project deleted");

        this._service.deleteProjectById(indexOfElement).subscribe(
          data => console.log("project deleted"),
          error => console.log("project not deleted")
        )

      },
      error => console.log("Collabs of project not deleted")
    )
  }


  allCollabOfProject!: Collaborator[];
  modelInfo(indexOfElement: number) {

    this._service.selectCollabByProjectId(indexOfElement).subscribe(
      data => {
        this.allCollabOfProject = data;
      },
      error => console.log("exception" + error),
    )


  }


  deleteCollabOfProject(projetId: number, collaboratorId: number, allCollabOfProject: Collaborator[], collaborateur: Collaborator) {


    this._service.deleteCollabOfThisProject(collaboratorId, projetId).subscribe(
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


    this._service.majProjectTitle(+((<HTMLInputElement>document.getElementById(this.projectId[indexOfElement])).value), (<HTMLInputElement>document.getElementById(this.newNameProject[indexOfElement])).value).subscribe(
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
