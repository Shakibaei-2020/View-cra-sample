import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import joursFeriees  from '../../z-sources/data/joursFeriées.json'

@Component({
  selector: 'app-declaration-activite',
  templateUrl: './declaration-activite.component.html',
  styleUrls: ['./declaration-activite.component.css']
})
export class DeclarationActiviteComponent implements OnInit {



  joursFerieesList:{date: string , annee: number , zone: string, nom_jour_ferie:string}[] = joursFeriees;


  dt = new Date();
  month!: number;
  year!: number;
  day!: number;
  daysInMonth!: number;

  tabJours = new Array();
  activitiesPerDay = new Array();
  remotePerDay = new Array();
  activitiesPerDay5 = new Array();

  toalDuTotalAcitivty = 0 ;

  constructor(private _route: Router, private _service: NgserviceService) { 
 
  }




  public missions!: Mission[];
  public collaborateur!: Collaborator;

  ngOnInit(): void {




    this.dynamicRowsAstreinte.push(this.dynamicRowsAstreinte.length);
    this.dynamicRowsActivity.push(this.dynamicRowsActivity.length);

    this._service.selectAllTypeActivity().subscribe(
      data => this.lesTypeActivity = data,
      error => console.log("exception" + error)
    )

    this._service.selectAllMission().subscribe(
      data => this.missions = data,
      error => console.log("exception" + error)
    )

    this._service.selectOneCollabById(2).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    var i;

    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;

      /** Activité */
      this.activitiesPerDay.push("jour-" + i );
      this.remotePerDay.push("remote-" + i);

      /**Astreinte */
      this.activitiesPerDay5.push("jourAstreinte-" + i);
    }


    
  }

  dynamicRowsAstreinte: number[] = [];

  /** Ajouter une nouvelle*/
  addNewAstreinte() {
    this.dynamicRowsAstreinte.push(this.dynamicRowsAstreinte.length);
  }

  dynamicRowsActivity: number[] = [];
  
  /** total temps d'activité */
  addNewActivity() {
    this.dynamicRowsActivity.push(this.dynamicRowsActivity.length);
  }


  monthSelected!: number;
  yearInput!: number;

  /** total temps d'activité */
  updateMonth() {
    this.tabJours = [];

    this.dt.setMonth(this.monthSelected - 1);
    this.dt.setFullYear(this.yearInput)

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();
    this.day = this.dt.getDay();

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    var i;

    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
    }

  }

  aujourdhui !: string;

  /** Commentaire */
  formatageDate() {
    var jour = new Date().getDay() - 1;
    var jour_toString = jour.toString();
    if (jour < 10) {
      jour_toString = "0" + jour_toString;
    }
    var mois = new Date().getMonth() + 1;
    var mois_toString = mois.toString();
    if (mois < 10) {
      mois_toString = "0" + mois_toString;
    }
    var annee = new Date().getFullYear();
    return annee + '-' + mois_toString + '-' + jour_toString;
  }


  selectedType!: number;
  lesTypeActivity: TypeActivity[] = [];
  totalProjet1= 0;

  /** total temps d'activité */
  total() {
    var i;
    for (i = 0; i <  this.daysInMonth; i++) {
      if((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber != undefined){
     this.totalProjet1 =   this.totalProjet1  +(<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
      }
  }
}

  /** total temps d'astreinte */
  total2() {
    var i;
    for (i = 0; i <  this.daysInMonth; i++) {
      if((<HTMLInputElement>document.getElementById(this.activitiesPerDay5[i])).valueAsNumber != undefined){
     this.totalAstreinte =   this.totalProjet1  +(<HTMLInputElement>document.getElementById(this.activitiesPerDay5[i])).valueAsNumber;
      }
  }
  this.totalAstreinte = 0;
}


  /** ACTIVITE  */
  dureeProjet1 = 0;
  refinterne = new Number();
  refClient = new Number();
  laMission = new Mission();
  indexValSaisi!: number;
  tabAllInputedValue = new Array();
  j!: number;
  selectedOption!: number;
  ProjectActivity!: Project;
  isRemote = false ;


  updatedAfterSelect() {
    this.refinterne = this.collaborateur.id;

    this._service.selectMissionById(this.selectedOption).subscribe(
      data => this.laMission = data,
      error => console.log("exception" + error)
    )
    this.refClient = this.laMission.client.id;
  }

  remoteRemplis = false;

  /** Remplissage automatique des remotes de  l'Activité*/
  remplirRemoteP1() {
    if (this.remoteRemplis == true) {
      this.isRemote = false;
      this.remoteRemplis = false;
    } else {
      this.isRemote = true;
      this.remoteRemplis = true;
    }
  }

  remplis = false;

  /** Remplissage automatique de l'Activité*/
  remplirProjet1() {
    

    if (this.remplis == true) {
      this.dureeProjet1 = 0;
      this.totalProjet1 = 0;
      this.remplis = false;
    } else {
      this.dureeProjet1 = 1;
      this.totalProjet1 = this.daysInMonth;
      this.remplis = true;
    }
  }

  /** ASTREINTE 1 */
  dureeAstreinte = 0 ;
  totalAstreinte = 0;
  ProjectAstreinte = new Project();
  laMission5 = new Mission();


  remplis5 = false;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte() {
    if (this.remplis5 == true) {
      this.dureeAstreinte = 0;
      this.remplis5 = false;
    } else {
      this.dureeAstreinte = 1;
      this.remplis5 = true;
    }
    this.totalAstreinte = this.daysInMonth;
  }

  selectedOption5!: number;

  
  updatedAfterSelect5() {
    this._service.selectMissionById(this.selectedOption5).subscribe(
      data => this.laMission5 = data,
      error => console.log("exception" + error)
    )
  }

  selectedTypeUpdateValue!: number;
  theTypeActivity = new TypeActivity();

  /** Select Type activité via l'id */
  selectedTypeUpdate() {
    console.log(this.selectedTypeUpdateValue);
    this._service.selectTypeActivityById(this.selectedTypeUpdateValue).subscribe(
      data => this.theTypeActivity = data,
      error => console.log("exception" + error)
    )
    this.astreinte.TypeActivity = this.theTypeActivity;
  }


  /** COMMUN ACTIVITY + ASTREINTE*/



  activity = new Activity();
  astreinte = new Activity();
  typeActivity = new TypeActivity();

  EnregisterEtEnvoyer() {

    this.aujourdhui = this.formatageDate();

    /** Select type activity By Id  */
    this._service.selectTypeActivityById(1).subscribe(
      data => this.typeActivity = data,
      error => console.log("exception" + error)
    )

    /** Select Project by Mission Id  */

    if (this.selectedOption != null) {
      this._service.selectProjectByMissionId(this.selectedOption).subscribe(
        data => this.ProjectActivity = data,
        error => console.log("exception" + error)
      )
    }


    for ( var i = 0; i < this.daysInMonth; i++) {

      /** activité  */

      if (this.ProjectActivity != null) {
        this.activity.collaboratorId = 1;
        this.activity.projectId = this.ProjectActivity.id;
        this.activity.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.activity.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
        this.activity.TypeActivity = this.typeActivity;
      }

      console.log("id activité " +this.activity.id)
      console.log(" projectId " +this.activity.projectId)
      console.log(" duration " +this.activity.duration)
      console.log("remote " +this.activity.remote)
      console.log("TypeActivity " +this.activity.TypeActivity.id)

      /**  
      this._service.addAndUpdateActivity(this.activity, this.aujourdhui).subscribe(
        data => {
          console.log("activity ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )
       */



      /** astreinte  */

      if (this.selectedOption5 != null) {
        this._service.selectProjectByMissionId(this.selectedOption5).subscribe(
          data => this.ProjectAstreinte = data,
          error => console.log("exception" + error)
        )
      }

      if (this.ProjectAstreinte != null) {
        this.astreinte.collaboratorId = 1;
        this.astreinte.projectId = this.ProjectAstreinte.id;
        this.astreinte.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay5[i])).valueAsNumber;
      }

      /**   
      this._service.addAndUpdateActivity(this.astreinte, this.aujourdhui).subscribe(
        data => {
          console.log("astreinte ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )
      */


    }
  }


  /** NAVIGATION */

  retour() {
    this._route.navigate(['/utilisateur']);
  }

  test(){


    (<HTMLInputElement>document.getElementById(this.activitiesPerDay[1])).disabled = true;
    (<HTMLInputElement>document.getElementById(this.activitiesPerDay[1])).valueAsNumber = 1;

}
}



