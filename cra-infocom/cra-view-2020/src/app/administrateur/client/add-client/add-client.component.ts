import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/y-service/Client/client.service';
import { TypeClientService } from 'src/app/y-service/Client/type-client.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(
    private _route: Router, 
    private _service: NgserviceService,
    private _ClientService: ClientService,
    private _TypeClientService: TypeClientService,

    ) { }

  ngOnInit(): void {

    this._TypeClientService.selectAllTypeClient().subscribe(
      data => this.allClientType = data,
      error => console.log("exception" + error)
    )

  }


  idOfClientType!: number;
  clientType = new TypeClient();

  getClientType() {
    this._TypeClientService.selectTypeClientById(this.idOfClientType).subscribe(
      data => { this.clientType = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
    }, 50);
  }



  newClient = new Client();
  allClientType!: TypeClient[]

  addClient() {

    this.newClient.typeClient  = this.clientType;


    this._ClientService.addAndupdateClient(this.newClient).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("Remplissé tout les champs !")
      }
    )
  }

  goToSearch(){
    this._route.navigate(['/searchClient']);
  }
    

}
