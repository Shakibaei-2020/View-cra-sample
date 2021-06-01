import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/leave';
import { Mission } from 'src/app/z-model/mission';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  date1!:Date;
  date2!:Date;
  clientName!:string;

  public missions!:Mission[];  
  
  
  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  searchMission(){
    this._service.searchMission(this.date1, this.date2, this.clientName).subscribe(
      data=> this.missions = data,
      error=>console.log("exception" +error)
      )
      console.log(this.missions)
  }
  
  goGerer(){
    this._route.navigate(['/editMission']);

  }

}
