import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Component({
  selector: 'app-conge-edit',
  templateUrl: './conge-edit.component.html',
  styleUrls: ['./conge-edit.component.css']
})
export class CongeEditComponent implements OnInit {

  leave = new Leave();
  allLeaveType!: TypeLeave[];

  status = ["en-cours", "validé", "refusé"]
  timeStatus = ["Matin", "Après-midi", "Journée entière"]
  inputedStatus!: string;
  collaborator = new Collaborator();

  /**leave*/
  typeLeave = "typeLeave";
  clientInformedLeave = "clientInformedLeave";
  dateLeaveReqest = "dateLeaveReqest";
  dateStartLeave = "dateStartLeave";
  dateEndLeave = "dateEndLeave";
  statusLeave = "statusLeave";
  leaveStartStatus = "leaveStartStatus";
  leaveEndStatus = "leaveEndStatus";
  joursEntiers = "joursEntiers";


  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {


    this._service.selectOneCollabById(2).subscribe(
      data => this.collaborator = data,
      error => console.log("exception" + error)
    )

    /** besoin de le recupéré via le search */
    this._service.selectOneLeaveRequestById(191).subscribe(
      data => this.leave = data,
      error => console.log("exception" + error)
    )

    /** on recupere tous les types */
    this._service.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )

  }


  pipeDate = new DatePipe('fr-FR');

  leaveToUpdate = new Leave();
  updatedLeave = new Leave();
  newTypeLeave = new TypeLeave();

  dateOfDemandLeave!: string;
  dateOfStartLeave!: string;
  dateOfEndLeave!: string;

  /** mise à jour de la demande de congé */
  updateLeave() {

    /** On recupere la demande à mettre a jour*/
    this._service.selectOneLeaveRequestById(191).subscribe(
      data1 => {
        this.leaveToUpdate = data1;

        this.updatedLeave.id = this.leaveToUpdate.id;
        this.updatedLeave.collaboratorId = this.leaveToUpdate.id;

        /** on recupere le nouveau type de la demande */
        this._service.selectLeaveTypeById(+(<HTMLInputElement>document.getElementById(this.typeLeave)).value).subscribe(

          data2 => {
            this.newTypeLeave = data2;

            this.updatedLeave.clientInformed = !(<HTMLInputElement>document.getElementById(this.clientInformedLeave)).value || this.leaveToUpdate.clientInformed;
            this.dateOfStartLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveToUpdate.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfEndLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveToUpdate.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfDemandLeave = this.pipeDate.transform(this.leaveToUpdate.dateOfDemand, 'yyyy-MM-dd') || '2000-02-14';
            this.updatedLeave.statusDebut = (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).value || this.leaveToUpdate.statusDebut;
            this.updatedLeave.statusFin = (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).value || this.leaveToUpdate.statusDebut;
            this.updatedLeave.status = (<HTMLInputElement>document.getElementById(this.statusLeave)).value || this.leaveToUpdate.status;
            this.updatedLeave.leaveType = this.newTypeLeave || this.leaveToUpdate.leaveType;
            this.updatedLeave.nbJours = this.dayNumber || this.leaveToUpdate.nbJours;

            /** on effectue la mise à jour */
            this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemandLeave, this.dateOfStartLeave, this.dateOfEndLeave).subscribe(
              data => {
                console.log("ajout effectué");
              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
            window.location.reload();
          },
          error => console.log("exception" + error)
        )
      },
      error => console.log("exception" + error),
    )

  }


  /** On supprime le leave en cours d'edition*/
  deleteLeave() {
    this._service.deleteOneLeaveRequest(this.leave.id).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur delete non-effectué")
      }
    )
  }


  dayNumber!: number;
  newDateStartLeave!: Date;
  newDateEndLeave!: Date;

  /** calcule le nombre de jours entre la date de debut et fin de la demande */
  howManyday() {
    this.newDateStartLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave)).valueAsDate, 'yyyy-MM-dd') || this.dateStartLeave)
    this.newDateEndLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave)).valueAsDate, 'yyyy-MM-dd') || this.dateStartLeave)
    var Diff_temps = this.newDateEndLeave.getTime() - this.newDateStartLeave.getTime();
    this.dayNumber = Diff_temps / (1000 * 3600 * 24);
  }


  goToSearch() {
    this._route.navigate(['/searchLeave']);

  }

  joursEntiersChecked() {
    if (!((<HTMLInputElement>document.getElementById(this.joursEntiers)).checked) === false) {
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).value = "";
      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).value = "";

    } else{
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).disabled = false;
      
      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).disabled = false;
    }
  }



}
