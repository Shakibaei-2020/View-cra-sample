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

  public leaves!: Leave[];


  constructor(private _route: Router, private _service: NgserviceService) { }
 
  formatageDate() {
    var jour = new Date().getDay() ;
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
  
  ngOnInit() {
    this._service.selectLeaveByCollabId(2).subscribe(
      data => this.leaves = data,
      error => console.log("exception" + error)
    )
  }

  dateLeaveRequest!: string 
  ;
  dateStartLeave = new Date();
  dateEndLeave = new Date();

  inputleaveType = new TypeLeave();
  leaveType = new TypeLeave();



  addLeaveFormSubmit() {

    this._service.selectLeaveTypeById(this.inputleaveType.id).subscribe(
      data => this.leaveType = data,
      error => console.log("exception" + error)
    )

    this.leave.status = 'en-cours';
    this.leave.collaboratorId = 2;
    this.leave.clientInformed;
    this.leave.leaveType = this.leaveType


    this._service.addOrUpdateLeaveRequest(this.leave, this.dateLeaveRequest, this.dateStartLeave, this.dateEndLeave).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteLeave() {
    this._service.deleteOneLeaveRequest(4).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

  retour() {
    this._route.navigate(['/utilisateur']);
  }


}
