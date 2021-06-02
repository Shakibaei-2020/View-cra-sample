import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';

@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css']
})
export class MonProfileComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  collaborateur = new Collaborator();
  newPassward!: string;

  ngOnInit(): void {

    this._service.selectOneCollabById(2).subscribe(
      data=> this.collaborateur = data,
      error=>console.log("exception" +error)
      )
  }


  updateCollab(){

    this.collaborateur.passward = this.newPassward;

    this._service.updateCollab(this.collaborateur).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }

}
