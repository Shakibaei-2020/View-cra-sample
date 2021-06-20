import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-accueil-utilisateur',
  templateUrl: './accueil-utilisateur.component.html',
  styleUrls: ['./accueil-utilisateur.component.css']
})
export class AccueilUtilisateurComponent implements OnInit {

  collaborateur = new Collaborator();

  constructor(
    private _route: Router,
     private _CollaboratorService:CollaboratorService,
     
     ) { }

  ngOnInit(): void {
    /** */
    this._CollaboratorService.selectOneCollabById(3).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )
  }


  /** Navigation */
  goToProfil() {
    this._route.navigate(['/monProfil']);
  }

  goToDeclarationActivite() {
    this._route.navigate(['/declarationActivite']);
  }


  goToDemandeConge() {
    this._route.navigate(['/demandeConge']);
  }

  goToAddNoteDeFrais() {
    this._route.navigate(['/ajouterNoteDeFraisUser']);
  }


}
