import { DatePipe } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {

  date1!: string;
  date2!: string;
  statusSearch!: string;
  lastNameCollab!: string;
  pipeDate = new DatePipe('fr-FR');

  error!: string;

  constructor(private _service: NgserviceService, private _route: Router) { }

  collaborator = new Collaborator();
  leave = new Leave();
  collaborators !: Collaborator[];
  leaves!: Leave[];


  nbResultat!: number;
  status = ["en-cours", "validé", "refusé"]


  /** lEAVE */

  leaveRequestId = new Array();
  leaveType = new Array();
  leaveStatus = new Array();
  leaveClientInformed = new Array();
  leaveStatusDebut = new Array();
  dateLeaveRequest = new Array();
  dateStartLeave = new Array();
  dateEndLeave = new Array();
  leaveStatusFin = new Array();
  joursEntiers = new Array();
  allLeaveType!: TypeLeave[];

  ngOnInit(): void {


    this._service.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )


  }

  /** Methode afin de trouver un une demane de congé via  le status et entre quand ce situe ca date de demande */
  searchConge() {


    if ((this.date1 != undefined && this.date2 != undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];

      this._service.searchLeave(this.date1, this.date2, this.statusSearch, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;


          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }


          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];


      this._service.searchLeaveByDateStatus(this.date1, this.date2, this.statusSearch).subscribe(
        data => {
          this.leaves = data;


          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];



      this._service.searchLeaveByDateName(this.date1, this.date2, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];

      this._service.searchLeaveByDate(this.date1, this.date2).subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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
      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.date1 === undefined || this.date2 === undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];


      this._service.searchLeaveByStatusName(this.statusSearch, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.date1 === undefined || this.date2 === undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];

      this._service.searchLeaveByName(this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }



          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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
      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.date1 === undefined || this.date2 === undefined) && this.statusSearch != undefined && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {


      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];

      this._service.searchLeaveByStatus(this.statusSearch).subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }


          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.date1 === undefined && this.date2 === undefined) && this.statusSearch === undefined && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.leaveRequestId = [];
      this.leaveType = [];
      this.leaveStatus = [];
      this.leaveClientInformed = [];
      this.leaveStatusDebut = [];
      this.dateLeaveRequest = [];
      this.dateStartLeave = [];
      this.dateEndLeave = [];
      this.leaveStatusFin = [];
      this.joursEntiers = [];

      this._service.searchAllLeave().subscribe(
        data => {
          this.leaves = data;

          for (var i = 0; i < this.leaves.length; i++) {

            this.leaveRequestId.push("leaveRequestId-" + i);
            console.log(this.leaveRequestId)
            this.leaveType.push("leaveType-" + i);
            this.leaveStatus.push("leaveStatus-" + i);
            this.leaveClientInformed.push("leaveClientInformed-" + i);
            this.leaveStatusDebut.push("leaveStatusDebut-" + i);
            this.dateLeaveRequest.push("dateLeaveRequest-" + i);
            this.dateStartLeave.push("dateStartLeave-" + i);
            this.dateEndLeave.push("dateEndLeave-" + i);
            this.leaveStatusFin.push("leaveStatusFin-" + i);
            this.joursEntiers.push("joursEntiers-" + i)
          }

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
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

      
      this.error = "";

    } else {
      this.error = "Un problème est survenue, merci de vérifier que les deux champs dates  ont été bien remplies.";
      this.nbResultat = 0;
    }



  }




  /** recupere la demande de congé d'un collaborateur via son id */
  getCollabByLeaveId() {
    /** selectionne un collaborateur avec la clé etrangere idCollaborateur dans la table leave */
    this._service.selectCollabByLeaveId(2).subscribe(
      data => this.collaborator = data,
      error => console.log("exception" + error)
    )
    setTimeout(() => {
    }, 50);
  }

  /** routing vers ajout de demande de congé */
  goToAddConge() {
    this._route.navigate(['/addConge']);
  }

  /** routing vers editer un congé */
  goGerer() {
    this._route.navigate(['/editLeave']);
  }

  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }











  leaveRequestToUpdated = new Leave();
  updatedLeave = new Leave();
  dateOfDemandLeave!: string;
  dateOfStartLeave!: string;
  dateOfEndLeave!: string;
  newTypeLeave = new TypeLeave();

  updateLeaveFromCollab(indexOfElement: number) {

    this._service.selectOneLeaveRequestById(+(<HTMLInputElement>document.getElementById(this.leaveRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.leaveRequestToUpdated = data1;

        this.updatedLeave.id = this.leaveRequestToUpdated.id;
        this.updatedLeave.collaboratorId = this.leaveRequestToUpdated.collaboratorId;

        this._service.selectLeaveTypeById(+(<HTMLInputElement>document.getElementById(this.leaveType[indexOfElement])).value).subscribe(
          data2 => {
            this.newTypeLeave = data2;

            this.updatedLeave.leaveType = this.newTypeLeave || this.leaveRequestToUpdated.leaveType

            this.dateOfStartLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfEndLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfDemandLeave = this.pipeDate.transform(this.leaveRequestToUpdated.dateOfDemand, 'yyyy-MM-dd') || '2000-02-14';

            this.updatedLeave.clientInformed = !(<HTMLInputElement>document.getElementById(this.leaveClientInformed[indexOfElement])).value || this.leaveRequestToUpdated.clientInformed;
            this.updatedLeave.statusDebut = (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[indexOfElement])).value || this.leaveRequestToUpdated.statusDebut;
            this.updatedLeave.statusFin = (<HTMLInputElement>document.getElementById(this.leaveStatusFin[indexOfElement])).value || this.leaveRequestToUpdated.statusFin;
            this.updatedLeave.status = (<HTMLInputElement>document.getElementById(this.leaveStatus[indexOfElement])).value || this.leaveRequestToUpdated.statusFin;
            this.updatedLeave.nbJours = this.dayNumber || this.leaveRequestToUpdated.nbJours;

            this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemandLeave, this.dateOfStartLeave, this.dateOfEndLeave).subscribe(
              data => {
                console.log("ajout effectué");
                window.location.reload();
              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
          },
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )

  }


  joursEntiersChecked(i: number) {
    if (((<HTMLInputElement>document.getElementById(this.joursEntiers[i])).checked) === true) {
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).value = "";
      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).value = "";
    } else {
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).disabled = false;
      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).disabled = false;
    }
  }

  dayNumber!: number;
  newDateStartLeave!: Date;
  newDateEndLeave!: Date;

  howManyday(indexOfElement: number) {
    this.newDateStartLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfStartLeave)
    this.newDateEndLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfEndLeave)
    var Diff_temps = this.newDateEndLeave.getTime() - this.newDateStartLeave.getTime();
    this.dayNumber = Diff_temps / (1000 * 3600 * 24);
  }
  deleteLeaveFromCollab(value: any) {
    this._service.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete leave effectué");
      },
      error => {
        console.log("erreur delete leave non-effectué")
      }
    )
    window.location.reload();
  }

}
