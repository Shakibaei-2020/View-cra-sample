import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Client } from 'src/app/z-model/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }


  updatedClient = new Client();
  client = new Client();
  
  updateClient(){


    this.updatedClient.id = 2;

    this._service.addAndupdateClient(this.updatedClient).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
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

    
}
