import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-accueil-administrateur',
  templateUrl: './accueil-administrateur.component.html',
  styleUrls: ['./accueil-administrateur.component.css']
})
export class AccueilAdministrateurComponent implements OnInit {

  collaborateur = new Collaborator();

  constructor(private _route: Router,private _service: NgserviceService) { }

  ngOnInit(): void {

    this._service.selectOneCollabById(3).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )


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




  
  
}
