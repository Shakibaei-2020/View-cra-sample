import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {


  message!:String;
  subscription!: Subscription;
  collaboratorInputId = new Collaborator();
  public collaborators!:Collaborator;  

  parentMessage = "message from parent"

  constructor(private _service:NgserviceService, private _route:Router) { }


  ngOnInit() {
  }
  

  /** fin test */


  goToEditCollab(){

    this._route.navigate(['/editCollaborateur']);
  }





  searchOneCollab(){

  this._service.fetchOneCollabFromRemote(this.collaboratorInputId.id).subscribe(
    data=> this.collaborators = data,
    error=>console.log("exception" +error)
    )
  }

}
