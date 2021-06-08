import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css']
})
export class MonProfileComponent implements OnInit {

  constructor(private _service: NgserviceService, private _route: Router) { }

  collaborateur = new Collaborator();
  newPassward!: string;
  confirmationPassward!: string;
  url!: File;



  ngOnInit(): void {
    this._service.selectOneCollabById(3).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )

    console.log(this.collaborateur.profileImagePath)
  }

  retour() {
    this._route.navigate(['/utilisateur']);
  }


  alert!: string;

  updateCollab() {


     if (this.newPassward == this.confirmationPassward) {

      if(this.newPassward != "" && this.confirmationPassward != ""){

        console.log(this.newPassward)

        this.collaborateur.passward = this.newPassward;

        this._service.updateCollab(this.collaborateur).subscribe(
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
