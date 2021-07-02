import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { TypeActivityService } from 'src/app/y-service/Activity/type-activity.service';
import { CollabJoinProjectService } from 'src/app/y-service/CollabJoinProject/collab-join-project.service';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { JoursFerie } from 'src/app/z-model/Activity/jours-ferie';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  /** from activity */
  dt = new Date();
  month!: number;
  year!: number;
  day!: number;
  daysInMonth!: number;


  totalActivity1 = "totalActivity1";
  totalActivity2 = "totalActivity2";
  totalActivity3 = "totalActivity3";
  totalActivity4 = "totalActivity4";

  totalAstreinte1HTML = "totalAstreinte1HTML";
  totalAstreinte2HTML = "totalAstreinte2HTML";
  totalAstreinte3HTML = "totalAstreinte3HTML";

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


  /** ACTIVITY */
  activity1ToEdit!: Activity[];
  idOfDaysActivity1 = new Array();
  idOfCollabActivity1 = new Array();
  idOfProjectActivity1 = new Array();
  idOfTypeActivity1 = new Array();
  projectActivityNormal = new Project;

  activity2ToEdit!: Activity[];
  idOfDaysActivity2 = new Array();
  idOfCollabActivity2 = new Array();
  idOfProjectActivity2 = new Array();
  idOfTypeActivity2 = new Array();
  projectActivity2 = new Project;

  activity3ToEdit!: Activity[];
  idOfDaysActivity3 = new Array();
  idOfCollabActivity3 = new Array();
  idOfProjectActivity3 = new Array();
  idOfTypeActivity3 = new Array();
  projectActivity3 = new Project;

  activity4ToEdit!: Activity[];
  idOfDaysActivity4 = new Array();
  idOfCollabActivity4 = new Array();
  idOfProjectActivity4 = new Array();
  idOfTypeActivity4 = new Array();
  projectActivity4 = new Project;
  /** ASTREINTE */

  astreinte1ToEdit!: Activity[];
  idOfDaysAstreinte1 = new Array();
  idOfCollabAstreinte1 = new Array();
  idOfProjectAstreinte1 = new Array();
  idOfTypeAstreinte1 = new Array();
  projectAstreinte1 =new Project;
  typeAstreinte1 = new TypeActivity;

  astreinte2ToEdit!: Activity[];
  idOfDaysAstreinte2 = new Array();
  idOfCollabAstreinte2 = new Array();
  idOfProjectAstreinte2 = new Array();
  idOfTypeAstreinte2 = new Array();
  projectAstreinte2 = new Project;
  typeAstreinte2 = new TypeActivity;


  astreinte3ToEdit!: Activity[];
  idOfDaysAstreinte3 = new Array();
  idOfCollabAstreinte3 = new Array();
  idOfProjectAstreinte3 = new Array();
  idOfTypeAstreinte3 = new Array();
  projectAstreinte3= new Project;
  typeAstreinte3 = new  TypeActivity;



  /** from here */
  monthActivity!: number;
  yearActivity!: number;
  firstNameCollab!: String;
  nbResultat!: number;

  collaboratorsWithThisName!: Collaborator[];
  idOfCollas!: number[];
  public activitys!: Activity[];
  resultat = new Array();



  constructor(
    private _route: Router,
    private _MissionService: MissionService,
    private _ProjectService: ProjectService,
    private _ActivityService: ActivityService,
    private _TypeActivityService: TypeActivityService,
    private _CollabJoinProjectService: CollabJoinProjectService,
    private _CollaboratorService: CollaboratorService,
  ) { }

  ngOnInit(): void {


  }


  /** SEARCH14 */
  searchActivity() {
    this._CollaboratorService.selectCollabByName(this.firstNameCollab).subscribe(
      data => {
        this.collaboratorsWithThisName = data;
        for (var i = 0; i < this.collaboratorsWithThisName.length; i++) {
          this._ActivityService.searchActivityByidCollMonthYear(this.monthActivity, this.yearActivity, this.collaboratorsWithThisName[i].id).subscribe(
            data => {
              this.activitys = data;

              this.activitys.forEach(
                (item) => {
                  this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                    data => {
                      if (item != null) {
                        item.nameCollab = data.lastName;
                        item.firstNameCollab = data.firstName;
                      }
                    },
                    error => console.log("exception" + error)
                  )
                }
              )
              this.nbResultat = this.activitys.length
              this.resultat.push(this.activitys)
            },
            error => console.log("exception" + error)
          )
        }
      },
      erorr => { }
    );
    console.log(this.resultat)
  }




  selectedOption1!: number;




  allAstreinteToEdit!: Activity[];
  nbAstreinteWithId = new Array();
  nbAstreinteTypeWithId = new Array();

  allActivityToEdit!: Activity[];
  nbActivityWithId = new Array();
  /** GESTION ACTIVIY */


  onInitModal(activityFromModal: Activity, activitysFromModal: Activity[]) {


    setTimeout(() => {
      this.disableJoursFerie();
    }, 200);

    setTimeout(() => {
      this.disableWeekend();
    }, 200);


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

    this.nbActivityWithId = [];
    this.allActivityToEdit = [];
    this._ActivityService.activityGroupByProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId).subscribe(
      data => {

        this.allActivityToEdit = data;
        for (i = 0; i < this.allActivityToEdit.length; i++) {
          this.nbActivityWithId.push(this.allActivityToEdit[i].projectId);
        }

        /** ACTIVITY 1 */

        this.idOfDaysActivity1 = [];
        this.idOfCollabActivity1 = [];
        this.idOfProjectActivity1 = [];
        this.idOfTypeActivity1 = [];

        if (this.nbActivityWithId[0] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbActivityWithId[0]).subscribe(
            data => {
              this.activity1ToEdit = data;

              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber = this.activity1ToEdit[i].duration;
                (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked = this.activity1ToEdit[i].remote;


                this.idOfDaysActivity1.push(this.activity1ToEdit[i].id);
                this.idOfCollabActivity1.push(this.activity1ToEdit[i].collaboratorId);
                this.idOfProjectActivity1.push(this.activity1ToEdit[i].projectId);
                this.idOfTypeActivity1.push(this.activity1ToEdit[i].typeActivity);
                this.selectedOption = this.nbActivityWithId[0];

                this._ProjectService.selectProjectById(this.selectedOption).subscribe(
                  data => this.projectActivityNormal = data,
                  error => console.log("exception" + error)
                )
              }
              this.total()
            },
            error => console.log("exception" + error)
          )
        }

        /** ACTIVITY 2 */

        this.idOfDaysActivity2 = [];
        this.idOfCollabActivity2 = [];
        this.idOfProjectActivity2 = [];
        this.idOfTypeActivity2 = [];

        if (this.nbActivityWithId[1] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbActivityWithId[1]).subscribe(
            data => {
              this.activity2ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber = this.activity2ToEdit[i].duration;
                (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked = this.activity2ToEdit[i].remote;

                this.idOfDaysActivity2.push(this.activity2ToEdit[i].id)
                this.idOfCollabActivity2.push(this.activity2ToEdit[i].collaboratorId);
                this.idOfProjectActivity2.push(this.activity2ToEdit[i].projectId);
                this.idOfTypeActivity2.push(this.activity2ToEdit[i].typeActivity);
                this.selectedOption2 = this.nbActivityWithId[1];

                this._ProjectService.selectProjectById(this.selectedOption2).subscribe(
                  data => this.projectActivity2 = data,
                  error => console.log("exception" + error)
                )
              }
              this.total2()
            },
            error => console.log("exception" + error)
          )
        }

        /** ACTIVITY 3 */

        this.idOfDaysActivity3 = [];
        this.idOfCollabActivity3 = [];
        this.idOfProjectActivity3 = [];
        this.idOfTypeActivity3 = [];


        if (this.nbActivityWithId[2] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbActivityWithId[2]).subscribe(
            data => {
              this.activity3ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber = this.activity3ToEdit[i].duration;
                (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked = this.activity3ToEdit[i].remote;

                this.idOfDaysActivity3.push(this.activity3ToEdit[i].id)
                this.idOfCollabActivity3.push(this.activity3ToEdit[i].collaboratorId);
                this.idOfProjectActivity3.push(this.activity3ToEdit[i].projectId);
                this.idOfTypeActivity3.push(this.activity3ToEdit[i].typeActivity);
                this.selectedOption3 = this.nbActivityWithId[2];

                this._ProjectService.selectProjectById(this.selectedOption3).subscribe(
                  data => this.projectActivity3 = data,
                  error => console.log("exception" + error)
                )
              }
              this.total3()
            },
            error => console.log("exception" + error)
          )
        }

        /** ACTIVITY 4 */

        this.idOfDaysActivity4 = [];
        this.idOfCollabActivity4 = [];
        this.idOfProjectActivity4 = [];
        this.idOfTypeActivity4 = [];

        if (this.nbActivityWithId[3] !== undefined) {
          this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbActivityWithId[3]).subscribe(
            data => {
              this.activity4ToEdit = data;
              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber = this.activity4ToEdit[i].duration;
                (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked = this.activity4ToEdit[i].remote;

                this.idOfDaysActivity4.push(this.activity4ToEdit[i].id)
                this.idOfCollabActivity4.push(this.activity4ToEdit[i].collaboratorId);
                this.idOfProjectActivity4.push(this.activity4ToEdit[i].projectId);
                this.idOfTypeActivity4.push(this.activity4ToEdit[i].typeActivity);
                this.selectedOption4 = this.nbActivityWithId[3];

                this._ProjectService.selectProjectById(this.selectedOption4).subscribe(
                  data => this.projectActivity4 = data,
                  error => console.log("exception" + error)
                )
              }
              this.total4()
            },
            error => console.log("exception" + error)
          )
        }
      },
      error => console.log("exception" + error)
    )


    /** Astreinte 1 */

    this.nbAstreinteWithId = [];
    this.nbAstreinteTypeWithId = [];
    this.allAstreinteToEdit = [];



    this._ActivityService.astreinteGroupByTypeActivityAndProjet(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId).subscribe(
      data => {
        this.allAstreinteToEdit = data;


        for (i = 0; i < this.allAstreinteToEdit.length; i++) {
          this.nbAstreinteWithId.push(this.allAstreinteToEdit[i].projectId);
          this.nbAstreinteTypeWithId.push(this.allAstreinteToEdit[i].typeActivity.id);
          console.log("dqskdlq 1:" + this.nbAstreinteWithId)
          console.log("dqskdlq 2:" + this.nbAstreinteTypeWithId)
        }


        this.idOfDaysAstreinte1 = [];
        this.idOfCollabAstreinte1 = [];
        this.idOfProjectAstreinte1 = [];
        this.idOfTypeAstreinte1 = [];

        if (this.nbAstreinteWithId[0] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbAstreinteWithId[0], this.nbAstreinteTypeWithId[0]).subscribe(
            data => {
              this.astreinte1ToEdit = data;

              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber = this.astreinte1ToEdit[i].duration;

                this.idOfDaysAstreinte1.push(this.astreinte1ToEdit[i].id);
                this.idOfCollabAstreinte1.push(this.astreinte1ToEdit[i].collaboratorId);
                this.idOfProjectAstreinte1.push(this.astreinte1ToEdit[i].projectId);
                this.idOfTypeAstreinte1.push(this.astreinte1ToEdit[i].typeActivity);
                this.selectedProjectAstreint1 = this.nbAstreinteWithId[0];
                this.selectedTypeUpdateValue1 = this.nbAstreinteTypeWithId[0];

                this._ProjectService.selectProjectById(this.selectedProjectAstreint1).subscribe(
                  data => this.projectAstreinte1 = data,
                  error => console.log("exception" + error)
                )
                this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
                  data => this.typeAstreinte1 = data,
                  error => console.log("exception" + error)
                )

                console.log(this.idOfDaysAstreinte1)
              }
              this.total5()
            },
            error => console.log("exception" + error)
          )
        }

        this.idOfDaysAstreinte2 = [];
        this.idOfCollabAstreinte2 = [];
        this.idOfProjectAstreinte2 = [];
        this.idOfTypeAstreinte2 = [];

        /** Astreinte 2 */
        if (this.nbAstreinteWithId[1] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbAstreinteWithId[1], this.nbAstreinteTypeWithId[1]).subscribe(
            data => {
              this.astreinte2ToEdit = data;

              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber = this.astreinte2ToEdit[i].duration;

                this.idOfDaysAstreinte2.push(this.astreinte2ToEdit[i].id);
                this.idOfCollabAstreinte2.push(this.astreinte2ToEdit[i].collaboratorId);
                this.idOfProjectAstreinte2.push(this.astreinte2ToEdit[i].projectId);
                this.idOfTypeAstreinte2.push(this.astreinte2ToEdit[i].typeActivity);
                this.selectedProjectAstreint2 = this.nbAstreinteWithId[1];
                this.selectedTypeUpdateValue2 = this.nbAstreinteTypeWithId[1];

                this._ProjectService.selectProjectById(this.selectedProjectAstreint2).subscribe(
                  data => this.projectAstreinte2 = data,
                  error => console.log("exception" + error)
                )
                this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
                  data => this.typeAstreinte2 = data,
                  error => console.log("exception" + error)
                )

                console.log(this.idOfDaysAstreinte2)

              }
              this.total6()
            },
            error => console.log("exception" + error)
          )
        }


        /** Astreinte 3 */

        this.idOfDaysAstreinte3 = [];
        this.idOfCollabAstreinte3 = [];
        this.idOfProjectAstreinte3 = [];
        this.idOfTypeAstreinte3 = [];

        if (this.nbAstreinteWithId[2] !== undefined) {
          this._ActivityService.searchTheAstreinteOfCollaboratorOfProject(this.monthActivity, this.yearActivity, activityFromModal.collaboratorId, this.nbAstreinteWithId[2], this.nbAstreinteTypeWithId[2]).subscribe(
            data => {
              this.astreinte3ToEdit = data;

              for (var i = 0; i < this.tabJours.length; i++) {
                (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber = this.astreinte3ToEdit[i].duration;

                this.idOfDaysAstreinte3.push(this.astreinte3ToEdit[i].id);
                this.idOfCollabAstreinte3.push(this.astreinte3ToEdit[i].collaboratorId);
                this.idOfProjectAstreinte3.push(this.astreinte3ToEdit[i].projectId);
                this.idOfTypeAstreinte3.push(this.astreinte3ToEdit[i].typeActivity);
                this.selectedProjectAstreint3 = this.nbAstreinteWithId[2];
                this.selectedTypeUpdateValue3 = this.nbAstreinteTypeWithId[2];

                this._ProjectService.selectProjectById(this.selectedProjectAstreint3).subscribe(
                  data => this.projectAstreinte3 = data,
                  error => console.log("exception" + error)
                )
                this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
                  data => this.typeAstreinte3 = data,
                  error => console.log("exception" + error)
                )
              }
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

    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
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

    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total();
    }, 50);

    this.totalAllActivity();
  }

  onChangeSelectOption() {
    this._ProjectService.selectProjectById(this.selectedOption).subscribe(
      data => this.projectActivityNormal = data,
      error => console.log("exception" + error)
    )
  }



  typeActivityNormal!: TypeActivity;

  /** ACTIVITE2  */

  dureeProjet2 = 0;
  tabAllInputedValue2 = new Array();
  selectedOption2!: number;
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total2();
    }, 50);
    this.totalAllActivity();
  }

  onChangeSelectOption2() {
    this._ProjectService.selectProjectById(this.selectedOption2).subscribe(
      data => this.projectActivity2 = data,
      error => console.log("exception" + error)
    )
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total3();
    }, 50);
    this.totalAllActivity();
  }
  /** calcule du total du l'activité declaré N1 */



  onChangeSelectOption3() {
    this._ProjectService.selectProjectById(this.selectedOption3).subscribe(
      data => this.projectActivity3 = data,
      error => console.log("exception" + error)
    )
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total2();
    }, 50);

    this.totalAllActivity();
  }


  onChangeSelectOption4() {
    this._ProjectService.selectProjectById(this.selectedOption4).subscribe(
      data => this.projectActivity4 = data,
      error => console.log("exception" + error)
    )
  }


  /** ASTREINTE 1 */

  dureeAstreinte1 = 0;
  laMissionAstreinte1 = new Mission();
  astreinte1remplis = false;

  selectedProjectAstreint1!: number;
  selectedTypeUpdateValue1!: number;
  selectedUniteAstreint1 = 2;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte1() {
    if (this.astreinte1remplis == true) {
      this.dureeAstreinte1 = 0;
      this.astreinte1remplis = false;
    } else {
      this.dureeAstreinte1 = 1;
      this.astreinte1remplis = true;
    }
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total5();
    }, 50);
  }



  onChangeProjectAstreinte1() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint1).subscribe(
      data => this.projectAstreinte1 = data,
      error => console.log("exception" + error)
    )
  }

  onChangeTypeAstreinte1() {
    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
      data => {
        this.typeAstreinte1 = data;
      },
      error => console.log("exception" + error)
    )
  }

  /** ASTREINTE 2 */
  dureeAstreinte2 = 0;
  laMissionAstreinte2 = new Mission();
  astreinte2remplis = false;

  selectedProjectAstreint2!: number;
  selectedTypeUpdateValue2!: number;
  selectedUniteAstreint2 = 2;

  /** Remplissage automatique de l'estreinte*/
  remplirAstreinte2() {
    if (this.astreinte2remplis == true) {
      this.dureeAstreinte2 = 0;
      this.astreinte2remplis = false;
    } else {
      this.dureeAstreinte2 = 1;
      this.astreinte2remplis = true;
    }
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total6();
    }, 50);
  }




  onChangeProjectAstreinte2() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint2).subscribe(
      data => this.projectAstreinte2 = data,
      error => console.log("exception" + error)
    )
  }

  onChangeTypeAstreinte2() {
    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
      data => {
        this.typeAstreinte2 = data;
      },
      error => console.log("exception" + error)
    )
  }


  /** ASTREINTE 3 */
  dureeAstreinte3 = 0;
  laMissionAstreinte3 = new Mission();
  astreinte3remplis = false;

  selectedProjectAstreint3!: number;
  selectedTypeUpdateValue3!: number;
  selectedUniteAstreint3 = 2;

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
    setTimeout(() => {
      this.disableJoursFerie();
    }, 50);

    setTimeout(() => {
      this.disableWeekend();
    }, 50);
    setTimeout(() => {
      this.total7();
    }, 50);
  }


  onChangeProjectAstreinte3() {
    this._ProjectService.selectProjectById(this.selectedProjectAstreint3).subscribe(
      data => this.projectAstreinte3 = data,
      error => console.log("exception" + error)
    )
  }

  onChangeTypeAstreinte3() {
    this._TypeActivityService.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
      data => {
        this.typeAstreinte3 = data;
      },
      error => console.log("exception" + error)
    )
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

  message!: string;
  messageErreur!: string;

  async EnregisterEtEnvoyer() {

    this.activityNormal = new Activity;
    this.activity2 = new Activity;
    this.activity3 = new Activity;
    this.activity4 = new Activity;

    for (var i = 0; i < this.daysInMonth; i++) {

      /** ACTIVITY 1 activityNormal */
      if (this.totalProjet1 != 0) {
        this.activityNormal.id = this.idOfDaysActivity1[i];
        this.activityNormal.collaboratorId = this.idOfCollabActivity1[i];
        this.activityNormal.projectId = this.projectActivityNormal.id;
        this.activityNormal.typeActivity = this.idOfTypeActivity1[i];
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
            console.log("erreur mise à jour non-effectué");
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }

      /** ACTIVITY 2 */
      if (this.totalProjet2 != 0) {
        this.activity2.id = this.idOfDaysActivity2[i];
        this.activity2.collaboratorId = this.idOfCollabActivity2[i];
        this.activity2.projectId = this.projectActivity2.id;
        this.activity2.typeActivity = this.idOfTypeActivity2[i];
        this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.activity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
        this.activity2.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activity2.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        this._ActivityService.addAndUpdateActivity(this.activity2, this.aujourdhui).subscribe(
          data => {
            console.log("activity 2 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué");
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }

      /** ACTIVITY 3 */

      if (this.totalProjet3 != 0) {
        this.activity3.id = this.idOfDaysActivity3[i];
        this.activity3.collaboratorId = this.idOfCollabActivity3[i];
        this.activity3.projectId = this.projectActivity3.id;
        this.activity3.typeActivity = this.idOfTypeActivity3[i];
        this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.activity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
        this.activity3.startDate = new Date(this.yearInput, this.monthSelected - 1, i + 1);
        this.aujourdhui = this.pipeDate.transform(this.activity3.startDate, 'yyyy-MM-dd') || this.aujourdhui;
        this._ActivityService.addAndUpdateActivity(this.activity3, this.aujourdhui).subscribe(
          data => {
            console.log("activity 3 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué");
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }

      /** ACTIVITY 4 */


      if (this.totalProjet4 != 0) {
        this.activity4.id = this.idOfDaysActivity4[i];
        this.activity4.collaboratorId = this.idOfCollabActivity4[i];
        this.activity4.projectId = this.projectActivity4.id;
        this.activity4.typeActivity = this.idOfTypeActivity4[i];
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
            console.log("erreur ajout non-effectué");
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }

      /** ASTREINTE 1  */
      this.astreinte1 = new Activity;
      this.astreinte2 = new Activity;
      this.astreinte3 = new Activity;
      this.astreinte4 = new Activity;

      if (this.totalAstreinte1 != 0) {
        this.astreinte1.id = this.idOfDaysAstreinte1[i];
        this.astreinte1.collaboratorId = this.idOfCollabAstreinte1[i];
        this.astreinte1.projectId = this.projectAstreinte1.id;
        this.astreinte1.typeActivity = this.typeAstreinte1;



        if (this.selectedUniteAstreint1 == 1) {
          this.astreinte1.duration = +((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber / 24).toFixed(2);
        } else {
          this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
        }

        this._ActivityService.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte 1  updated ");
          },
          error => {
            console.log("erreur update non-effectué")
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }


      /** ASTREINTE 2  */

      if (this.totalAstreinte2 != 0) {
        this.astreinte2.id = this.idOfDaysAstreinte2[i];
        this.astreinte2.collaboratorId = this.idOfCollabAstreinte2[i];
        this.astreinte2.projectId = this.projectAstreinte2.id;
        this.astreinte2.typeActivity = this.typeAstreinte2;

        if (this.selectedUniteAstreint2 == 1) {
          this.astreinte2.duration = +((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber / 24).toFixed(2);
        } else {
          this.astreinte2.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
        }

        this._ActivityService.addAndUpdateActivity(this.astreinte2, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte 2 updated ");
          },
          error => {
            console.log("erreur update non-effectué");
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }

      /** ASTREINTE 3 */

      if (this.totalAstreinte3 != 0) {
        this.astreinte3.id = this.idOfDaysAstreinte3[i];
        this.astreinte3.collaboratorId = this.idOfCollabAstreinte3[i];
        this.astreinte3.projectId = this.projectAstreinte3.id;
        this.astreinte3.typeActivity = this.typeAstreinte3;

        if (this.selectedUniteAstreint3 == 1) {
          this.astreinte3.duration = +((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber / 24).toFixed(2);
        } else {
          this.astreinte3.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
        }
        this._ActivityService.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte  3 updated");
          },
          error => {
            console.log("erreur update non-effectué")
            this.messageErreur = "Enregistrement non effectué !";

          }
        )
      }
    }

    this.message = "Enregistrement effectué !"

    setTimeout(() => {
      this.message = ""
    }, 4000);

    setTimeout(() => {

    this.Envoyer();
  }, 400);

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











  totalProjet1 = 0;
  total() {
    this.totalProjet1 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber != undefined) {
        this.totalProjet1 = this.totalProjet1 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet1;
      }
    }
    this.totalAllActivity();
    return this.totalProjet1;
  }
  totalProjet2 = 0;
  total2() {
    this.totalProjet2 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber != undefined) {
        this.totalProjet2 = this.totalProjet2 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet2;
      }
    }
    this.totalAllActivity();
    return this.totalProjet2;

  }
  totalProjet3 = 0;
  total3() {
    this.totalProjet3 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber != undefined) {
        this.totalProjet3 = this.totalProjet3 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet3;
      }
    }
    this.totalAllActivity();
    return this.totalProjet3;

  }
  totalProjet4 = 0;
  total4() {
    this.totalProjet4 = 0;
    this.totalActivity = 0;
    for (var i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber != undefined) {
        this.totalProjet4 = this.totalProjet4 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
        this.totalActivity = this.totalActivity + this.totalProjet4;
      }
    }
    this.totalAllActivity();
    return this.totalProjet4;

  }
  totalAstreinte1 = 0;
  total5() {
    var i;
    this.totalAstreinte1 = 0;
    for (i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber != undefined) {
        this.totalAstreinte1 = this.totalAstreinte1 + (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
      }
    }
    return this.totalAstreinte1;

  }
  totalAstreinte2 = 0;
  total6() {
    var i;
    this.totalAstreinte2 = 0;
    for (i = 0; i < this.tabJours.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber != undefined) {
        this.totalAstreinte2 = this.totalAstreinte2 + (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
      }
    }
    return this.totalAstreinte2;

  }

  totalAstreinte3 = 0;

  total7() {
    var i;
    this.totalAstreinte3 = 0;
    for (i = 0; i < this.tabJours.length - 1; i++) {
      if ((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber != undefined) {
        this.totalAstreinte3 = this.totalAstreinte3 + (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
      }
    }
    return this.totalAstreinte3;

  }









  joursFerie!: JoursFerie[];
  LesJoursFerie: Date[] = [];

  disableJoursFerie() {
    this._ActivityService.checkJoursFeriées().subscribe(
      data => {
        this.joursFerie = data;
      },
      error => console.log("error")
    )
    setTimeout(() => {

      for (var t = 0; t < this.joursFerie.length; t++) {
        this.LesJoursFerie[t] = new Date(this.joursFerie[t].date)
      }

      for (var i = 0; i < this.tabJours.length; i++) {
        for (var j = 0; j < this.LesJoursFerie.length; j++) {
          if (this.tabJours[i] == this.LesJoursFerie[j].getDate() && this.monthSelected == (this.LesJoursFerie[j].getMonth() + 1) && this.yearInput == this.LesJoursFerie[j].getFullYear()) {

            (<HTMLInputElement>document.getElementById(this.activitiesPerDay[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.remotePerDay[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.activitiesPerDay[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
            (<HTMLInputElement>document.getElementById(this.remotePerDay[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

            (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.remotePerDay2[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
            (<HTMLInputElement>document.getElementById(this.remotePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

            (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.remotePerDay3[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
            (<HTMLInputElement>document.getElementById(this.remotePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

            (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.remotePerDay4[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
            (<HTMLInputElement>document.getElementById(this.remotePerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

            (<HTMLInputElement>document.getElementById(this.astreintePerDay1[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.astreintePerDay1[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;

            (<HTMLInputElement>document.getElementById(this.astreintePerDay2[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.astreintePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;

            (<HTMLInputElement>document.getElementById(this.astreintePerDay3[this.LesJoursFerie[j].getDate() - 1])).disabled = true;
            (<HTMLInputElement>document.getElementById(this.astreintePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
          }

        }
      }
    }, 250);
  }



  allDaysOfTheMonth: Date[] = [];

  disableWeekend() {

    for (var i = 0; i < this.tabJours.length; i++) {
      this.allDaysOfTheMonth[i] = new Date(this.yearInput, this.monthSelected - 1, this.tabJours[i]);
      if (this.allDaysOfTheMonth[i].getDay() === 6 || this.allDaysOfTheMonth[i].getDay() === 0) {

        (<HTMLInputElement>document.getElementById(this.activitiesPerDay[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.remotePerDay[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
        (<HTMLInputElement>document.getElementById(this.remotePerDay[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;


        (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.remotePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
        (<HTMLInputElement>document.getElementById(this.remotePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

        (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.remotePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
        (<HTMLInputElement>document.getElementById(this.remotePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;

        (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.remotePerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
        (<HTMLInputElement>document.getElementById(this.remotePerDay4[this.allDaysOfTheMonth[i].getDate() - 1])).checked = false;


        (<HTMLInputElement>document.getElementById(this.astreintePerDay1[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.astreintePerDay1[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.astreintePerDay1[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;

        (<HTMLInputElement>document.getElementById(this.astreintePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.astreintePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.astreintePerDay2[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;

        (<HTMLInputElement>document.getElementById(this.astreintePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).disabled = false;
        (<HTMLInputElement>document.getElementById(this.astreintePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).style.backgroundColor = 'grey';
        (<HTMLInputElement>document.getElementById(this.astreintePerDay3[this.allDaysOfTheMonth[i].getDate() - 1])).valueAsNumber = 0;
      }
    }



  }



  Envoyer() {

    var tabActitivty1 = [];
    var tabActitivty2 = [];
    var tabActitivty3 = [];
    var tabActitivty4 = [];

    var tableOfindex = [];
    var valueActivity1 = [];
    var valueActivity2 = [];
    var valueActivity3 = [];
    var valueActivity4 = [];

    var activitySelected1 = this.projectActivityNormal.projectTitle;
    var activitySelected2 = this.projectActivity2.projectTitle;
    var activitySelected3 = this.projectActivity3.projectTitle;
    var activitySelected4 = this.projectActivity4.projectTitle;


    var tabAstreinte1 = [];
    var tabAstreinte2 = [];
    var tabAstreinte3 = [];


    var tableOfindex2 = [];
    var valueAstreinte1 = [];
    var valueAstreinte2 = [];
    var valueAstreinte3 = [];

    var astreinteProject1 = this.projectAstreinte1.projectTitle;
    var astreinteProject2 = this.projectAstreinte2.projectTitle;
    var astreinteProject3 = this.projectAstreinte3.projectTitle;

    var astreinteType1 = this.typeAstreinte1.type;
    var astreinteType2 = this.typeAstreinte2.type;
    var astreinteType3 = this.typeAstreinte3.type;


    tableOfindex2.push('Activité')
    valueAstreinte1.push(astreinteProject1 || "")
    valueAstreinte2.push(astreinteProject2 || "")
    valueAstreinte3.push(astreinteProject3 || "")


    tableOfindex2.push('Unité')
    valueAstreinte1.push("Heure");
    valueAstreinte2.push("Heure");
    valueAstreinte3.push("Heure");


    tableOfindex2.push('Type astreinte')
    valueAstreinte1.push(astreinteType1 || "")
    valueAstreinte2.push(astreinteType2 || "")
    valueAstreinte3.push(astreinteType3 || "")


    tableOfindex.push('Activité')
    valueActivity1.push(activitySelected1)
    valueActivity2.push(activitySelected2)
    valueActivity3.push(activitySelected3)
    valueActivity4.push(activitySelected4)


    for (var i = 0; i < this.tabJours.length; i++) {
      tableOfindex.push([this.tabJours[i]]);
      valueActivity1.push((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber);
      valueActivity2.push((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber);
      valueActivity3.push((<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber);
      valueActivity4.push((<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber);
    }

    for (var i = 0; i < this.tabJours.length; i++) {
      tableOfindex2.push([this.tabJours[i]]);

      if (this.selectedUniteAstreint1 == 2) {
        valueAstreinte1.push(+((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber * 24).toFixed(2));
      } else {
        valueAstreinte1.push((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber);
      }


      if (this.selectedUniteAstreint2 == 2) {
        valueAstreinte2.push(+((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber * 24).toFixed(2));
      } else {
        valueAstreinte2.push((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber);
      }


      if (this.selectedUniteAstreint3 == 2) {
        valueAstreinte3.push(+((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber * 24).toFixed(2));
      } else {
        valueAstreinte3.push((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber);
      }


    }

    console.log((<HTMLInputElement>document.getElementById(this.totalActivity1)))

    var totalActivity1 = (<HTMLInputElement>document.getElementById(this.totalActivity1)).valueAsNumber;
    var totalActivity2 = (<HTMLInputElement>document.getElementById(this.totalActivity2)).valueAsNumber;
    var totalActivity3 = (<HTMLInputElement>document.getElementById(this.totalActivity3)).valueAsNumber;
    var totalActivity4 = (<HTMLInputElement>document.getElementById(this.totalActivity4)).valueAsNumber;


    var totalAstreinte1;
    if (this.selectedUniteAstreint1 == 2) {
      totalAstreinte1 = +((<HTMLInputElement>document.getElementById(this.totalAstreinte1HTML)).valueAsNumber * 24)
    } else {
      totalAstreinte1 = (<HTMLInputElement>document.getElementById(this.totalAstreinte1HTML)).valueAsNumber;
    }


    var totalAstreinte2;
    if (this.selectedUniteAstreint2 == 2) {
      totalAstreinte2 = +((<HTMLInputElement>document.getElementById(this.totalAstreinte2HTML)).valueAsNumber * 24)
    } else {
      totalAstreinte2 = (<HTMLInputElement>document.getElementById(this.totalAstreinte2HTML)).valueAsNumber;
    }


    var totalAstreinte3;
    if (this.selectedUniteAstreint3 == 2) {
      totalAstreinte3 = +((<HTMLInputElement>document.getElementById(this.totalAstreinte3HTML)).valueAsNumber * 24)
    } else {
      totalAstreinte3 = (<HTMLInputElement>document.getElementById(this.totalAstreinte3HTML)).valueAsNumber;
    }


    tableOfindex.push('total')
    valueActivity1.push(totalActivity1)
    valueActivity2.push(totalActivity2)
    valueActivity3.push(totalActivity3)
    valueActivity4.push(totalActivity4)

    tableOfindex2.push('total')
    valueAstreinte1.push(totalAstreinte1)
    valueAstreinte2.push(totalAstreinte2)
    valueAstreinte3.push(totalAstreinte3)

    for (var i of [1]) {
      tabActitivty1.push(tableOfindex)
      tabActitivty1.push(valueActivity1);

      tabActitivty2.push(tableOfindex)
      tabActitivty2.push(valueActivity2);

      tabActitivty3.push(tableOfindex)
      tabActitivty3.push(valueActivity3);

      tabActitivty4.push(tableOfindex)
      tabActitivty4.push(valueActivity4);

      tabAstreinte1.push(tableOfindex2)
      tabAstreinte1.push(valueAstreinte1)

      tabAstreinte2.push(tableOfindex2)
      tabAstreinte2.push(valueAstreinte2)

      tabAstreinte3.push(tableOfindex2)
      tabAstreinte3.push(valueAstreinte3)
    }


    console.log(tabActitivty1)

    var dlActivity1 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:',
        {
          table: {
            width: 'auto',
            body: tabActitivty1,
          }
        }
      ]
    }

    var dlActivity2 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabActitivty2,
          }
        }
      ]
    }

    var dlActivity3 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabActitivty2,
          }
        }
      ]
    }

    var dlActivity4 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabActitivty2,
          }
        }
      ]
    }

    var dlAstreinte1 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabAstreinte1,
          }
        }
      ]
    }

    var dlAstreinte2 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabAstreinte2,
          }
        }
      ]
    }

    var dlAstreinte3 = {
      pageSize: { width: 1280, height: 600.9 },
      content: [
        'First paragraph',
        'table:', {
          table: {
            width: 'auto',
            body: tabAstreinte3,
          }
        }
      ]
    }


    if (totalActivity1 !== 0) {
      pdfMake.createPdf(dlActivity1).download();
    }

    if (totalActivity2 !== 0) {
      pdfMake.createPdf(dlActivity2).download();
    }

    if (totalActivity3 !== 0) {
      pdfMake.createPdf(dlActivity3).download();
    }

    if (totalActivity4 !== 0) {
      pdfMake.createPdf(dlActivity4).download();
    }


    if (totalAstreinte1 !== 0) {
      pdfMake.createPdf(dlAstreinte1).download();
    }
    if (totalAstreinte2 !== 0) {
      pdfMake.createPdf(dlAstreinte2).download();
    }

    if (totalAstreinte3 !== 0) {
      pdfMake.createPdf(dlAstreinte2).download();
    }
  }











  onChangeUniteAstreinte1(){
    for (var i = 0; i < this.tabJours.length; i++) {
      if (this.selectedUniteAstreint1 == 1) {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber = ((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber*24);
      } else {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber =  ((<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber/24);
      }
    }
    this.total5();
  }

  
  onChangeUniteAstreinte2(){
    for (var i = 0; i < this.tabJours.length; i++) {
      if (this.selectedUniteAstreint2 == 1) {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber = ((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber*24);
      } else {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber =  ((<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber/24);
      }
    }
    this.total6();

  }

  
  onChangeUniteAstreinte3(){
    for (var i = 0; i < this.tabJours.length; i++) {
      if (this.selectedUniteAstreint3 == 1) {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber = ((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber*24);
      } else {
        (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber =  ((<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber/24);
      }
    }
    this.total7();
  }






  /** NAVIGATION14 */
  goToAddActivity() {
    this._route.navigate(['/addActivite']);
  }

  goGerer() {
    this._route.navigate(['/editActivite']);
  }

  goToAccueil() {
    this._route.navigate(['/administrateur']);
  }


}
