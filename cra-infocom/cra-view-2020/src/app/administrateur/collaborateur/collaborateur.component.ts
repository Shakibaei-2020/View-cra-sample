import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {


  collaboratorInputLastName = new Collaborator();

  public collaborators!:Collaborator[];  
  nbResultat!: number;





  constructor(
     private _route:Router,
     private _CollaboratorService:CollaboratorService,
     ) {}

  ngOnInit() { }
  
  /** recherche d'un collaborateur via son nom de famille */

  
  searchOneCollab(){

    if(this.collaboratorInputLastName.lastName != undefined && this.collaboratorInputLastName.lastName != ""  ){

      this._CollaboratorService.selectCollabByName(this.collaboratorInputLastName.lastName).subscribe(
        data=> {this.collaborators = data;
        this.nbResultat = this.collaborators.length;
      },
        error=>console.log("exception" +error)
        )
        this.collaboratorInputLastName.lastName ="";
      }else{        
      this._CollaboratorService.selectAllCollab().subscribe(
        data=> {this.collaborators = data;
        this.nbResultat = this.collaborators.length;
      },
        error=>console.log("exception" +error)
        )
      }
    }

    
    

  
  /** redirection vers editer collab */
  goToEditCollab(){

    this._route.navigate(['/editCollaborateur']);
  }

  /** redirection vers ajouter un collab */
  goToAddCollab(){
    this._route.navigate(['/addCollaborateur']);
  }

  /** redirection vers accueil administrateur */
  goToAccueil(){
    this._route.navigate(['/administrateur']);

  }



}
