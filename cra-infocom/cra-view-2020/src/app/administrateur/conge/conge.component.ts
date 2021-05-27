import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/leave';

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

  
  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  searchConge(){
    this._service.searchLeave(this.date1, this.date2, this.status).subscribe(
      data=> this.leaves = data,
      error=>console.log("exception" +error)
      )
      console.log(this.leaves)
  }
  
  goGerer(){
    this._route.navigate(['/editConge']);

  }

}
