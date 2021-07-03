import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css',
  '../button.scss']
})
export class MonProfileComponent implements OnInit {

  constructor(
    private _route: Router,
     private _CollaboratorService:CollaboratorService,
     
     ) { }

  collaborateur = new Collaborator();
  newPassward!: string;
  confirmationPassward!: string;



  ngOnInit(): void {

    /** données du collaborateur recuperer via l'id de connexion */
    /** */
    this._CollaboratorService.selectOneCollabById(3).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )
  }

  /** retour au menu */
  retour() {
    this._route.navigate(['/utilisateur']);
  }


  alert!: string;

  updateCollab() {

     if (this.newPassward === this.confirmationPassward) {
 
      if(this.newPassward != undefined && this.confirmationPassward != undefined){

        console.log(this.newPassward)

        this.collaborateur.passward = this.newPassward;

        this._CollaboratorService.updateCollab(this.collaborateur).subscribe(
          data => {
            console.log("update effectué");
            this.alert = "Modification réussie !"
          },
          error => {
            console.log("Update non-effectuer")
            this.alert = "Aucune modification à été effectuées !"
            
          }
        )  
      } else this.alert = "Merci de remplir tous les champs !"
    } else this.alert = "Les mots de passe ne sont pas identique !"
  }

}
