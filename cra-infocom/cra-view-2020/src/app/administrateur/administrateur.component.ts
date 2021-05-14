import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from '../y-service/ngservice-service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }


  goToAddCollab(){
    this._route.navigate(['/administrateur/collaborateur/ajout']);
  }



  goToUpdateCollab(){
    this._route.navigate(['/editCollab']);
  }

  goToListCollab(){
    this._route.navigate(['/listCollaborateur']);
  }


  goToDeleteCollab(){
    this._route.navigate(['/deleteCollab']);
  }




}
