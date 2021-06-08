import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

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
  dateStartLeave = new Date();
  dateEndLeave = new Date();
  allLeaveType!: TypeLeave[];
  idOfLeaveType!: number;

  constructor(private _route: Router, private _service: NgserviceService) { }



  ngOnInit(): void {

    /** on recupere la date d'aujourd'hui au bon format*/
    this.aujourdhui = this.formatageDate()


    /** on recupere tous les types */
    this._service.selectAllLeaveType().subscribe(
      data1 => this.allLeaveType = data1,
      error => console.log("exception" + error)
    )
    
    /** id du collaborateur recuperé a la connexion */
    this._service.selectLeaveByCollabId(2).subscribe(
      data2 => this.leaves = data2,
      error => console.log("exception" + error)
    )
  }



  /** On recupere le congé selectionné a chaque <select> */
  getTypeLeave() {
    console.log(this.idOfLeaveType)
    this._service.selectLeaveTypeById(this.idOfLeaveType).subscribe(
      data9 => { this.leaveType = data9; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
      console.log(this.leaveType)
    }, 50);
  }

  /** Ajout de la demande de congé */
  addLeaveFormSubmit() {
    this.leave.status = 'en-cours';
    this.leave.leaveType = this.leaveType

    this._service.addOrUpdateLeaveRequest(this.leave, this.aujourdhui, this.dateStartLeave, this.dateEndLeave).subscribe(
      data => {
        console.log("ajout effectué");
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
  deleteLeaveById(value: any) {
    console.log(value);
    this._service.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete effectué");
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


}
