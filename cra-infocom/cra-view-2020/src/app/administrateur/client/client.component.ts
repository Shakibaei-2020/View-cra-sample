import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';
import { Client } from 'src/app/z-model/client';
import { Collaborator } from 'src/app/z-model/collaborator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  clientInput = new Client();
  public clients!:Client[];  


  constructor(private _service:NgserviceService, private _route:Router) { }


  ngOnInit() {

  }
  



  goToEditCollab(){

    this._route.navigate(['/editClient']);
  }




  searchClientByName(){

    this._service.selectClientByName(this.clientInput.name).subscribe(
      data=> this.clients = data,
      error=>console.log("exception" +error)
      )
    }

}
