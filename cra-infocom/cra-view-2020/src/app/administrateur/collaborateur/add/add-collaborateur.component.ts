import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  date1 = new Date;
  date2 = new Date;

  mdp!: string;

  

  constructor(private _route:Router,private _service:NgserviceService) { }

  allTypeCollaborator!: TypeCollaborator[];

  ngOnInit(): void {

    this._service.selectAllTypeCollaborator().subscribe(
      data => this.allTypeCollaborator = data,
      error => console.log("exception" + error)
    )


  }

  addCollabFormSubmit(){

    this.mdp = this.randomMDP();

    this.collaborator.passward =   this.mdp;
    this.collaborator.typeCollaborator = this.collaboratorType;

   this._service.addCollab(this.collaborator,this.date1,this.date2).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )

    console.log
    }

    idOfCollType!: number;
    collaboratorType = new TypeCollaborator();
  
    getCollType() {
      this._service.selectTypeCollaboratorById(this.idOfCollType).subscribe(
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
  

 
}
