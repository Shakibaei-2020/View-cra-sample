import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {



  constructor(private _service:NgserviceService, private _route:Router) { }


  ngOnInit() {

  }
  

  /** fin test */


  goToEditCollab(){

    this._route.navigate(['/editClient']);
  }





  searchOneCollab(){

  }


}
