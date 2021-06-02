import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/leave';
import { TypeLeave } from 'src/app/z-model/type-leave';

@Component({
  selector: 'app-conge-demande',
  templateUrl: './conge-demande.component.html',
  styleUrls: ['./conge-demande.component.css']
})
export class CongeDemandeComponent implements OnInit {

  leave = new Leave();

  public leaves!:Leave[];  


  constructor(private _route:Router,private _service:NgserviceService) { }

  
  ngOnInit() {
    this._service.selectLeaveByCollabId(2).subscribe(
      data=> this.leaves = data,
      error=>console.log("exception" +error)
      )
  }

  dateLeaveRequest = new Date();
  dateStartLeave =  new Date();
  dateEndLeave = new Date();


  leaveType = new TypeLeave();


  

  addLeaveFormSubmit(){

    this.leave.id = 1;

      this.leave.status='en-cours';
    this.leave.collaboratorId = 2;
    this.leave.clientInformed = true;
    this.leave.leaveType = this.leaveType;

    

    this.dateLeaveRequest = this.dateStartLeave;

    this._service.addOrUpdateLeaveRequest(this.leave, this.dateLeaveRequest,this.dateStartLeave,this.dateEndLeave).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }

    deleteLeave(){
      this._service.deleteOneLeaveRequest(4).subscribe(
        data =>{
          console.log("ajout effectué");
        },
        error =>{
          console.log("erreur ajout non-effectué")
        }
      )
    }

}
