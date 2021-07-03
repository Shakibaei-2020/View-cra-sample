import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css',
    './button.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }

  retour() {
    this._route.navigate(['/utilisateur']);
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
