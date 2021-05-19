import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  collaborator = new Collaborator();


  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {
  }


  
  addCollabFormSubmit(){

    this._service.addCollabToRemote(this.collaborator).subscribe(
      data =>{
        console.log("ajout effectué");
        this._route.navigate(['listCollab']);
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }

}
