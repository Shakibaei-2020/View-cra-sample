import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';
import { map } from 'rxjs/operators';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { LeaveService } from 'src/app/y-service/Leave/leave.service';
import { TypeLeaveService } from 'src/app/y-service/Leave/type-leave.service';

@Component({
  selector: 'app-conge-demande',
  templateUrl: './conge-demande.component.html',
  styleUrls: ['./conge-demande.component.css']
})
export class CongeDemandeComponent implements OnInit {

  leave = new Leave();
  leaves!: Leave[];
  leaveType = new TypeLeave();
  aujourdhui !: string;
  dateStartLeave!: string;
  dateEndLeave !: string;
  allLeaveType!: TypeLeave[];
  idOfLeaveType!: number;

  leaveEndStatus=  "leaveEndStatus"
  leaveStartStatus = "leaveStartStatus"

  config: any;
  collection = [];

  constructor(
    private _route: Router,
     private _service: NgserviceService,

     private _LeaveService: LeaveService,
     private _TypeLeaveService: TypeLeaveService,

     ) { }

  pageChange(newPage: number) {
		this._route.navigate([''], { queryParams: { page: newPage } });
	}

  ngOnInit(): void {

    /** id du collaborateur connecté suite à la connexion */
    this.leave.collaboratorId = 3;

    /** on recupere la date d'aujourd'hui au bon format*/
    this.aujourdhui = this.formatageDate()


    /** on recupere tous les types */
    this._TypeLeaveService.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )

    /** id du collaborateur recuperé a la connexion */
    this._LeaveService.selectLeaveByCollabId(2).subscribe(
      data => this.leaves = data,
      error => console.log("exception" + error)
    )

  }

  /** On recupere le congé selectionné a chaque <select> */
  getTypeLeave() {
    this._TypeLeaveService.selectLeaveTypeById(this.idOfLeaveType).subscribe(
      data => { this.leaveType = data; },
      error => console.log("exception" + error),

    )
    setTimeout(() => {
    }, 10);

  }

  /** Ajout de la demande de congé */
  addLeaveFormSubmit() {


    this.leave.collaboratorId = 2;
    this.leave.status = 'en-cours';
    this.leave.leaveType = this.leaveType
    this.leave.nbJours = this.dayNumber;


    this._LeaveService.addOrUpdateLeaveRequest(this.leave, this.aujourdhui, this.dateStartLeave, this.dateEndLeave).subscribe(
      data => {
        console.log("ajout effectué");
        window.location.reload();
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )

  }


  /** Navigation vers l'accueil*/
  retour() {
    this._route.navigate(['/utilisateur']);
  }


  /** delete de la note de frais via l'id*/
  deleteLeaveById(value: number) {
    this._LeaveService.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete effectué");
        window.location.reload();
      },
      error => {
        console.log("delete ajout non-effectué")
      }
    )
  }


  /** formatage de la date YYYY-MM-DD */
  formatageDate() {
    var jour = new Date().getDay() + 6;
    var jour_toString = jour.toString();
    if (jour < 10) {
      jour_toString = "0" + jour_toString;
    }
    var mois = new Date().getMonth() + 1;
    var mois_toString = mois.toString();
    if (mois < 10) {
      mois_toString = "0" + mois_toString;
    }
    var annee = new Date().getFullYear();
    return annee + '-' + mois_toString + '-' + jour_toString;
  }


  dayNumber!: number;
  newDateStartLeave!: Date;
  newDateEndLeave!: Date;

  howManyday() {

    this.newDateStartLeave = new Date(this.dateStartLeave)
    this.newDateEndLeave = new Date(this.dateEndLeave)

    var Diff_temps = this.newDateEndLeave.getTime() - this.newDateStartLeave.getTime();
    this.dayNumber = Diff_temps / (1000 * 3600 * 24);

  }


  joursEntiers!:boolean;

  joursEntiersChecked() {

    if (this.joursEntiers=== true) {
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
