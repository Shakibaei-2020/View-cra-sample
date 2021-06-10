import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  allClientType!: TypeClient[];

  client = new Client();
  updatedClient = new Client();

  ngOnInit(): void {
    this._service.selectClientById(1).subscribe(
      data=> this.client = data,
      error=>console.log("exception" +error)
      ) 
      
    this._service.selectAllTypeClient().subscribe(
      data => this.allClientType = data,
      error => console.log("exception" + error)
    )
  }


  
  updateClient(){
    this.updatedClient.id = this.client.id;
    this.updatedClient.typeClient = this.clientType;

    this._service.addAndupdateClient(this.updatedClient).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    window.location.reload();

  }

  deleteClient(){

    this.updatedClient.id = 2;
    
    this._service.deleteClient(this.updatedClient.id).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }


  idOfClientType!: number;
  clientType = new TypeClient();

  getClientType() {
    this._service.selectTypeClientById(this.idOfClientType).subscribe(
      data => { this.clientType = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
    }, 50);
  }

    
}
