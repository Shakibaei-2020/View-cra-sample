import { Component, OnInit, SystemJsNgModuleLoader, Type } from '@angular/core';
import { Router } from '@angular/router';
import { cpuUsage } from 'node:process';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Mission } from 'src/app/z-model/mission';
import { Project } from 'src/app/z-model/project';
import { TypeActivity } from 'src/app/z-model/type-activity';

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

  activitiesPerDay2 = new Array();
  remotePerDay2 = new Array();

  activitiesPerDay3 = new Array();
  remotePerDay3 = new Array();

  activitiesPerDay4 = new Array();
  remotePerDay4 = new Array();

  constructor(private _route: Router, private _service: NgserviceService) { }


  public missions!: Mission[];


  public collaborateur!: Collaborator;

  monthSelected!: number;

  updateMonth() {

    this.dt.setMonth(this.monthSelected - 1);

    console.log(this.monthSelected);
    console.log(this.dt)

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    var i;
    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;

      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);

      this.activitiesPerDay2.push("jour2-" + i);
      this.remotePerDay2.push("remote2-" + i);

      this.activitiesPerDay3.push("jour3-" + i);
      this.remotePerDay3.push("remote3-" + i);

      this.activitiesPerDay4.push("jour4-" + i);
      this.remotePerDay4.push("remote4-" + i);

    }

  }

  ngOnInit(): void {



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

      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);

      this.activitiesPerDay2.push("jour2-" + i);
      this.remotePerDay2.push("remote2-" + i);

      this.activitiesPerDay3.push("jour3-" + i);
      this.remotePerDay3.push("remote3-" + i);

      this.activitiesPerDay4.push("jour4-" + i);
      this.remotePerDay4.push("remote4-" + i);

    }
  }






  /** PROJECT 1 */

  dureeProjet1!: number;
  totalProjet1!: number;
  refinterne!: number;
  refClient!: number;
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
  }

  remplirRemoteP1() {
    this.isRemote = true;
  }

  remplirProjet1() {
    this.dureeProjet1 = 1;
    this.totalProjet1 = this.daysInMonth;
  }



  /** PROJECT 2 */



  dureeProjet2!: number;
  totalProjet2!: number;
  refinterne2!: number;
  refClient2!: number;
  laMission2 = new Mission();
  indexValSaisi2!: number;
  tabAllInputedValue2 = new Array();
  j2!: number;
  selectedOption2!: number;
  theProject2 = new Project();
  isRemote2!: Boolean;

  updatedAfterSelect2() {

    this.refinterne2 = this.collaborateur.id;
    console.log(this.selectedOption2);
    this._service.selectMissionById(this.selectedOption2).subscribe(
      data => this.laMission2 = data,
      error => console.log("exception" + error)
    )
    this.refClient2 = this.laMission2.client.id;
  }


  remplirRemoteP2() {
    this.isRemote2 = true;
  }

  remplirProjet2() {
    this.dureeProjet2 = 1;
    this.totalProjet2 = this.daysInMonth;
  }




  /** PROJECT 3 */

  dureeProjet3!: number;
  totalProjet3!: number;
  refinterne3!: number;
  refClient3!: number;
  laMission3 = new Mission();
  indexValSaisi3!: number;
  tabAllInputedValue3 = new Array();
  j3!: number;
  selectedOption3!: number;
  theProject3 = new Project();
  isRemote3!: Boolean;


  updatedAfterSelect3() {

    this.refinterne3 = this.collaborateur.id;
    console.log(this.selectedOption3);
    this._service.selectMissionById(this.selectedOption3).subscribe(
      data => this.laMission3 = data,
      error => console.log("exception" + error)
    )
    this.refClient3 = this.laMission3.client.id;
  }


  remplirRemoteP3() {
    this.isRemote3 = true;
  }

  remplirProjet3() {
    this.dureeProjet3 = 1;
    this.totalProjet3 = this.daysInMonth;
  }




  /** PROJECT 4 */


  dureeProjet4!: number;
  totalProjet4!: number;
  refinterne4!: number;
  refClient4!: number;
  laMission4 = new Mission();
  indexValSaisi4!: number;
  tabAllInputedValue4 = new Array();
  j4!: number;
  selectedOption4!: number;
  theProject4 = new Project();
  isRemote4!: Boolean;

  updatedAfterSelect4() {

    this.refinterne4 = this.collaborateur.id;
    console.log(this.selectedOption4);
    this._service.selectMissionById(this.selectedOption4).subscribe(
      data => this.laMission4 = data,
      error => console.log("exception" + error)
    )
    this.refClient4 = this.laMission4.client.id;
  }


  remplirRemoteP4() {
    this.isRemote4 = true;
  }

  remplirProjet4() {
    this.dureeProjet4 = 1;
    this.totalProjet4 = this.daysInMonth;
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
  activity2 = new Activity();
  activity3 = new Activity();
  activity4 = new Activity();

  typeActivity = new TypeActivity();



  EnregisterEtEnvoyer() {

    this.aujourdhui = this.formatageDate();

    this._service.selectTypeActivityById(1).subscribe(
      data => this.typeActivity = data,
      error => console.log("exception" + error)
    )

    if (this.selectedOption != null) {
      this._service.selectProjectByMissionId(this.selectedOption).subscribe(
        data => this.theProject = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption2 != null) {
      this._service.selectProjectByMissionId(this.selectedOption2).subscribe(
        data => this.theProject2 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption3 != null) {
      this._service.selectProjectByMissionId(this.selectedOption3).subscribe(
        data => this.theProject3 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption4 != null) {
      this._service.selectProjectByMissionId(this.selectedOption4).subscribe(
        data => this.theProject4 = data,
        error => console.log("exception" + error)
      )
    }

    var i;
    for (i = 0; i < this.daysInMonth; i++) {


      if (this.theProject != null) {
        this.activity1.collaboratorId = 1;
        this.activity1.projectId = this.theProject.id;
        this.activity1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.activity1.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
        this.activity1.TypeActivity = this.typeActivity;
      }

      if (this.theProject2 != null) {
        this.activity2.collaboratorId = 1;
        this.activity2.projectId = this.theProject2.id;
        this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.activity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
        this.activity2.TypeActivity = this.typeActivity;
      }

      if (this.theProject3 != null) {
        this.activity3.collaboratorId = 1;
        this.activity3.projectId = this.theProject3.id;
        this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.activity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
        this.activity3.TypeActivity = this.typeActivity;
      }
      if (this.theProject4 != null) {

        this.activity4.collaboratorId = 1;
        this.activity4.projectId = this.theProject4.id;
        this.activity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
        this.activity4.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked;
        this.activity4.TypeActivity = this.typeActivity;
      }



      this._service.addAndUpdateActivity(this.activity1, this.aujourdhui).subscribe(
        data => {
          console.log("activity1 ajouté");
          console.log("le types est de :" + this.typeActivity.type)
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )

   


      this._service.addAndUpdateActivity(this.activity2, this.aujourdhui).subscribe(
        data => {
          console.log("activity2 ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )


      this._service.addAndUpdateActivity(this.activity3, this.aujourdhui).subscribe(
        data => {
          console.log("activity3 ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )


      this._service.addAndUpdateActivity(this.activity4, this.aujourdhui).subscribe(
        data => {
          console.log("activity4 ajouté");
        },
        error => {
          console.log("erreur ajout non-effectué")
        }
      )



    }

  }
}



