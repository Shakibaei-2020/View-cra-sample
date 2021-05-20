import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-collaborateur',
  templateUrl: './search-collaborateur.component.html',
  styleUrls: ['./search-collaborateur.component.css']
})
export class SearchCollaborateurComponent implements OnInit , OnDestroy {


  message!:String;
  subscription!: Subscription;

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit() {
    this.subscription = this._service.currentMessage.subscribe(message => this.message = message)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
  /** fin test */


  goToEditCollab(){
    this._route.navigate(['/editCollaborateur']);
  }

  public collaborators!:Collaborator;  

  collaboratorInputId = new Collaborator();



  searchOneCollab(){

  this._service.fetchOneCollabFromRemote(this.collaboratorInputId.id).subscribe(
    data=> this.collaborators = data,
    error=>console.log("exception" +error)
    )
  }




  

}
