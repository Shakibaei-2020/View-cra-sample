import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Client } from 'src/app/z-model/Client/client';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  nbResultat!: number;

  clientInput = new Client();
  public clients!:Client[];  


  constructor(private _service:NgserviceService, private _route:Router) { }


  ngOnInit() {}

  goToEditCollab(){
    this._route.navigate(['/editClient']);
  }

  goToAddClient(){
    this._route.navigate(['/addClient']);
  }

  searchClientByName(){

    if(this.clientInput.name != undefined && this.clientInput.name !=""){

    this._service.selectClientByName(this.clientInput.name).subscribe(
      data=> {this.clients = data;
        this.nbResultat = this.clients.length;},
      error=>console.log("exception" +error)
      )
      this.clientInput.name = "";
    }else{
      this._service.selectAllClient().subscribe(
        data=> {this.clients = data;
          this.nbResultat = this.clients.length;},
        error=>console.log("exception" +error)
        )
    }
  }

    goToAccueil(){
      this._route.navigate(['/administrateur']);
  
    }

  }
