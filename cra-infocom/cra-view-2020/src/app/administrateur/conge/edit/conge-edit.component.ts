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
  updatedLeave = new Leave();

  dateOfDemand= "";
  dateStartLeave =  new Date();
  dateEndLeave = new Date();
  allLeaveType!: TypeLeave[];

  status =  ["en-cours", "validé", "refusé"]
  inputedStatus!:string;
  collaborator = new Collaborator();

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {


    this._service.selectOneCollabById(2).subscribe(
      data=> this.collaborator = data,
      error=>console.log("exception" +error)
    )

    this._service.selectOneLeaveRequestById(191).subscribe(
      data=> this.leave = data,
      error=>console.log("exception" +error)
      )

      
    /** on recupere tous les types */
    this._service.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )
  }


  /** Mise à jour de updateLeave.status à chaque changement de select */
  getNewStatusLeave(){
    console.log(this.inputedStatus)
    this.updatedLeave.status = this.inputedStatus;
    console.log(this.updatedLeave.status)
  }


  idOfLeaveType!: number;
  leaveType = new TypeLeave();

  /** on recupere le TypeLeave via le select*/
  getTypeLeave() {
    this._service.selectLeaveTypeById(this.idOfLeaveType).subscribe(
      data => { this.leaveType = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
    }, 50);
  }



  pipeDate = new DatePipe('fr-FR');

  /** Lancement de la mise à jour*/
  updateLeave(){

    this.updatedLeave.id = this.leave.id;
    this.updatedLeave.leaveType = this.leaveType

    this.dateOfDemand = this.pipeDate.transform(this.leave.dateOfDemand, 'yyyy-MM-dd') || this.dateOfDemand;
    console.log(this.dateOfDemand)
    
    this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemand,this.dateStartLeave,this.dateEndLeave).subscribe(
      data =>{
        console.log("mise à joru effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )

    /** Rafraichissement de la page*/
    //window.location.reload();
  }

 

  /** On supprime le leave en cours d'edition*/
  deleteLeave(){
    this._service.deleteOneLeaveRequest(this.leave.id).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }

  formatageDate(date:Date) {
    var jour = date.getDay() + 6;
    var jour_toString = jour.toString();
    if (jour < 10) {
      jour_toString = "0" + jour_toString;
    }
    var mois = date.getMonth() + 1;
    var mois_toString = mois.toString();
    if (mois < 10) {
      mois_toString = "0" + mois_toString;
    }
    var annee = date.getFullYear();
    return annee + '-' + mois_toString + '-' + jour_toString;
  }

   WithoutTime(dateTime:Date) {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
}


}
