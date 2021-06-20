import { DatePipe } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { LeaveService } from 'src/app/y-service/Leave/leave.service';
import { TypeLeaveService } from 'src/app/y-service/Leave/type-leave.service';
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

  pipeDate = new DatePipe('fr-FR');
  dateDebut!: string;
  dateFin!: string;
  statusSearch!: string;
  lastNameCollab!: string;
  error!: string;

  constructor(
    private _route: Router,
    private _CollaboratorService: CollaboratorService,
    private _LeaveService: LeaveService,
    private _TypeLeaveService: TypeLeaveService,
  ) { }

  collaborator = new Collaborator();
  collaborators !: Collaborator[];
  leave = new Leave();
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
    this._TypeLeaveService.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )
  }


  leaveNotfound!: string;

  /** Methode afin de trouver un une demane de congé via  le status et entre quand ce situe ca date de demande */
  searchConge() {

    if ((this.dateDebut != undefined && this.dateFin != undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {
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

      this._LeaveService.searchLeave(this.dateDebut, this.dateFin, this.statusSearch, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;
          if (this.leaves.length != 0) {


            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }

        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.dateDebut != undefined && this.dateFin != undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

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


      this._LeaveService.searchLeaveByDateStatus(this.dateDebut, this.dateFin, this.statusSearch).subscribe(
        data => {
          this.leaves = data;
          if (this.leaves.length != 0) {


            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.dateDebut != undefined && this.dateFin != undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

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



      this._LeaveService.searchLeaveByDateName(this.dateDebut, this.dateFin, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          if (this.leaves.length != 0) {

            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";
    } else if ((this.dateDebut != undefined && this.dateFin != undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

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

      this._LeaveService.searchLeaveByDate(this.dateDebut, this.dateFin).subscribe(
        data => {
          this.leaves = data;

          if (this.leaves.length != 0) {

            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.dateDebut === undefined || this.dateFin === undefined) && (this.statusSearch != undefined && this.statusSearch != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

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


      this._LeaveService.searchLeaveByStatusName(this.statusSearch, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;
          if (this.leaves.length != 0) {

            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';

                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.dateDebut === undefined || this.dateFin === undefined) && (this.statusSearch === undefined || this.statusSearch === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

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

      this._LeaveService.searchLeaveByName(this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;
          if (this.leaves.length != 0) {

            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.dateDebut === undefined || this.dateFin === undefined) && this.statusSearch != undefined && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {


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

      this._LeaveService.searchLeaveByStatus(this.statusSearch).subscribe(
        data => {
          this.leaves = data;


          if (this.leaves.length != 0) {



            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.leaves = [];
            this.nbResultat = 0
          }

        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.statusSearch = "";
      this.error = "";

    } else if ((this.dateDebut === undefined && this.dateFin === undefined) && this.statusSearch === undefined && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

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

      this._LeaveService.searchAllLeave().subscribe(
        data => {
          this.leaves = data;
          if (this.leaves.length != 0) {

            for (var i = 0; i < this.leaves.length; i++) {

              this.leaveRequestId.push("leaveRequestId-" + i);
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
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                      item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
                    }
                    this.nbResultat = this.leaves.length;
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          }else {
            this.leaves = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
      this.error = "";
    } else {

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

      this.error = "Merci de vérifier que les deux champs dates  ont été bien remplies.";
      this.nbResultat = 0;
    }
  }



  /** recupere la demande de congé d'un collaborateur via son id */
  getCollabByLeaveId() {
    /** selectionne un collaborateur avec la clé etrangere idCollaborateur dans la table leave */
    this._CollaboratorService.selectCollabByLeaveId(2).subscribe(
      data => this.collaborator = data,
      error => console.log("exception" + error)
    )
    setTimeout(() => {
    }, 50);
  }


  leaveRequestToUpdated = new Leave();
  updatedLeave = new Leave();
  dateOfDemandLeave!: string;
  dateOfStartLeave!: string;
  dateOfEndLeave!: string;
  newTypeLeave = new TypeLeave();

  validation!: string;
  notValidation!: string;



  /** Mise à jour de la demande de congé */
  updateLeaveFromCollab(indexOfElement: number) {

    /** on selectionne le collab à mettre à jour */
    this._LeaveService.selectOneLeaveRequestById(+(<HTMLInputElement>document.getElementById(this.leaveRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.leaveRequestToUpdated = data1;

        this.updatedLeave.id = this.leaveRequestToUpdated.id;
        this.updatedLeave.collaboratorId = this.leaveRequestToUpdated.collaboratorId;

        /** on sleection le type de congé  */
        this._TypeLeaveService.selectLeaveTypeById(+(<HTMLInputElement>document.getElementById(this.leaveType[indexOfElement])).value).subscribe(
          data2 => {
            this.newTypeLeave = data2;

            this.updatedLeave.leaveType = this.newTypeLeave || this.leaveRequestToUpdated.leaveType

            this.dateOfStartLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfEndLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfDemandLeave = this.pipeDate.transform(this.leaveRequestToUpdated.dateOfDemand, 'yyyy-MM-dd') || '2000-02-14';

            this.updatedLeave.clientInformed = !(<HTMLInputElement>document.getElementById(this.leaveClientInformed[indexOfElement])).value || this.leaveRequestToUpdated.clientInformed;
            this.updatedLeave.statusDebut = (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[indexOfElement])).value || this.leaveRequestToUpdated.statusDebut;
            this.updatedLeave.statusFin = (<HTMLInputElement>document.getElementById(this.leaveStatusFin[indexOfElement])).value || this.leaveRequestToUpdated.statusFin;
            this.updatedLeave.status = (<HTMLInputElement>document.getElementById(this.leaveStatus[indexOfElement])).value || this.leaveRequestToUpdated.status;
            this.updatedLeave.nbJours = this.dayNumber || this.leaveRequestToUpdated.nbJours;

            /** on  effectue la mise à jours */
            this._LeaveService.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemandLeave, this.dateOfStartLeave, this.dateOfEndLeave).subscribe(
              data => {
                console.log("ajout effectué");
                this.validation = "Les mises à jour ont bien été effectuées.";
                this.notValidation = "";

              },
              error => {
                console.log("erreur ajout non-effectué")
                this.notValidation = "Les  mises à jour n'ont pas été effectuées.";
                this.validation = "";
              }
            )
          },
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )

  }


  /** jours entiers ou non ? cet fonction permet de disable les champs statusdebut et statusfin si selectionné */
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

  /** Calcule du nombre de jours entre deux dates */
  howManyday(indexOfElement: number) {
    this.newDateStartLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfStartLeave)
    this.newDateEndLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfEndLeave)
    var Diff_temps = this.newDateEndLeave.getTime() - this.newDateStartLeave.getTime();
    this.dayNumber = Diff_temps / (1000 * 3600 * 24);
  }


  /** on supprime la demande du congé d'un collaborateur */
  deleteLeaveFromCollab(idLeave: any, leaves: Leave[], leave: Leave) {

    /** on delete avec l'id de la demande de congé  */
    this._LeaveService.deleteOneLeaveRequest(idLeave).subscribe(
      data => {
        console.log("delete leave effectué");
        const index = leaves.indexOf(leave);
        if (index > -1) {
          leaves.splice(index, 1);
          this.nbResultat = this.nbResultat - 1;

        }

      },
      error => {
        console.log("erreur delete leave non-effectué")
      }
    )
  }


  /** NAVIGATION */

  /** routing vers ajout de demande de congé */
  goToAddConge() {
    this._route.navigate(['/addConge']);
  }

  /** routing vers editer un congé */
  goGerer() {
    this._route.navigate(['/editLeave']);
  }

  /** routing vers l'accueil */

  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }
}
