import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from '../y-service/ngservice-service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css',
  './button.scss',]
})
export class AdministrateurComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }



  retour(){
    this._route.navigate(['/administrateur']);

  }




  /** Navigration */

  goToActivity(){
    this._route.navigate(['/searchActivity']);
  }

  goToClient(){
    this._route.navigate(['/searchClient']);
  }

  goToExpense(){
    this._route.navigate(['/searchFrais']);
  }

  goToLeave(){
    this._route.navigate(['/searchLeave']);
  }

  goToCollaborator(){
    this._route.navigate(['/searchCollaborateur']);
  }

  goToMission(){
    this._route.navigate(['/searchMission']);
  }

  
  goToProject(){
    this._route.navigate(['/searchProject']);

  }



}
