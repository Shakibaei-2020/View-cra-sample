import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'


@Component({
  selector: 'app-declaration-activite',
  templateUrl: './declaration-activite.component.html',
  styleUrls: ['./declaration-activite.component.css']
})
export class DeclarationActiviteComponent implements OnInit {
 

  dt = new Date();
  month!: number;
  year!: number;
  day!: number;
  daysInMonth!: number;

  tabJours = new Array();
  activitiesPerDay = new Array();
  remotePerDay = new Array();
  activitiesPerDay5 = new Array();

  
  constructor(private _route: Router, private _service: NgserviceService) {}

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
      this.activitiesPerDay.push("jour-" + i + "-");
      this.remotePerDay.push("remote-" + i);

      /**Astreinte */
      this.activitiesPerDay5.push("jourAstreinte1-" + i);
    }
  }

  dynamicRowsAstreinte: number[] = [];
  addNewAstreinte() {
    this.dynamicRowsAstreinte.push(this.dynamicRowsAstreinte.length);
  }

  dynamicRowsActivity: number[] = [];
  addNewActivity() {
    this.dynamicRowsActivity.push(this.dynamicRowsActivity.length);
  }


  monthSelected!: number;
  yearInput!: number;
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

      /** Activité */
      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);

      /** Astreinte */
      this.activitiesPerDay5.push("jourAstreinte1-" + i);
    }

  }

  selectedType!: number;
  lesTypeActivity: TypeActivity[] = [];
  totalProjet1!: number;


  total(){
    var i ;
    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;

      /** Activité */
      this.totalProjet1 =(<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber; 

      console.log((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber);
    }
  }


  /** PROJECT 1 */
  dureeProjet1!: number;
  refinterne = new Number();
  refClient = new Number();
  laMission = new Mission();
  indexValSaisi!: number;
  tabAllInputedValue = new Array();
  j!: number;
  selectedOption!: number;
  theProject!: Project;
  isRemote!: Boolean;

  updatedAfterSelect() {
    this.refinterne = this.collaborateur.id;
    console.log(this.selectedOption);
    this._service.selectMissionById(this.selectedOption).subscribe(
      data => this.laMission = data,
      error => console.log("exception" + error)
    )
    this.refClient = this.laMission.client.id;
    console.log("la 1ere ref" + this.refClient)
  }

  remoteRemplis = false;
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
  remplirProjet1() {

    if (this.remplis == true) {
      this.dureeProjet1 = 0;
      this.remplis = false;
    } else {
      this.dureeProjet1 = 1;
      this.remplis = true;
    }
    this.totalProjet1 = this.daysInMonth;
  }

  /** ASTREINTE 1 */
  dureeAstreinte1!: number;
  totalAstreinte1!: number;
  theProject5 = new Project();
  laMission5 = new Mission();


  remplis5 = false;
  remplirAstreinte1() {
    if (this.remplis5 == true) {
      this.dureeAstreinte1 = 0;
      this.remplis5 = false;
    } else {
      this.dureeAstreinte1 = 1;
      this.remplis5 = true;
    }
    this.totalAstreinte1 = this.daysInMonth;
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
  selectedTypeUpdate() {
    console.log(this.selectedTypeUpdateValue);
    this._service.selectTypeActivityById(this.selectedTypeUpdateValue).subscribe(
      data => this.theTypeActivity = data,
      error => console.log("exception" + error)
    )
    this.astreinte1.TypeActivity = this.theTypeActivity;
    console.log("valeur" + this.astreinte1.TypeActivity.type);
  }



  /** COMMUN */

  aujourdhui !: string;

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


  activity1 = new Activity();

  typeActivity = new TypeActivity();

  astreinte1 = new Activity();


  TypeActivityAstreinte = new TypeActivity();

  EnregisterEtEnvoyer() {

    this.aujourdhui = this.formatageDate();

    this._service.selectTypeActivityById(1).subscribe(
      data => this.typeActivity = data,
      error => console.log("exception" + error)
    )
    console.log(this.typeActivity.type);

    /** activité  */
    if (this.selectedOption != null) {
      this._service.selectProjectByMissionId(this.selectedOption).subscribe(
        data => this.theProject = data,
        error => console.log("exception" + error)
      )
    }


    /** Astreinte */

    if (this.selectedOption5 != null) {
      this._service.selectProjectByMissionId(this.selectedOption5).subscribe(
        data => this.theProject5 = data,
        error => console.log("exception" + error)
      )
    }



    var i;
    for (i = 0; i < this.daysInMonth; i++) {

      /** activité  */

      if (this.theProject != null) {
        this.activity1.collaboratorId = 1;
        this.activity1.projectId = this.theProject.id;
        this.activity1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.activity1.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
        this.activity1.TypeActivity = this.typeActivity;
      }


      /** astreinte  */

      if (this.theProject5 != null) {
        this.astreinte1.collaboratorId = 1;
        this.astreinte1.projectId = this.theProject5.id;
        this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay5[i])).valueAsNumber;
      }



      /** activité  */



      this._service.addAndUpdateActivity(this.activity1, this.aujourdhui).subscribe(
        data => {
          console.log("activity1 ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )



      /** Astreinte  */


      this._service.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
        data => {
          console.log("astreinte1 ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )
    }
  }


  /** NAVIGATION */


  retour() {
    this._route.navigate(['/utilisateur']);
  }

}



