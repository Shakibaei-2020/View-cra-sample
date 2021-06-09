import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from '../y-service/ngservice-service';
import { Collaborator } from '../z-model/Collaborator/collaborator';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  collaborator = new Collaborator();

  nvcollaborator = new Collaborator();

  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {
  }

  connexionCollabFormSubmit(){

    this._service.selectCollabByMail(this.collaborator.email).subscribe(
      data=> this.nvcollaborator = data,
      error=>console.log("exception" +error)
      )

      if(this.nvcollaborator.email == this.collaborator.email && this.nvcollaborator.passward == this.collaborator.passward ){


      }
    }
    
  }

