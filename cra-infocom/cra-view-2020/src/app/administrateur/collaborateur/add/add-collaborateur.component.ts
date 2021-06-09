import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { EditCollaborateurComponent } from '../edit/edit-collaborateur.component';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  collaborator = new Collaborator();
  date1 = new Date;
  date2 = new Date;


  

  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {

  }



  addCollabFormSubmit(){


   this._service.addCollab(this.collaborator,this.date1,this.date2).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }


}
