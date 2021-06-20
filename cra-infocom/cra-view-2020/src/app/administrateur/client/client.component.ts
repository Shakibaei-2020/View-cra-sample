import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/y-service/Client/client.service';
import { TypeClientService } from 'src/app/y-service/Client/type-client.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  nbResultat!: number;

  clientInput = new Client();
  clients!: Client[];


  /**CLIENT */
  clientId = new Array();
  nameClient = new Array();
  refClient = new Array();
  typeClient = new Array();

  constructor(
    private _service: NgserviceService, 
    private _route: Router,
    private _ClientService: ClientService,
    private _TypeClientService: TypeClientService,
    ) { }


  allClientType!: TypeClient[];

  ngOnInit() {


    this._TypeClientService.selectAllTypeClient().subscribe(
      data => this.allClientType = data,
      error => console.log("exception" + error)
    )

  }


  searchClientByName() {

    if (this.clientInput.name != undefined && this.clientInput.name != "") {

      this.clientId = [];
      this.nameClient = [];
      this.refClient = [];
      this.typeClient = [];

      this._ClientService.selectClientByName(this.clientInput.name).subscribe(
        data => {
          this.clients = data;

          for (var i = 0; i < this.clients.length; i++) {
            this.clientId.push("clientId-" + i)
            this.nameClient.push("nameClient-" + i)
            this.refClient.push("refClient-" + i)
            this.typeClient.push("typeClient-" + i)
          }

            this.nbResultat = this.clients.length;
          },
          error => console.log("exception" + error)
      )
      this.clientInput.name = "";
    } else {

      this.clientId = [];
      this.nameClient = [];
      this.refClient = [];
      this.typeClient = [];

      this._ClientService.selectAllClient().subscribe(
        data => {
          this.clients = data;

          for (var i = 0; i < this.clients.length; i++) {
            this.clientId.push("clientId-" + i)
            this.nameClient.push("nameClient-" + i)
            this.refClient.push("refClient-" + i)
            this.typeClient.push("typeClient-" + i)
          }


          this.nbResultat = this.clients.length;
        },
        error => console.log("exception" + error)
      )
    }
  }


  clientToUpdate = new Client();
  updatedClient = new Client();
  newTypeClient = new TypeClient();

  updateClient(indexOfElement: number) {

    console.log(indexOfElement)
    console.log(+((<HTMLInputElement>document.getElementById(this.clientId[indexOfElement])).value))
  this._ClientService.selectClientById(+((<HTMLInputElement>document.getElementById(this.clientId[indexOfElement])).value)).subscribe(
      data1=> {this.clientToUpdate = data1;
        
        this.updatedClient.id = this.clientToUpdate.id;

        this._TypeClientService.selectTypeClientById(+(<HTMLInputElement>document.getElementById(this.typeClient[indexOfElement])).value).subscribe(
          data2 => {
            
            this.newTypeClient = data2;

            this.updatedClient.name = (<HTMLInputElement>document.getElementById(this.nameClient[indexOfElement])).value  || this.clientToUpdate.name;
            this.updatedClient.ref = (<HTMLInputElement>document.getElementById(this.refClient[indexOfElement])).value|| this.clientToUpdate.ref;
            this.updatedClient.typeClient = this.newTypeClient || this.clientToUpdate.typeClient;

            this._ClientService.addAndupdateClient(this.updatedClient).subscribe(
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

  deleteClient(clientIndex: number) {
    console.log(clientIndex)
    this._ClientService.deleteClient(clientIndex).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )


  }

  /** NAVIGATION */
  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }

  goToEditCollab() {
    this._route.navigate(['/editClient']);
  }

  goToAddClient() {
    this._route.navigate(['/addClient']);
  }

}
