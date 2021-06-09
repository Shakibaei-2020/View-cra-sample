import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-administrateur',
  templateUrl: './accueil-administrateur.component.html',
  styleUrls: ['./accueil-administrateur.component.css']
})
export class AccueilAdministrateurComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }


  
}
