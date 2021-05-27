import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/leave';

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
    this._service.selectLeaveByCollabId(1).subscribe(
      data=> this.leaves = data,
      error=>console.log("exception" +error)
      )
  }

  addLeaveFormSubmit(){

    this._service.addOneLeaveRequest(this.leave).subscribe(
      data =>{
        console.log("ajout effectué");
        this._route.navigate(['listCollab']);
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }

}
