import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { TypeClient } from 'src/app/z-model/Client/type-client';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';
import { EditCollaborateurComponent } from '../edit/edit-collaborateur.component';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  collaborator = new Collaborator();


  mdp!: string;

  

  constructor(
    private _route:Router,
    private _CollaboratorService:CollaboratorService,
    private _TypeCollaboratorService:TypeCollaboratorService,
     ) {}

  allTypeCollaborator!: TypeCollaborator[];

  ngOnInit(): void {

    this._TypeCollaboratorService.selectAllTypeCollaborator().subscribe(
      data => this.allTypeCollaborator = data,
      error => console.log("exception" + error)
    )


  }

  dateEntre!: string;
  dateSortie!: string;

  addCollabFormSubmit(){

    this.mdp = this.randomMDP();

    this.collaborator.password =  this.mdp;
    this.collaborator.typeCollaborator = this.collaboratorType;

   this._CollaboratorService.addCollab(this.collaborator,this.dateEntre,this.dateSortie).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )

    }

    idOfCollType!: number;
    collaboratorType = new TypeCollaborator();
  
    getCollType() {
      this._TypeCollaboratorService.selectTypeCollaboratorById(this.idOfCollType).subscribe(
        data => { this.collaboratorType = data; },
        error => console.log("exception" + error),
      )
      setTimeout(() => {
      }, 50);
    }


    randomMDP() {
      length = 10
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     console.log(result)
     return result;
  }
  
  goToSearch(){
    this._route.navigate(['/searchCollaborateur']);
  }

 
}
