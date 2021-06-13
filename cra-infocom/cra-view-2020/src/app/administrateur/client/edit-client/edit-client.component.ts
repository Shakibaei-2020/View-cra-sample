import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
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

  clientName = "clientName"
  clientRef = "clientRef"
  clientType = "clientType"


  ngOnInit(): void {
    
    /** id client a recuperé du search */
    this._service.selectClientById(2).subscribe(
      data=> this.client = data,
      error=>console.log("exception" +error)
      ) 
      
    this._service.selectAllTypeClient().subscribe(
      data => this.allClientType = data,
      error => console.log("exception" + error)
    )
  }


  clientToUpdate = new Client();
  updatedClient = new Client();
  newTypeClient = new TypeClient();

  updateClient(){

    this._service.selectClientById(2).subscribe(
      data1=> {this.clientToUpdate = data1;
        
        this.updatedClient.id = this.clientToUpdate.id;

        this._service.selectTypeClientById(+(<HTMLInputElement>document.getElementById(this.clientType)).value).subscribe(
          data2 => {this.newTypeClient = data2;

            this.updatedClient.name = (<HTMLInputElement>document.getElementById(this.clientName)).value  || this.clientToUpdate.name;
            this.updatedClient.ref = (<HTMLInputElement>document.getElementById(this.clientRef)).value|| this.clientToUpdate.ref;
            this.updatedClient.typeClient = this.newTypeClient || this.clientToUpdate.typeClient;

            this._service.addAndupdateClient(this.updatedClient).subscribe(
            data => {
              console.log("ajout effectué");
            },
            error => {
              console.log("erreur ajout non-effectué")
            }
            )
            window.location.reload();
          },
          error=> console.log("exception" + error),
        )
      },
      error=> console.log("exception" + error),

    )

  }

  deleteClient(){

    this._service.deleteClient(2).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }
    
}
