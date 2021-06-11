import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
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

  dateOfDemand !: string;
  dateStartLeave =  new Date();
  dateEndLeave = new Date();
  allLeaveType!: TypeLeave[];

  status =  ["en-cours", "validé", "refusé"]
  inputedStatus!:string;

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
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


    /** Lancement de la mise à jour*/
  updateLeave(){
    this.updatedLeave.id = this.leave.id;
    this.updatedLeave.leaveType = this.leaveType

    this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemand,this.dateStartLeave,this.dateEndLeave).subscribe(
      data =>{
        console.log("mise à joru effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    /** Rafraichissement de la page*/
    window.location.reload();
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
}
