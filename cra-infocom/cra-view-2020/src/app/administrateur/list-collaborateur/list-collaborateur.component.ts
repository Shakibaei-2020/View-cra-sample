import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from '../../y-service/ngservice-service';
import { Collaborator } from '../../z-model/collaborator';

@Component({
  selector: 'app-list-collaborateur',
  templateUrl: './list-collaborateur.component.html',
  styleUrls: ['./list-collaborateur.component.css']
})
export class ListCollaborateurComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) {  
    

}

  
  public Collaborators!:Collaborator[];  

  
  ngOnInit(){
    this._service.fetchCollabListFromRemote().subscribe(
      data=> this.Collaborators = data,
      error=>console.log("exception" +error)
    )
  }
/** navigation */
  goToAddCollab(){
    this._route.navigate(['/']);
  }
  goToEditCollab(){
    this._route.navigate(['/']);
  }
  goToDeleteCollab(){
    this._route.navigate(['/']);
  }




}
