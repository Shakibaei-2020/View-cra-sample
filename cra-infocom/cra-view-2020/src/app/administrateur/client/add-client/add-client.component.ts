import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(private _route: Router, private _service: NgserviceService) { }

  ngOnInit(): void {

    this._service.selectAllTypeClient().subscribe(
      data => this.allClientType = data,
      error => console.log("exception" + error)
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



  newClient = new Client();
  allClientType!: TypeClient[]

  addClient() {

    this.newClient.typeClient  = this.clientType;

    this._service.addAndupdateClient(this.newClient).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

}
