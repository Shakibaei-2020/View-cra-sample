import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/leave';

@Component({
  selector: 'app-conge-edit',
  templateUrl: './conge-edit.component.html',
  styleUrls: ['./conge-edit.component.css']
})
export class CongeEditComponent implements OnInit {

  leave = new Leave();
  updatedLeave = new Leave();

  dateOfDemand = new Date();
  dateStartLeave =  new Date();
  dateEndLeave = new Date();


  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
    this._service.selectOneLeaveRequestById(2).subscribe(
      data=> this.leave = data,
      error=>console.log("exception" +error)
      )
  }

  updateLeave(){

    this.updatedLeave.id = this.leave.id;

    this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemand,this.dateStartLeave,this.dateEndLeave).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

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
