import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Leave } from 'src/app/z-model/Leave/leave';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {

  date1!: string;
  date2!: string;
  status!: string;
  lastNameCollab!: string;



  constructor(private _service: NgserviceService, private _route: Router) { }

  collaborator = new Collaborator();
  leave = new Leave();

  collaborators !: Collaborator[];
  leaves!: Leave[];

  taille = 30;

  myData = new Array();
  nbResultat!: number;


  public page = 1;
  public pageSize = 10;


  ngOnInit(): void {

  }

  /** Methode afin de trouver un une demane de congé via  le status et entre quand ce situe ca date de demande */
  searchConge() {

    console.log(this.status)


    if ((this.date1 != undefined || this.date2 != undefined) && this.status != undefined && this.lastNameCollab != undefined) {

      this._service.searchLeave(this.date1, this.date2, this.status, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
    } else if ((this.date1 != undefined || this.date2 != undefined) && this.status != undefined && this.lastNameCollab === undefined) {

      this._service.searchLeaveByDateStatus(this.date1, this.date2, this.status).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

    } else if ((this.date1 != undefined || this.date2 != undefined) && this.status === undefined && this.lastNameCollab != undefined) {


      this._service.searchLeaveByDateStatus(this.date1, this.date2, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

    } else if ((this.date1 != undefined || this.date2 != undefined) && this.status === undefined && this.lastNameCollab === undefined) {


      this._service.searchLeaveByDate(this.date1, this.date2).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

    }else if ((this.date1 === undefined || this.date2 === undefined) && this.status != undefined && this.lastNameCollab !=  undefined) {
    
      this._service.searchLeaveByStatusName(this.status, this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
    
    }else if ((this.date1 === undefined || this.date2 === undefined) && this.status === undefined && this.lastNameCollab !=  undefined) {


      this._service.searchLeaveByName( this.lastNameCollab).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
    }else if ((this.date1 === undefined || this.date2 === undefined) && this.status != undefined && this.lastNameCollab ===  undefined) {

      
      this._service.searchLeaveByStatus( this.status).subscribe(
        data => {
          this.leaves = data;

          this.leaves.forEach(
            (item) => {
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                  }
                  this.nbResultat = this.leaves.length;
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);


    }



  }




  /** recupere la demande de congé d'un collaborateur via son id */
  getCollabByLeaveId() {
    /** selectionne un collaborateur avec la clé etrangere idCollaborateur dans la table leave */
    this._service.selectCollabByLeaveId(2).subscribe(
      data => this.collaborator = data,
      error => console.log("exception" + error)
    )
    setTimeout(() => {
    }, 50);
  }

  /** routing vers ajout de demande de congé */
  goToAddConge() {
    this._route.navigate(['/addConge']);
  }

  /** routing vers editer un congé */
  goGerer() {
    this._route.navigate(['/editLeave']);
  }

  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }
}
