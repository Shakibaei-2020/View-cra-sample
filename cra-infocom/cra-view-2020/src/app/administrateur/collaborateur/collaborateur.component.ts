import { Component, OnInit, ViewChild } from '@angular/core';
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


  subscription!: Subscription;
  collaboratorInputLastName = new Collaborator();

  public collaborators!:Collaborator[];  


  /** test communication between componente */
  
  parentMessage = "message from parent dqsdqsd";


    /** END test communication between componente */



  constructor(private _service:NgserviceService, private _route:Router) { 


  }




  ngOnInit() {

  }
  

  /** fin test */


  goToEditCollab(){

    this._route.navigate(['/editCollaborateur']);
  }





  searchOneCollab(){

  this._service.selectCollabByName(this.collaboratorInputLastName.lastName).subscribe(
    data=> this.collaborators = data,
    error=>console.log("exception" +error)
    )
  }

}
