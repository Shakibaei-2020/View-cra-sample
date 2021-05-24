import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';
import{ ChildComponent} from './child/child.component'

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {


  subscription!: Subscription;
  collaboratorInputLastName = new Collaborator();
  public collaborators!:Collaborator;  

  
  parentMessage = "message from parent dqsdqsd";
  @ViewChild(ChildComponent) child: any;


  constructor(private _service:NgserviceService, private _route:Router) { 


  }

  message!:string;



  ngOnInit() {
    this.message = this.child.message

  }
  

  /** fin test */


  goToEditCollab(){

    this._route.navigate(['/editCollaborateur']);
  }





  searchOneCollab(){

  this._service.fetchOneCollabByNameFromRemote(this.collaboratorInputLastName.lastName).subscribe(
    data=> this.collaborators = data,
    error=>console.log("exception" +error)
    )
  }

}
