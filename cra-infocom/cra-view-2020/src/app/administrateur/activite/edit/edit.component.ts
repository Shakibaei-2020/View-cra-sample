import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { TypeActivityService } from 'src/app/y-service/Activity/type-activity.service';
import { CollabJoinProjectService } from 'src/app/y-service/CollabJoinProject/collab-join-project.service';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  dt = new Date();
  month!: number;
  year!: number;
  day!: number;
  daysInMonth!: number;

  monthSelected = this.dt.getMonth() + 1;
  yearInput = this.dt.getFullYear();

  tabJours = new Array();

  activitiesPerDay = new Array();
  remotePerDay = new Array();

  activitiesPerDay2 = new Array();
  remotePerDay2 = new Array()

  activitiesPerDay3 = new Array();
  remotePerDay3 = new Array()

  activitiesPerDay4 = new Array();
  remotePerDay4 = new Array()

  /**  astreinte dynamique
   astreintePerDay = new Array();
   */
  isLoading: boolean = true;
  astreintePerDay1 = new Array();
  astreintePerDay2 = new Array();
  astreintePerDay3 = new Array();
  astreintePerDay4 = new Array();

  projectAstreinte = new Array();
  typeAstreinte = new Array();
  uniteAstreinte = new Array();

  toalDuTotalAcitivty = 0;

  constructor(
    private _route: Router,
    private _MissionService: MissionService,
    private _ProjectService: ProjectService,
    private _ActivityService: ActivityService,
    private _TypeActivityService: TypeActivityService,
    private _CollabJoinProjectService: CollabJoinProjectService,
    private _CollaboratorService: CollaboratorService,
  ) {
  }

  public missions!: Mission[];
  public collaborateur!: Collaborator;

  public projectsByCollab!: Project[];
  lesTypeActivity: TypeActivity[] = [];
  public projects!: ProjectCollaborator[];

  // Pour formater des dates faut faire appel à ce pipe comme l'exemple ci-dessous
  aujourdhuiTestFormat = new Date();
  pipeDate = new DatePipe('fr-FR');
  aujourdhuiTestFormatFormatee = this.pipeDate.transform(this.aujourdhuiTestFormat, 'yyyy-MM-dd');
  editedCollaborator!: Collaborator;


  activity1ToEdit!: Activity[];
  idOfDaysActivity1 = new Array();
  idProjectActivity1 = new Array();
  idCollaboratorActivity1 = new Array();

  activity2ToEdit!: Activity[];
  activity3ToEdit!: Activity[];
  activity4ToEdit!: Activity[];

  ngOnInit(): void {

    /** Collaborateur en cours de mofification */
    this._CollaboratorService.selectOneCollabById(2).subscribe(
      data => {
        this.editedCollaborator = data;
      },
      error => console.log("exception" + error)
    )

    this.aujourdhui = this.formatageDate();

    // Pour récupérer la liste des types d'activité : opérationnelle
    this._TypeActivityService.selectAllTypeActivity().subscribe(
      data => this.lesTypeActivity = data,
      error => console.log("exception" + error),
      () => this.isLoading = false
    )

    // Pour récupérer la liste des missions : opérationnelle mais avoir si on en a vraiment besoin
    this._MissionService.selectAllMission().subscribe(
      data => this.missions = data,
      error => console.log("exception" + error)
    )

    // Pour récupérer la liste des projects affectés à un collaborateur : opérationnelle mais faut l'automatiser
    // TODO : attention c'es en dur

    this._CollabJoinProjectService.selectProjectCollabByCollabId(2).subscribe(
      data => {
        this.projects = data;
      },
      error => console.log("exception" + error)
    )

    // Pour récupérer toutes les informations sur un collaborateur : opérationnelle mais faut l'automatiser
    // TODO : attention c'es en dur


    this._CollaboratorService.selectOneCollabById(2).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )

    // Afin de récupérer le nombre de jour dans un mois : opérationnelle mais on peut faire mieux or at least extract this methode outside ngOnInit()
    // En plus de calcul se refait dans la méthode updateMonth(), il sera mieux de le faire à un seul endroit et mettre la valeur de ce mois par défaut.
    /* this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();*/
    this.daysInMonth = new Date(this.yearInput, this.monthSelected, 0).getDate();

    // Cette bocle sert à affecter un nom à chaque case du calendrier en HTML pour les activités et les astreintes
    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);

      this.activitiesPerDay2.push("jour2-" + i);
      this.remotePerDay2.push("remote2-" + i);

      this.activitiesPerDay3.push("jour3-" + i);
      this.remotePerDay3.push("remote3-" + i);

      this.activitiesPerDay4.push("jour4-" + i);
      this.remotePerDay4.push("remote4-" + i);

      this.astreintePerDay1.push("jourAstreinte1-" + i);
      this.astreintePerDay2.push("jourAstreinte2-" + i);
      this.astreintePerDay3.push("jourAstreinte3-" + i);
      this.astreintePerDay4.push("jourAstreinte4-" + i);
    }

 
    this._ActivityService.searchTheActivityOfCollaboratorOfProject(6,2021,2,33).subscribe(
     data=>{this.activity1ToEdit = data;
      for(var i = 0 ; i< this.tabJours.length; i++){
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber = this.activity1ToEdit[i].duration;
        (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked =  this.activity1ToEdit[i].remote;
        this.selectedOption=this.activity1ToEdit[i].projectId;
        this.idOfDaysActivity1.push(this.activity1ToEdit[i].id)
        console.log(this.idOfDaysActivity1)
        //console.log(this.idProjectActivity1)
        //console.log(this.idCollaboratorActivity1)
        this.activityNormal.projectId = 6;
        this.activityNormal.collaboratorId = 2;
        this.selectedOption = 33;
        console.log(this.tabJours.length)
      }
    },
     error=>console.log("exception" +error)
    )


  }

  /** total temps d'activité */
  updateMonth() {

    this.tabJours = [];
    this.activitiesPerDay = [];
    this.remotePerDay = [];
    this.dt.setMonth(this.monthSelected - 1);
    this.dt.setFullYear(this.yearInput)

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();
    this.day = this.dt.getDay();

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);
    }
  }

  // Je sais que ça fonctionne mais l'idée et de partir sur l'autre formatage avec le pipe
  /** Formatage de la date */
  aujourdhui !: string;
  formatageDate() {
    var jour = new Date().getDay() + 6;
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

  /** ACTIVITE1  */
  dureeProjet1 = 0;
  tabAllInputedValue = new Array();
  selectedOption!: number;
  projectActivity = new Project;
  isRemote = false;
  activityNormal = new Activity;

  /** Remplissage automatique des remotes de l'Activité avec 0 et 1 */
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

  /** Remplissage automatique de l'Activité*/
  remplis = false;
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
    this.totalAllActivity();
  }
  /** calcule du total du l'activité declaré N1 */
  totalProjet1 = 0;
  total() {
    this.totalProjet1 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber != undefined) {
        this.totalProjet1 = this.totalProjet1 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
           this.totalActivity = this.totalActivity + this.totalProjet1;
      }
    }
    this.totalAllActivity();
  }

  /** ACTIVITE2  */

  dureeProjet2 = 0;
  tabAllInputedValue2 = new Array();
  selectedOption2!: number;
  ProjectActivity2!: Project;
  isRemote2 = false;
  activity2 = new Activity;

  /** Remplissage automatique des remotes de l'Activité avec 0 et 1 */
  remoteRemplis2 = false;
  remplirRemoteP2() {
    if (this.remoteRemplis2 == true) {
      this.isRemote2 = false;
      this.remoteRemplis2 = false;
    } else {
      this.isRemote2 = true;
      this.remoteRemplis2 = true;
    }
  }

  /** Remplissage automatique de l'Activité*/
  remplis2 = false;
  remplirProjet2() {

    if (this.remplis2 == true) {
      this.dureeProjet2 = 0;
      this.totalProjet2 = 0;
      this.remplis2 = false;
    } else {
      this.dureeProjet2 = 1;
      this.totalProjet2 = this.daysInMonth;
      this.remplis2 = true;
    }
    this.totalAllActivity();
  }
  /** calcule du total du l'activité declaré N1 */
  totalProjet2 = 0;
  total2() {
    this.totalProjet2 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber != undefined) {
        this.totalProjet2 = this.totalProjet2 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet2;
      }
    }
    this.totalAllActivity();
  }

  /** ACTIVITE 3  */
  dureeProjet3 = 0;
  tabAllInputedValue3 = new Array();
  selectedOption3!: number;
  ProjectActivity3!: Project;
  isRemote3 = false;
  activity3 = new Activity();


  /** Remplissage automatique des remotes de l'Activité avec 0 et 1 */
  remoteRemplis3 = false;
  remplirRemoteP3() {
    if (this.remoteRemplis3 == true) {
      this.isRemote3 = false;
      this.remoteRemplis3 = false;
    } else {
      this.isRemote3 = true;
      this.remoteRemplis3 = true;
    }
  }

  /** Remplissage automatique de l'Activité*/
  remplis3 = false;
  remplirProjet3() {

    if (this.remplis3 == true) {
      this.dureeProjet3 = 0;
      this.totalProjet3 = 0;
      this.remplis3 = false;
    } else {
      this.dureeProjet3 = 1;
      this.totalProjet3 = this.daysInMonth;
      this.remplis3 = true;
    }
    this.totalAllActivity();
  }
  /** calcule du total du l'activité declaré N1 */
  totalProjet3 = 0;
  total3() {
    this.totalProjet3 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber != undefined) {
        this.totalProjet3 = this.totalProjet3 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet3;
      }
    }
    this.totalAllActivity();
  }

  /** ACTIVITE 4  */
  dureeProjet4 = 0;
  tabAllInputedValue4 = new Array();
  selectedOption4!: number;
  ProjectActivity4!: Project;
  isRemote4 = false;
  activity4 = new Activity();

  /** Remplissage automatique des remotes de l'Activité avec 0 et 1 */
  remoteRemplis4 = false;
  remplirRemoteP4() {
    if (this.remoteRemplis4 == true) {
      this.isRemote4 = false;
      this.remoteRemplis4 = false;
    } else {
      this.isRemote4 = true;
      this.remoteRemplis4 = true;
    }
  }

  /** Remplissage automatique de l'Activité*/
  remplis4 = false;
  remplirProjet4() {

    if (this.remplis4 == true) {
      this.dureeProjet4 = 0;
      this.totalProjet4 = 0;
      this.remplis4 = false;
    } else {
      this.dureeProjet4 = 1;
      this.totalProjet4 = this.daysInMonth;
      this.remplis4 = true;
    }
    this.totalAllActivity();
  }
  /** calcule du total du l'activité declaré N1 */
  totalProjet4 = 0;
  total4() {
    this.totalProjet4 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber != undefined) {
        this.totalProjet4 = this.totalProjet4 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet4;
      }
    }
    this.totalAllActivity();
  }

  /** ASTREINTE 1 */

  dureeAstreinte1 = 0;
  totalAstreinte1 = 0;
  projectAstreinte1 = new Project();
  laMissionAstreinte1 = new Mission();
  astreinte1remplis = false;

  selectedProjectAstreint1!: number;
  selectedTypeUpdateValue1!: number;
  selectedUniteAstreint1!: number;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte1() {
    if (this.astreinte1remplis == true) {
      this.dureeAstreinte1 = 0;
      this.astreinte1remplis = false;
      this.totalAstreinte1 = 0;
    } else {
      this.dureeAstreinte1 = 1;
      this.astreinte1remplis = true;
      this.totalAstreinte1 = this.daysInMonth;
    }
  }

  updateAfterSelectAstreinte1() {
    this._MissionService.selectMissionById(this.selectedProjectAstreint1).subscribe(
      data => this.laMissionAstreinte1 = data,
      error => console.log("exception" + error)
    )
  }

  /** Select Type activité via l'id */
  theTypeActivity1 = new TypeActivity();
  selectedTypeUpdate1() {

    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
      data => this.theTypeActivity1 = data,
      error => console.log("exception" + error)
    )
  }

  total5() {
    var i;
    this.totalAstreinte1 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber != undefined) {
        this.totalAstreinte1 = this.totalAstreinte1 + (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
      }
    }
  }

  /** ASTREINTE 2 */
  dureeAstreinte2 = 0;
  totalAstreinte2 = 0;
  projectAstreinte2 = new Project();
  laMissionAstreinte2 = new Mission();
  astreinte2remplis = false;

  selectedProjectAstreint2!: number;
  selectedTypeUpdateValue2!: number;
  selectedUniteAstreint2!: number;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte2() {
    if (this.astreinte2remplis == true) {
      this.dureeAstreinte2 = 0;
      this.astreinte2remplis = false;
      this.totalAstreinte2 = 0;
    } else {
      this.dureeAstreinte2 = 1;
      this.astreinte2remplis = true;
      this.totalAstreinte2 = this.daysInMonth;
    }
  }

  updateAfterSelectAstreinte2() {
    this._MissionService.selectMissionById(this.selectedProjectAstreint2).subscribe(
      data => this.laMissionAstreinte2 = data,
      error => console.log("exception" + error)
    )
  }

  theTypeActivity2 = new TypeActivity();

  /** Select Type activité via l'id */
  selectedTypeUpdate2() {

    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
      data => this.theTypeActivity2 = data,
      error => console.log("exception" + error)
    )
    this.astreinte2.typeActivity = this.theTypeActivity2;
  }

  total6() {
    var i;
    this.totalAstreinte2 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber != undefined) {
        this.totalAstreinte2 = this.totalAstreinte2 + (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
      }
    }
  }

  /** ASTREINTE 3 */
  dureeAstreinte3 = 0;
  totalAstreinte3 = 0;
  projectAstreinte3 = new Project();
  laMissionAstreinte3 = new Mission();
  astreinte3remplis = false;
  typeActivityNormal = new TypeActivity;

  selectedProjectAstreint3!: number;
  selectedTypeUpdateValue3!: number;
  selectedUniteAstreint3!: number;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte3() {
    if (this.astreinte3remplis == true) {
      this.dureeAstreinte3 = 0;
      this.astreinte3remplis = false;
      this.total7();
    } else {
      this.dureeAstreinte3 = 1;
      this.astreinte3remplis = true;
      this.total7();
    }
  }

  updateAfterSelectAstreinte3() {
    this._MissionService.selectMissionById(this.selectedProjectAstreint3).subscribe(
      data => this.laMissionAstreinte3 = data,
      error => console.log("exception" + error)
    )
  }

  theTypeActivity3 = new TypeActivity();

  /** Select Type activité via l'id */

  selectedTypeUpdate3() {
    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
      data => this.theTypeActivity3 = data,
      error => console.log("exception" + error)
    )
    this.astreinte3.typeActivity = this.theTypeActivity3;
  }

  total7() {
    var i;
    this.totalAstreinte3 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber != undefined) {
        this.totalAstreinte3 = this.totalAstreinte3 + (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
      }
    }
  }

  /** COMMUN ACTIVITY + ASTREINTE*/

  /** 
  astreinte = new Activity();*/
  astreinte1 = new Activity();
  astreinte2 = new Activity();
  astreinte3 = new Activity();
  astreinte4 = new Activity();


  typeActivity = new TypeActivity();
  typeActivity2 = new TypeActivity();
  typeActivity3 = new TypeActivity();
  typeActivity4 = new TypeActivity();


  selectedProject = new Project();
  selectedProject2 = new Project();
  selectedProject3 = new Project();
  selectedProject4 = new Project();

  async EnregisterEtEnvoyer() {

    /** FOR ACTIVITY  */

    if (this.selectedOption != null && this.selectedOption != undefined) {
      console.log("gello")
      this._ProjectService.selectProjectById(this.selectedOption).subscribe(
        data => {
          this.selectedProject = data;
          this.activityNormal.typeActivity = this.lesTypeActivity[0];
          this.activityNormal.projectId = this.selectedProject.id;
          this.activityNormal.collaboratorId = this.collaborateur.id;
        },
        error => console.log("exception" + error)
      )
      // Si un projet est selectioné, on atribue à l'activité un type et l'id du projet.

    }

    console.log(this.selectedOption2)
    if (this.selectedOption2 != null && this.selectedOption2 != undefined) {
      this._ProjectService.selectProjectById(this.selectedOption2).subscribe(
        data => {
          this.selectedProject2 = data;
          this.activity2.typeActivity = this.lesTypeActivity[0];
          this.activity2.projectId = this.selectedProject2.id;
          this.activity2.collaboratorId = this.collaborateur.id;
        },
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption3 != null && this.selectedOption3 != undefined) {
      this._ProjectService.selectProjectById(this.selectedOption3).subscribe(
        data => {
          this.selectedProject3 = data;
          this.activity3.typeActivity = this.lesTypeActivity[0];
          this.activity3.projectId = this.selectedProject3.id;
          this.activity3.collaboratorId = this.collaborateur.id;
        },
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption4 != null && this.selectedOption4 != undefined) {
      this._ProjectService.selectProjectById(this.selectedOption4).subscribe(
        data => {
          this.selectedProject4 = data;
          this.activity4.typeActivity = this.lesTypeActivity[0];
          this.activity4.projectId = this.selectedProject4.id;
          this.activity4.collaboratorId = this.collaborateur.id;
        },
        error => console.log("exception" + error)
      )
    }

    for (var i = 0; i < this.daysInMonth; i++) {


      /** ACTIVITY 1 activityNormal */
      if (this.totalProjet1 != 0) {

        this.activityNormal.id = this.idOfDaysActivity1[i];
        this.activityNormal.collaboratorId = this.idCollaboratorActivity1[i];
        this.activityNormal.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.activityNormal.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
        // on ajoute la date ici pourquoi la mettre en arguments
        this.activityNormal.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activityNormal.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        // Il faut faire en sorte d'ajouter en fonction mois choisi le jour ou de l'activité.

        this._ActivityService.addAndUpdateActivity(this.activityNormal, this.aujourdhui).subscribe(
          data => {
            console.log("activity 1 updated");
          },
          error => {
            console.log("erreur mise à jour non-effectué")
          }
        )
      }

      /** ACTIVITY 2 */
      if (this.totalProjet2 != 0) {
        this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.activity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
        // on ajoute la date ici pourquoi la mettre en arguments
        this.activity2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activity2.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        // Il faut faire en sorte d'ajouter en fonction mois choisi le jour ou de l'activité.

        this._ActivityService.addAndUpdateActivity(this.activity2, this.aujourdhui).subscribe(
          data => {
            console.log("activity 2 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ACTIVITY 3 */

      if (this.totalProjet3 != 0) {
        this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.activity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
        // on ajoute la date ici pourquoi la mettre en arguments
        this.activity3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activity3.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        // Il faut faire en sorte d'ajouter en fonction mois choisi le jour ou de l'activité.

        this._ActivityService.addAndUpdateActivity(this.activity3, this.aujourdhui).subscribe(
          data => {
            console.log("activity 3 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ACTIVITY 4 */


      if (this.totalProjet4 != 0) {
        this.activity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
        this.activity4.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked;
        // on ajoute la date ici pourquoi la mettre en arguments
        this.activity4.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activity4.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        // Il faut faire en sorte d'ajouter en fonction mois choisi le jour ou de l'activité.

        this._ActivityService.addAndUpdateActivity(this.activity4, this.aujourdhui).subscribe(
          data => {
            console.log("activity 4 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ASTREINTE 1  */

      if (this.totalAstreinte1 != 0) {

        this._ProjectService.selectProjectByMissionId(2).subscribe(
          data => this.projectAstreinte1 = data,
          error => console.log("exception" + error)
        )

        this.astreinte1.collaboratorId = this.collaborateur.id;
        this.astreinte1.projectId = this.selectedProjectAstreint1;
        this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
        this.astreinte1.typeActivity = this.theTypeActivity1;

        console.log(this.astreinte1.collaboratorId)
        console.log("id du cadsqdq :" + this.astreinte1.projectId)
        console.log(this.astreinte1.duration)
        console.log(this.astreinte1.typeActivity)


        this._ActivityService.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte 1  ajouté ");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ASTREINTE 2  */

      if (this.totalAstreinte2 != 0) {

        this._ProjectService.selectProjectByMissionId(2).subscribe(
          data => this.projectAstreinte2 = data,
          error => console.log("exception" + error)
        )

        this.astreinte2.collaboratorId = this.collaborateur.id;
        this.astreinte2.projectId = this.selectedProjectAstreint1;
        this.astreinte2.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
        this.astreinte2.typeActivity = this.theTypeActivity2;

        this._ActivityService.addAndUpdateActivity(this.astreinte2, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte 2 ajouté ");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ASTREINTE 3 */

      if (this.totalAstreinte3 != 0) {
        this.astreinte3.collaboratorId = this.collaborateur.id;
        this.astreinte3.projectId = this.selectedProjectAstreint3;
        this.astreinte3.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
        this.astreinte3.typeActivity = this.theTypeActivity3;

        this._ActivityService.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte  3 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }
    }
  }

  
  /** NAVIGATION */
  retour() {
    this._route.navigate(['/administrateur']);
  }

  test() {
    console.log("type :" + this.typeAstreinte)
  }

  totalActivity!: number;

  totalAllActivity() {
    this.totalActivity = this.totalProjet1 + this.totalProjet2 + this.totalProjet3 + this.totalProjet4;
  }


}
