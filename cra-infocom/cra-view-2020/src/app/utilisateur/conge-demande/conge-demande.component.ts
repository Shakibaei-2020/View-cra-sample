import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';
import { map } from 'rxjs/operators';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { LeaveService } from 'src/app/y-service/Leave/leave.service';
import { TypeLeaveService } from 'src/app/y-service/Leave/type-leave.service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-conge-demande',
  templateUrl: './conge-demande.component.html',
  styleUrls: ['./conge-demande.component.css',
    './button.scss'
  ]
})
export class CongeDemandeComponent implements OnInit {

  leave = new Leave();
  leaves!: Leave[];
  leaveType = new TypeLeave();
  aujourdhui !: string;


  allLeaveType!: TypeLeave[];

  leaveEndStatus = "leaveEndStatus"
  leaveStartStatus = "leaveStartStatus"


  constructor(
    private _route: Router,
    private _LeaveService: LeaveService,
    private _TypeLeaveService: TypeLeaveService,
    private _Collaborator: CollaboratorService,

  ) { }

  collaborator = new Collaborator;
  pageChange(newPage: number) {
    this._route.navigate([''], { queryParams: { page: newPage } });
  }

  ngOnInit(): void {

    /** id du collaborateur connecté suite à la connexion */
    this._Collaborator.selectOneCollabById(2).subscribe(
      data => this.collaborator = data,
    )

    /** on recupere tous les types */
    this._TypeLeaveService.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )

    /** id du collaborateur recuperé a la connexion */
    this._LeaveService.selectLeaveByCollabId(2).subscribe(
      data => this.leaves = data,
      error => console.log("exception" + error)
    )

  }



  /** Ajout de la demande de congé */
  addLeaveFormSubmit() {

    this.leave.collaboratorId = this.collaborator.id;
    this.leave.status = 'en-cours';
    this.leave.dateOfDemand = new Date(this.aujourdhui);
    this.leave.dateOfEndLeave = new Date(this.leave.dateOfEndLeave);
    this.leave.dateOfStartLeave = new Date(this.leave.dateOfStartLeave);
    this._LeaveService.addLeaveRequest(this.leave).subscribe(
      //  data => window.location.reload(),
    )

  }


  /** Navigation vers l'accueil*/
  retour() {
    this._route.navigate(['/utilisateur']);
  }


  /** delete de la note de frais via l'id*/
  deleteLeaveById(value: number) {
    this._LeaveService.deleteOneLeaveRequest(value).subscribe(
      data => window.location.reload(),
    )
  }




  dayNumber!: number;
  newDateStartLeave!: Date;
  newDateEndLeave!: Date;

  howManyday() {
    var Diff_temps = (new Date(this.leave.dateOfEndLeave).getTime() - new Date(this.leave.dateOfStartLeave).getTime());
    this.leave.nbJours = Diff_temps / (1000 * 3600 * 24);
  }


  joursEntiers!: boolean;

  joursEntiersChecked() {

    if (this.joursEntiers === true) {
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).value = "";

      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).value = "";

    } else {
      (<HTMLInputElement>document.getElementById(this.leaveStartStatus)).disabled = false;
      (<HTMLInputElement>document.getElementById(this.leaveEndStatus)).disabled = false;
    }
  }


}
