import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Leave } from 'src/app/z-model/Leave/leave';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {

  date1!:Date;
  date2!:Date;
  status!:String;
  public leaves!:Leave[];  

  collaborator = new Collaborator();
  
  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  searchConge(){
    this._service.searchLeave(this.date1, this.date2, this.status).subscribe(
      data=> this.leaves = data,
      error=>console.log("exception" +error)
      )
      setTimeout(() => {
      }, 50);
  }
  
  getCollabByLeaveId(){
    this._service.selectCollabByLeaveId(1).subscribe(
      data=> this.collaborator = data,
      error=>console.log("exception" +error)
      )
  }


  goToAddConge(){
    this._route.navigate(['/addConge']);

  }
  goGerer(){
    this._route.navigate(['/editLeave']);

  }

}
