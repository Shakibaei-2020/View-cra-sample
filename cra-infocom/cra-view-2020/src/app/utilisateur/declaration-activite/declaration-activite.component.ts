import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import joursFeriees from '../../z-sources/data/joursFeriées.json'
import { DatePipe } from '@angular/common';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { TypeActivityService } from 'src/app/y-service/Activity/type-activity.service';
import { CollabJoinProjectService } from 'src/app/y-service/CollabJoinProject/collab-join-project.service';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { error } from 'selenium-webdriver';
import { Expense } from 'src/app/z-model/Expense/expense';
import { ExpenseService } from 'src/app/y-service/Expense/expense.service';
import { TypeExpenseService } from 'src/app/y-service/Expense/type-expense.service';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { table } from 'node:console';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-declaration-activite',
  templateUrl: './declaration-activite.component.html',
  styleUrls: ['./declaration-activite.component.css']
})
export class DeclarationActiviteComponent implements OnInit {

  joursFerieesList: { date: string, annee: number, zone: string, nom_jour_ferie: string }[] = joursFeriees;

  dt = new Date();
  month!: number;
  year!: number;
  day!: number;
  daysInMonth!: number;
  tabJours = new Array();

  monthSelected = this.dt.getMonth() + 1;
  yearInput = this.dt.getFullYear();

  activitiesPerDay = new Array();
  activitiesPerDay2 = new Array();
  activitiesPerDay3 = new Array();
  activitiesPerDay4 = new Array();

  remotePerDay = new Array();
  remotePerDay2 = new Array()
  remotePerDay3 = new Array()
  remotePerDay4 = new Array()


  isLoading: boolean = true;
  astreintePerDay1 = new Array();
  astreintePerDay2 = new Array();
  astreintePerDay3 = new Array();
  astreintePerDay4 = new Array();

  projectAstreinte = new Array();
  typeAstreinte = new Array();
  uniteAstreinte = new Array();

  toalDuTotalAcitivty = 0;

  totalActivity1 = "totalProjet1"
  totalActivity2 = "totalProjet2"
  totalActivity3 = "totalProjet3"
  totalActivity4 = "totalProjet4"

  constructor(
    private _route: Router,
    private _MissionService: MissionService,
    private _ProjectService: ProjectService,
    private _ActivityService: ActivityService,
    private _TypeActivityService: TypeActivityService,
    private _CollabJoinProjectService: CollabJoinProjectService,
    private _CollaboratorService: CollaboratorService,
    private _ExpenseService: ExpenseService,
    private _TypeExpenseService: TypeExpenseService,

  ) {
  }

  public missions!: Mission[];
  public collaborateur = new Collaborator;
  public projectsByCollab!: Project[];
  lesTypeActivity: TypeActivity[] = [];
  public projects!: ProjectCollaborator[];

  // Pour formater des dates faut faire appel à ce pipe comme l'exemple ci-dessous
  aujourdhuiTestFormat = new Date();
  pipeDate = new DatePipe('fr-FR');
  aujourdhuiTestFormatFormatee = this.pipeDate.transform(this.aujourdhuiTestFormat, 'yyyy-MM-dd');

  /** ACTIVITY */
  idOfDaysActivity1 = new Array();
  idOfDaysActivity2 = new Array();
  idOfDaysActivity3 = new Array();
  idOfDaysActivity4 = new Array();

  activity1ToEdit!: Activity[];
  activity2ToEdit!: Activity[];
  activity3ToEdit!: Activity[];
  activity4ToEdit!: Activity[];


  nbActivityWithId = new Array();
  allActivityToEdit!: Activity[];


  /** ASTREINTE MAJ */
  astreinte1ToEdit!: Activity[];
  idOfDaysAstreinte1 = new Array();
  astreinte2ToEdit!: Activity[];
  idOfDaysAstreinte2 = new Array();
  astreinte3ToEdit!: Activity[];
  idOfDaysAstreinte3 = new Array();

  nbAstreinteWithId = new Array();
  allAstreinteToEdit!: Activity[];

  ngOnInit(): void {


    this.aujourdhui = this.formatageDate();

    this.monthSelected = this.toDay.getMonth() + 1;
    this.yearInput = this.toDay.getFullYear();

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
      data => {
        this.collaborateur = data;
        this.ActivitiesToUpdate(this.collaborateur.id)

      },
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

    this.historique();


  }

