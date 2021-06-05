import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-utilisateur',
  templateUrl: './accueil-utilisateur.component.html',
  styleUrls: ['./accueil-utilisateur.component.css']
})
export class AccueilUtilisateurComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }



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
