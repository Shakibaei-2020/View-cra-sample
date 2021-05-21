import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-mission-search',
  templateUrl: './mission-search.component.html',
  styleUrls: ['./mission-search.component.css']
})
export class MissionSearchComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }


  goToEditMission(){
    this._route.navigate(['/editMission']);
  }


}