  nbTypeAstreinte = new Array();

  ActivitiesToUpdate(idCollab: number) {

    this.nbActivityWithId = [];

    this.allActivityToEdit = [];
    this._ActivityService.activityGroupByProject(this.monthSelected, this.yearInput, idCollab).subscribe(
      data => {
        this.allActivityToEdit = data;
        for (var i = 0; i < this.allActivityToEdit.length; i++) {
          this.nbActivityWithId.push(this.allActivityToEdit[i].projectId);
        }
        /** ACTIVITY 1 */



        this.idOfDaysActivity1 = [];
        if (this.nbActivityWithId[0] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbActivityWithId[0]).subscribe(
            data => {
              this.activity1ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                this.idOfDaysActivity1.push(this.activity1ToEdit[i].id);
              }
            },
            error => console.log("exception" + error)
          )
        }


        /** ACTIVITY 2 */

        this.idOfDaysActivity2 = [];
        if (this.nbActivityWithId[1] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbActivityWithId[1]).subscribe(
            data => {
              this.activity2ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                this.idOfDaysActivity2.push(this.activity2ToEdit[i].id);
              }
            },
            error => console.log("exception" + error)
          )
        }


        /** ACTIVITY 3 */
        this.idOfDaysActivity3 = [];
        if (this.nbActivityWithId[2] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbActivityWithId[2]).subscribe(
            data => {
              this.activity3ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                this.idOfDaysActivity3.push(this.activity3ToEdit[i].id);

              }
            },
            error => console.log("exception" + error)
          )
        }


        /** ACTIVITY 4 */
        this.idOfDaysActivity4 = [];
        if (this.nbActivityWithId[3] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbActivityWithId[3]).subscribe(
            data => {
              this.activity4ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                this.idOfDaysActivity4.push(this.activity4ToEdit[i].id);
              }
            },
            error => console.log("exception" + error)
          )
        }


      },
      error => console.log("exception" + error)
    )


    /** ASTREINTE */
    this.nbAstreinteWithId = [];
    this.nbTypeAstreinte = [];

    this.allAstreinteToEdit = [];
    this._ActivityService.astreinteGroupByProject(this.monthSelected, this.yearInput, idCollab).subscribe(
      data => {
        this.allAstreinteToEdit = data;


        this.nbTypeAstreinte = [];

        for (var i = 0; i < this.allAstreinteToEdit.length; i++) {
          this.nbAstreinteWithId.push(this.allAstreinteToEdit[i].projectId);
          this.nbTypeAstreinte.push(this.allAstreinteToEdit[i].typeActivity.id)
        }

        this.idOfDaysAstreinte1 = [];
        if (this.nbAstreinteWithId[0] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbAstreinteWithId[0]).subscribe(
            data => {
              this.astreinte1ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                this.selectedProjectAstreint1 = 2;
                (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber = this.astreinte1ToEdit[i].duration;
                this.idOfDaysAstreinte1.push(this.astreinte1ToEdit[i].id);
                this.selectedProjectAstreint1 = this.nbAstreinteWithId[0];
                this.selectedTypeUpdateValue1 = this.nbTypeAstreinte[0];
              }

              this._ProjectService.selectProjectById(this.selectedProjectAstreint1).subscribe(
                data => this.theProjectAstreinte1 = data,
                error => console.log("error"),
              )

              this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
                data => this.theTypeActivity1 = data,
                error => console.log("exception" + error)
              )

              this.total5()
            },
            error => console.log("exception" + error)
          )
        }

        this.idOfDaysAstreinte2 = [];
        /** Astreinte 2 */
        if (this.nbAstreinteWithId[1] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbAstreinteWithId[1]).subscribe(
            data => {
              this.astreinte2ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber = this.astreinte2ToEdit[i].duration;
                this.idOfDaysAstreinte2.push(this.astreinte2ToEdit[i].id);
                this.selectedProjectAstreint2 = this.nbAstreinteWithId[1];
                this.selectedTypeUpdateValue2 = this.nbTypeAstreinte[1];


              }
              this._ProjectService.selectProjectById(this.selectedProjectAstreint2).subscribe(
                data => this.theProjectAstreinte2 = data,
                error => console.log("error"),
              )

              this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
                data => this.theTypeActivity2 = data,
                error => console.log("exception" + error)
              )
              this.total6()
            },
            error => console.log("exception" + error)
          )
        }


        /** Astreinte 3 */
        this.idOfDaysAstreinte3 = [];
        if (this.nbAstreinteWithId[2] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthSelected, this.yearInput, idCollab, this.nbAstreinteWithId[2]).subscribe(
            data => {
              this.astreinte3ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber = this.astreinte3ToEdit[i].duration;
                this.idOfDaysAstreinte3.push(this.astreinte3ToEdit[i].id);
                this.selectedProjectAstreint3 = this.nbAstreinteWithId[2];
                this.selectedTypeUpdateValue1 = this.nbTypeAstreinte[2];

              }
              this._ProjectService.selectProjectById(this.selectedProjectAstreint3).subscribe(
                data => this.theProjectAstreinte3 = data,
                error => console.log("error"),
              )

              this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
                data => this.theTypeActivity3 = data,
                error => console.log("exception" + error)
              )
              this.total7()
            },
            error => console.log("exception" + error)
          )
        }
      },
      error => console.log("exception" + error)
    )

  }

  /** total temps d'activité */
  updateMonth() {

    this.tabJours = [];

    this.activitiesPerDay = [];
    this.remotePerDay = [];
    this.activitiesPerDay2 = [];
    this.remotePerDay2 = [];
    this.activitiesPerDay3 = [];
    this.remotePerDay3 = [];
    this.activitiesPerDay4 = [];
    this.remotePerDay4 = [];

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

  onChangeSelectOption() {
    this._ProjectService.selectProjectById(this.selectedOption).subscribe(
      data => this.selectedProject = data,
      error => console.log("exception" + error)
    )
    return this.selectedProject.id;
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
  onChangeSelectOption2() {
    this._ProjectService.selectProjectById(this.selectedOption2).subscribe(
      data => this.selectedProject2 = data,
      error => console.log("exception" + error)
    )
    return this.selectedProject2.id;

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

  onChangeSelectOption3() {
    this._ProjectService.selectProjectById(this.selectedOption3).subscribe(
      data => this.selectedProject3 = data,
      error => console.log("exception" + error)
    )
    return this.selectedProject3.id;

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

  onChangeSelectOption4() {
    this._ProjectService.selectProjectById(this.selectedOption4).subscribe(
      data => this.selectedProject4 = data,
      error => console.log("exception" + error)
    )
    return this.selectedProject4.id;
  }
  /** ASTREINTE 1 */
  dureeAstreinte1 = 0;
  projectAstreinte1 = new Project();
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
  /** Select Type activité via l'id */
  theTypeActivity1 = new TypeActivity();
  selectedTypeUpdate1() {

    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
      data => this.theTypeActivity1 = data,
      error => console.log("exception" + error)
    )
    return this.theTypeActivity1;
  }

  theProjectAstreinte1 = new Project();
  onChangeSelectprojectAstreinte1() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint1).subscribe(
      data => this.theProjectAstreinte1 = data,
      error => console.log("exception" + error)
    )
    return this.theProjectAstreinte1.id;
  }

  /** ASTREINTE 2 */
  dureeAstreinte2 = 0;
  projectAstreinte2 = new Project();
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
  theTypeActivity2 = new TypeActivity();
  /** Select Type activité via l'id */
  selectedTypeUpdate2() {

    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
      data => this.theTypeActivity2 = data,
      error => console.log("exception" + error)
    )
    this.astreinte2.typeActivity = this.theTypeActivity2;
  }


  theProjectAstreinte2 = new Project();
  onChangeSelectprojectAstreinte2() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint2).subscribe(
      data => this.theProjectAstreinte2 = data,
      error => console.log("exception" + error)
    )
    return this.theProjectAstreinte2.id;
  }


  /** ASTREINTE 3 */
  dureeAstreinte3 = 0;
  projectAstreinte3 = new Project();
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
  theTypeActivity3 = new TypeActivity();
  /** Select Type activité via l'id */
  selectedTypeUpdate3() {
    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
      data => this.theTypeActivity3 = data,
      error => console.log("exception" + error)
    )
    this.astreinte3.typeActivity = this.theTypeActivity3;
  }

  theProjectAstreinte3 = new Project();
  onChangeSelectprojectAstreinte3() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint3).subscribe(
      data => this.theProjectAstreinte3 = data,
      error => console.log("exception" + error)
    )
    return this.theProjectAstreinte3.id;
  }


  astreinte1 = new Activity();
  astreinte2 = new Activity();
  astreinte3 = new Activity();

  typeActivity = new TypeActivity();
  typeActivity2 = new TypeActivity();
  typeActivity3 = new TypeActivity();
  typeActivity4 = new TypeActivity();

  selectedProject = new Project();
  selectedProject2 = new Project();
  selectedProject3 = new Project();
  selectedProject4 = new Project();


  activityNewNormal = new Activity;
  newActivity2 = new Activity;
  newActivity3 = new Activity;
  newActivity4 = new Activity;

  newAstreinte1 = new Activity;
  newAstreinte2 = new Activity;
  newAstreinte3 = new Activity;


  /** Check for activity if empty or not */

  public isEmptyActivity1 = false;
  public isEmptyActivity2 = false;
  public isEmptyActivity3 = false;
  public isEmptyActivity4 = false;

  async checkActivity1Empty() {
    this._ActivityService.checkActivityEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.selectedProject.id).subscribe(
      data => {
        this.isEmptyActivity1 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyActivity1;
  }
  async checkActivity2Empty() {
    this._ActivityService.checkActivityEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.selectedProject2.id).subscribe(
      data => {
        this.isEmptyActivity2 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyActivity2;
  }
  async checkActivity3Empty() {
    this._ActivityService.checkActivityEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.selectedProject3.id).subscribe(
      data => {
        this.isEmptyActivity3 = data;
        console.log("coucou :" + this.isEmptyActivity3)
      },
      () => console.log("error"),
    )
    return this.isEmptyActivity3;
  }
  async checkActivity4Empty() {
    this._ActivityService.checkActivityEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.selectedProject4.id).subscribe(
      data => {
        this.isEmptyActivity4 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyActivity4;
  }

  /** check for astreinte if empty or not */

  public isEmptyAstreinte1 = false;
  public isEmptyAstreinte2 = false;
  public isEmptyAstreinte3 = false;

  async checkAstreinte1Empty() {
    this._ActivityService.checkAstreinteEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.theProjectAstreinte1.id).subscribe(
      data => {
        this.isEmptyAstreinte1 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyAstreinte1;
  }
  async checkAstreinte2Empty() {
    this._ActivityService.checkAstreinteEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.theProjectAstreinte2.id).subscribe(
      data => {
        this.isEmptyAstreinte2 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyAstreinte2;
  }
  async checkAstreinte3Empty() {
    this._ActivityService.checkAstreinteEmpty(this.monthSelected, this.yearInput, this.collaborateur.id, this.theProjectAstreinte3.id).subscribe(
      data => {
        this.isEmptyAstreinte3 = data;
      },
      () => console.log("error"),
    )
    return this.isEmptyAstreinte3;
  }

  expenseExist = false;
  async checkExpenseEmpty() {
    this._ExpenseService.checkExpenseExist(this.monthSelected, this.yearInput, this.collaborateur.id).subscribe(
      data => {
        this.expenseExist = data;
      },
      () => console.log("error"),
    )
    return this.expenseExist;
  }

  /** 1401 */
  async EnregisterEtEnvoyer() {


    /** check activity Empty */
    if (this.selectedProject.id != undefined) {
      await this.checkActivity1Empty();
    }
    if (this.selectedProject2.id != undefined) {
      await this.checkActivity2Empty();
    }
    if (this.selectedProject3.id != undefined) {
      await this.checkActivity3Empty();
    }
    if (this.selectedProject4.id != undefined) {
      await this.checkActivity4Empty();
    }

    /** adding Activity 1 */
    setTimeout(() => {

      for (var i = 0; i != this.daysInMonth; i++) {

        if (this.isEmptyActivity1) {
          if (this.totalProjet1 != 0) {
            this.activityNormal.typeActivity = this.lesTypeActivity[0];
            this.activityNormal.collaboratorId = this.collaborateur.id;
            this.activityNormal.projectId = this.selectedProject.id;
            this.activityNormal.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
            this.activityNormal.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
            // on ajoute la date ici pourquoi la mettre en arguments
            this.activityNormal.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.activityNormal.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            // Il faut faire en sorte d'ajouter en fonction mois choisi le jour ou de l'activité.
            this._ActivityService.addAndUpdateActivity(this.activityNormal, this.aujourdhui).subscribe(
              data => { console.log("activity 1 ajouté"); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.activityNewNormal = new Activity;

          if (this.totalProjet1 != 0) {
            this.activityNewNormal.id = this.idOfDaysActivity1[i];
            this.activityNewNormal.typeActivity = this.lesTypeActivity[0];
            this.activityNewNormal.collaboratorId = this.collaborateur.id;
            this.activityNewNormal.projectId = this.onChangeSelectOption();
            this.activityNewNormal.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
            this.activityNewNormal.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
            this.activityNewNormal.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.activityNewNormal.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.activityNewNormal, this.aujourdhui).subscribe(
              data => { console.log("activity 1 updated"); },
              error => { console.log("erreur mise à jour non-effectué") }
            )
          }
        }
      }

    }, 200);
    /** adding Activity 2 */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyActivity2) {

          if (this.totalProjet2 != 0) {
            this.activity2.typeActivity = this.lesTypeActivity[0];
            this.activity2.collaboratorId = this.collaborateur.id;
            this.activity2.projectId = this.selectedProject2.id;
            this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
            this.activity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
            this.activity2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.activity2.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            this._ActivityService.addAndUpdateActivity(this.activity2, this.aujourdhui).subscribe(
              data => { console.log("activity 2 ajouté"); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newActivity2 = new Activity;

          if (this.totalProjet2 != 0) {
            this.newActivity2.id = this.idOfDaysActivity2[i];
            this.newActivity2.typeActivity = this.lesTypeActivity[0];
            this.newActivity2.collaboratorId = this.collaborateur.id;
            this.newActivity2.projectId = this.onChangeSelectOption2();
            this.newActivity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
            this.newActivity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
            this.newActivity2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newActivity2.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.newActivity2, this.aujourdhui).subscribe(
              data => { console.log("activity 2 updated"); },
              error => { console.log("erreur updated non-effectué") }
            )
          }
        }
      }
    }, 200);
    /** adding Activity 3 */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyActivity3) {

          if (this.totalProjet3 != 0) {
            this.activity3.typeActivity = this.lesTypeActivity[0];
            this.activity3.collaboratorId = this.collaborateur.id;
            this.activity3.projectId = this.selectedProject3.id;
            this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
            this.activity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
            this.activity3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.activity3.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            this._ActivityService.addAndUpdateActivity(this.activity3, this.aujourdhui).subscribe(
              data => { console.log("activity 3 ajouté"); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newActivity3 = new Activity;

          if (this.totalProjet3 != 0) {
            this.newActivity3.id = this.idOfDaysActivity3[i]
            this.newActivity3.typeActivity = this.lesTypeActivity[0];
            this.newActivity3.collaboratorId = this.collaborateur.id;
            this.newActivity3.projectId = this.onChangeSelectOption3();
            this.newActivity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
            this.newActivity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
            this.newActivity3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newActivity3.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.newActivity3, this.aujourdhui).subscribe(
              data => { console.log("activity 3 updated"); },
              error => { console.log("erreur updated non-effectué") }
            )
          }
        }
      }
    }, 200);
    /** adding Activity 4 */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyActivity3) {

          if (this.totalProjet4 != 0) {
            this.activity4.typeActivity = this.lesTypeActivity[0];
            this.activity4.collaboratorId = this.collaborateur.id;
            this.activity4.projectId = this.selectedProject4.id;
            this.activity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
            this.activity4.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked;
            this.activity4.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.activity4.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.activity4, this.aujourdhui).subscribe(
              data => { console.log("activity 4 ajouté"); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newActivity4 = new Activity;

          if (this.totalProjet4 != 0) {
            this.newActivity4.id = this.idOfDaysActivity4[i];
            this.newActivity4.typeActivity = this.lesTypeActivity[0];
            this.newActivity4.collaboratorId = this.collaborateur.id;
            this.newActivity4.projectId = this.onChangeSelectOption4();
            this.newActivity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
            this.newActivity4.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked;
            this.newActivity4.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newActivity4.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.newActivity4, this.aujourdhui).subscribe(
              data => { console.log("activity 4 updated"); },
              error => {
                console.log("erreur updated non-effectué")
              }
            )
          }
        }
      }
    }, 200);

    /** check activity Empty */
    if (this.theProjectAstreinte1.id != undefined) {
      await this.checkAstreinte1Empty();
    }
    if (this.theProjectAstreinte2.id != undefined) {
      await this.checkAstreinte2Empty();
    }
    if (this.theProjectAstreinte3.id != undefined) {
      await this.checkAstreinte3Empty();
    }

    /** adding astreinte 1  */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyAstreinte1) {
          if (this.totalAstreinte1 != 0) {
            this.astreinte1.collaboratorId = this.collaborateur.id;
            this.astreinte1.projectId = this.theProjectAstreinte1.id;
            this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
            this.astreinte1.typeActivity = this.theTypeActivity1;
            this.astreinte1.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.astreinte1.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
              data => { console.log("astreinte 1  ajouté "); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newAstreinte1 = new Activity;

          if (this.totalAstreinte1 != 0) {
            this.newAstreinte1.id = this.idOfDaysAstreinte1[i];
            this.newAstreinte1.collaboratorId = this.collaborateur.id;
            this.newAstreinte1.projectId = this.theProjectAstreinte1.id;
            this.newAstreinte1.typeActivity = this.theTypeActivity1;
            this.newAstreinte1.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
            this.newAstreinte1.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newAstreinte1.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            /**  
            this._ActivityService.addAndUpdateActivity(this.newAstreinte1, this.aujourdhui).subscribe(
              data => { console.log("astreinte 1 updated"); },
              error => {
                console.log("erreur updated non-effectué")
              }
            )*/
          }

        }
      }
    }, 200);
    /** adding astreinte 2 */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyAstreinte2) {
          if (this.totalAstreinte2 != 0) {
            this.astreinte2.collaboratorId = this.collaborateur.id;
            this.astreinte2.projectId = this.theProjectAstreinte2.id;
            this.astreinte2.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
            this.astreinte2.typeActivity = this.theTypeActivity2;
            this.astreinte2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.astreinte2.startDate, 'yyyy-MM-dd') || this.aujourdhui;
            this._ActivityService.addAndUpdateActivity(this.astreinte2, this.aujourdhui).subscribe(
              data => { console.log("astreinte 2 ajouté "); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newAstreinte2 = new Activity;

          if (this.totalAstreinte2 != 0) {
            this.newAstreinte2.id = this.idOfDaysAstreinte2[i];
            this.newAstreinte2.collaboratorId = this.collaborateur.id;
            this.newAstreinte2.projectId = this.theProjectAstreinte2.id;;
            this.newAstreinte2.typeActivity = this.theTypeActivity2;
            this.newAstreinte2.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
            this.newAstreinte2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newAstreinte2.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            this._ActivityService.addAndUpdateActivity(this.newAstreinte2, this.aujourdhui).subscribe(
              data => { console.log("astreinte 1 updated"); },
              error => {
                console.log("erreur updated non-effectué")
              }
            )
          }
        }
      }
    }, 200);
    /** adding astreinte 3 */
    setTimeout(() => {
      for (var i = 0; i != this.daysInMonth; i++) {
        if (this.isEmptyAstreinte3) {
          if (this.totalAstreinte3 != 0) {

            this.astreinte3.collaboratorId = this.collaborateur.id;
            this.astreinte3.projectId = this.theProjectAstreinte3.id;
            this.astreinte3.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
            this.astreinte3.typeActivity = this.theTypeActivity3;

            this.astreinte3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.astreinte3.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            this._ActivityService.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
              data => { console.log("astreinte  3 ajouté"); },
              error => { console.log("erreur ajout non-effectué") }
            )
          }
        } else {

          this.newAstreinte3 = new Activity;

          if (this.totalAstreinte3 != 0) {
            this.newAstreinte3.id = this.idOfDaysAstreinte3[i];
            this.newAstreinte3.collaboratorId = this.collaborateur.id;
            this.newAstreinte3.projectId = this.theProjectAstreinte3.id;;
            this.newAstreinte3.typeActivity = this.theTypeActivity3;
            this.newAstreinte3.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
            this.newAstreinte3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
            this.aujourdhui = this.pipeDate.transform(this.newAstreinte3.startDate, 'yyyy-MM-dd') || this.aujourdhui;

            this._ActivityService.addAndUpdateActivity(this.newAstreinte3, this.aujourdhui).subscribe(
              data => { console.log("astreinte 1 updated"); },
              error => {
                console.log("erreur updated non-effectué")
              }
            )
          }
        }
      }
    }, 200);

    /** ajout expense */

    await this.checkExpenseEmpty();


    setTimeout(() => {

      if (!this.expenseExist) {
        this._ExpenseService.expenseToUpdate(this.monthSelected, this.yearInput, this.collaborateur.id).subscribe(
          data => {
            this.updateExpense(data);
          },
          error => console.log("exception" + error)
        )
      } else {
        this.addExpense();
      }


      // window.location.reload();

    }, 200);

  }


  toDay = new Date();
  thisMonth!: number;
  thisyear!: number;


  historique() {



    this.thisMonth = this.toDay.getMonth() + 1;
    this.thisyear = this.toDay.getFullYear();

    this.nbActivityWithId = [];
    this.allActivityToEdit = [];

    if (((this.monthSelected == (this.thisMonth - 1)) || (this.monthSelected == this.thisMonth)) && (this.yearInput == this.thisyear)) {

      this._ActivityService.activityGroupByProject(this.monthSelected, this.yearInput, 2).subscribe(
        data => {
          this.allActivityToEdit = data;

          for (var i = 0; i < this.daysInMonth; i++) {


            if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).disabled == true) {
              (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.totalActivity1)).disabled = false;

              console.log((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])));

              (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.totalActivity2)).disabled = false;


              (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.totalActivity3)).disabled = false;

              (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).disabled = false;
              (<HTMLInputElement>document.getElementById(this.totalActivity4)).disabled = false;

            }
          }

          this.nbActivityWithId = [];
          for (var i = 0; i < this.allActivityToEdit.length; i++) {
            this.nbActivityWithId.push(this.allActivityToEdit[i].projectId);
          }

          /** ACTIVITY 1 */
          if (this.nbActivityWithId[0] !== undefined) {
            this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, this.collaborateur.id, this.nbActivityWithId[0]).subscribe(
              data => {
                this.activity1ToEdit = data;
                console.log("test")
                for (var i = 0; i < this.tabJours.length; i++) {
                  console.log(this.activity1ToEdit[i].duration);


                  (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber = this.activity1ToEdit[i].duration;
                  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked = this.activity1ToEdit[i].remote;
                  this.selectedOption = this.nbActivityWithId[0];
                  this._ProjectService.selectProjectById(this.selectedOption).subscribe(
                    data => this.selectedProject = data,
                    error => console.log("error"),
                  )

                }
                this.total()

              },
              error => console.log("exception" + error)
            )
          }
        },
        error => console.log("exception" + error)
      )


      /** ACTIVITY OLDER THAN 1 MONTH */
    } else if ((this.monthSelected < (this.thisMonth - 1)) && (this.yearInput <= this.thisyear)) {

      console.log("hitorisque 2 " + this.monthSelected + this.yearInput + this.collaborateur.id)


      for (var i = 0; i < this.daysInMonth; i++) {

        if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).disabled == false) {

          (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.totalActivity1)).disabled = true;

          (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber = 0;
          (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked = false;
          (<HTMLInputElement>document.getElementById(this.totalActivity1)).valueAsNumber = 0;


          (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.totalActivity2)).disabled = true;

          (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.totalActivity3)).disabled = true;

          (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).disabled = true;
          (<HTMLInputElement>document.getElementById(this.totalActivity4)).disabled = true;
        }
      }

      this.allActivityToEdit = [];

      this._ActivityService.activityGroupByProject(this.monthSelected, this.yearInput, this.collaborateur.id).subscribe(
        data => {
          this.allActivityToEdit = data;

          console.log("test")
          console.log(this.allActivityToEdit)
          this.nbActivityWithId = [];

          for (var i = 0; i < this.allActivityToEdit.length; i++) {
            this.nbActivityWithId.push(this.allActivityToEdit[i].projectId);
            console.log("coucouc");

          }


          /** ACTIVITY 1  OLD*/
          if (this.nbActivityWithId[0] !== undefined) {
            this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearInput, this.collaborateur.id, this.nbActivityWithId[0]).subscribe(
              data => {
                console.log("test")

                this.activity1ToEdit = data;
                for (var i = 0; i < this.tabJours.length; i++) {

                  (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).disabled = true;
                  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).disabled = true;
                  (<HTMLInputElement>document.getElementById(this.totalActivity1)).disabled = true;
                  this.selectedOption = this.nbActivityWithId[0];
                }
                this.total()
              },
              error => console.log("exception" + error)
            )
          }


        },
        error => console.log("exception" + error)
      )


    }

  }



  /** TOTAL CALCULE */
  totalActivity!: number;
  totalAllActivity() {
    this.totalActivity = this.totalProjet1 + this.totalProjet2 + this.totalProjet3 + this.totalProjet4;
    return this.totalActivity4;
  }

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
  totalAstreinte1 = 0;
  total5() {
    var i;
    this.totalAstreinte1 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber != undefined) {
        this.totalAstreinte1 = this.totalAstreinte1 + (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
      }
    }
  }
  totalAstreinte2 = 0;
  total6() {
    var i;
    this.totalAstreinte2 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber != undefined) {
        this.totalAstreinte2 = this.totalAstreinte2 + (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
      }
    }
  }
  totalAstreinte3 = 0;
  total7() {
    var i;
    this.totalAstreinte3 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber != undefined) {
        this.totalAstreinte3 = this.totalAstreinte3 + (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
      }
    }
  }

  /** AJOUT DE LA NOTE DE FRAIS */
  expense = new Expense;
  typeExpensePanier!: TypeExpense;
  addExpense() {
    this.expense.collaboratorId = this.collaborateur.id;
    this.expense.costHT = 0;
    this.expense.costTVA = 0;
    this.expense.costTTC = (this.totalActivity * 5);
    this.expense.status = "en-cours";
    this.expense.dateExpense = new Date;
    this.expense.dateRequest = new Date;

    this._TypeExpenseService.selectTypeExpenseById(4).subscribe(
      data => {
        this.expense.typeExpense = data;
        this._ExpenseService.addOneExpense(this.expense).subscribe(
          data => console.log("ajoute frais éffectué"),
          error => console.log("ajout non-effectuée" + error)
        )
      },
      error => console.log("exception" + error)
    )
  }

  newExpense = new Expense;
  updateExpense(expense: Expense) {

    this.newExpense.id = expense.id;
    this.newExpense.collaboratorId = this.collaborateur.id;
    this.newExpense.costHT = 0;
    this.newExpense.costTVA = 0;
    this.newExpense.costTTC = (this.totalActivity * 5);
    this.newExpense.status = "en-cours";
    this.newExpense.dateExpense = new Date;
    this.newExpense.dateRequest = new Date;
    console.log("test" + this.newExpense.costTTC)

    this._TypeExpenseService.selectTypeExpenseById(4).subscribe(
      data => {
        this.newExpense.typeExpense = data;
        this._ExpenseService.addOneExpense(this.newExpense).subscribe(
          data => console.log("update frais effectué"),
          error => console.log("update frais non-effectuée" + error)
        )
      },
      error => console.log("exception" + error)
    )

  }
  /** NAVIGATION */
  retour() {
    this._route.navigate(['/utilisateur']);
  }
  name = 'Angular';



  generatePdf() {

    console.log(this.tabJours.length);
    var rows = [];
    var tableOfindex = [];

    for (var i = 0; i < this.tabJours.length; i++) {
      tableOfindex.push([this.tabJours[i]]);
    }
    rows.push(tableOfindex)


    for (var i of [1, 2, 3, 4]) {
      rows.push(tableOfindex)
    }


    var dd = {

      pageSize: { width: 1250.4, height: 600.9 },

      content: [


        'First paragraph',

        'table:', {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*',],
            body: rows,
          }
        }


      ]
    }


    const documentDefinition = {




    };
    pdfMake.createPdf(dd).download();
  }


}


