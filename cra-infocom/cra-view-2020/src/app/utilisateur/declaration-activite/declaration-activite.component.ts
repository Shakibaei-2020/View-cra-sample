import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import joursFeriees from '../../z-sources/data/joursFeriées.json'
import { DatePipe } from '@angular/common';

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

  astreintePerDay1 = new Array();
  astreintePerDay2 = new Array();
  astreintePerDay3 = new Array();
  astreintePerDay4 = new Array();

  projectAstreinte = new Array();
  typeAstreinte = new Array();
  uniteAstreinte = new Array();

  toalDuTotalAcitivty = 0;

  constructor(private _route: Router, private _service: NgserviceService) {
  }

  public missions!: Mission[];
  public collaborateur!: Collaborator;

  public projects!: Project[];
  lesTypeActivity: TypeActivity[] = [];

  // Pour formater des dates faut faire appel à ce pipe comme l'exemple ci-dessous
  aujourdhuiTestFormat = new Date();
  pipeDate = new DatePipe('fr-FR');
  aujourdhuiTestFormatFormatee = this.pipeDate.transform(this.aujourdhuiTestFormat, 'yyyy-mm-dd');


  ngOnInit(): void {
    this.aujourdhui = this.formatageDate();

    this._service.selectAllTypeActivity().subscribe(
      data => this.lesTypeActivity = data,
      error => console.log("exception" + error)
    )

    this._service.selectAllMission().subscribe(
      data => this.missions = data,
      error => console.log("exception" + error)
    )

    // TODO : attention c'es en dur
    this._service.SelectAllProjectForOneCollab(2).subscribe(
      data => this.projects = data,
      error => console.log("exception" + error)
    )

    // TODO : attention c'es en dur
    this._service.selectOneCollabById(2).subscribe(
      data => this.collaborateur = data,
      error => console.log("exception" + error)
    )

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;

      /** Activité */
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

  /** total temps d'activité */
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
    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
    }
  }

  /** Formatage de la date */
  aujourdhui !: string;
  formatageDate() {
    var jour = new Date().getDay() + 6;
    console.log(jour);
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
  refinterne = new Number();
  refClient !: string;
  laMission = new Mission();
  tabAllInputedValue = new Array();
  j!: number;
  selectedOption!: number;
  ProjectActivity = new Project;
  isRemote = false;

  updatedAfterSelect() {
    this.refinterne = this.collaborateur.id;

    this._service.selectMissionById(this.selectedOption).subscribe(
      data => this.laMission = data,
      error => console.log("exception" + error)
    )
    console.log(this.refClient);
    this.refClient = this.laMission.client.ref;
  }

  /** Remplissage automatique des remotes de  l'Activité*/
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
  }
  /** calcule du total du l'activité declaré N1 */
  totalProjet1 = 0;

  total() {
    this.totalProjet1 = 0;
    for (var i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber != undefined) {
        this.totalProjet1 = this.totalProjet1 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
      }
    }
  }

  /** ACTIVITE2  */
  dureeProjet2 = 0;
  refinterne2 = new Number();
  refClient2 !: string;
  laMission2 = new Mission();
  tabAllInputedValue2 = new Array();
  j2!: number;
  selectedOption2!: number;
  ProjectActivity2!: Project;
  isRemote2 = false;

  updatedAfterSelect2() {
    this.refinterne2 = this.collaborateur.id;
    this._service.selectMissionById(this.selectedOption2).subscribe(
      data => this.laMission2 = data,
      error => console.log("exception" + error)
    )
    this.refClient2 = this.laMission2.client.ref;
  }

  remoteRemplis2 = false;
  /** Remplissage automatique des remotes de  l'Activité*/
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
  totalProjet2 = 0;
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
  }

  /** total de l'activité */
  total2() {
    var i;
    this.totalProjet2 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber != undefined) {
        this.totalProjet2 = this.totalProjet2 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
      }
    }
  }

  /** ACTIVITE 3  */
  dureeProjet3 = 0;
  refinterne3 = new Number();
  refClient3 !: string;
  laMission3 = new Mission();
  tabAllInputedValue3 = new Array();
  j3!: number;
  selectedOption3!: number;
  ProjectActivity3!: Project;
  isRemote3 = false;

  updatedAfterSelect3() {
    this.refinterne3 = this.collaborateur.id;
    this._service.selectMissionById(this.selectedOption3).subscribe(
      data => this.laMission3 = data,
      error => console.log("exception" + error)
    )
    this.refClient3 = this.laMission3.client.ref;
  }

  remoteRemplis3 = false;
  /** Remplissage automatique des remotes de  l'Activité*/
  remplirRemoteP3() {
    if (this.remoteRemplis3 == true) {
      this.isRemote3 = false;
      this.remoteRemplis3 = false;
    } else {
      this.isRemote3 = true;
      this.remoteRemplis3 = true;
    }
  }

  remplis3 = false;
  /** Remplissage automatique de l'Activité*/
  totalProjet3 = 0;

  remplirProjet3() {
    if (this.remplis3 == true) {
      this.dureeProjet3 = 0;
      this.totalProjet3 = 0;
      this.remplis2 = false;
    } else {
      this.dureeProjet3 = 1;
      this.totalProjet3 = this.daysInMonth;
      this.remplis3 = true;
    }
  }

  /** total de l'activité */
  total3() {
    var i;
    this.totalProjet3 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber != undefined) {
        this.totalProjet3 = this.totalProjet3 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
      }
    }
  }

  /** ACTIVITE 4  */
  dureeProjet4 = 0;
  refinterne4 = new Number();
  refClient4!: string;
  laMission4 = new Mission();
  tabAllInputedValue4 = new Array();
  j4!: number;
  selectedOption4!: number;
  ProjectActivity4!: Project;
  isRemote4 = false;

  updatedAfterSelect4() {
    this.refinterne4 = this.collaborateur.id;
    this._service.selectMissionById(this.selectedOption4).subscribe(
      data => this.laMission4 = data,
      error => console.log("exception" + error)
    )
    this.refClient4 = this.laMission4.client.ref;
  }

  remoteRemplis4 = false;
  /** Remplissage automatique des remotes de  l'Activité*/
  remplirRemoteP4() {
    if (this.remoteRemplis4 == true) {
      this.isRemote4 = false;
      this.remoteRemplis4 = false;
    } else {
      this.isRemote4 = true;
      this.remoteRemplis4 = true;
    }
  }

  remplis4 = false;
  /** Remplissage automatique de l'Activité*/
  totalProjet4 = 0;

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
  }

  /** total de l'activité */

  total4() {
    var i;
    this.totalProjet4 = 0;
    for (i = 0; i < this.daysInMonth; i++) {
      if ((<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber != undefined) {
        this.totalProjet4 = this.totalProjet4 + (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
      }
    }
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
    this._service.selectMissionById(this.selectedProjectAstreint1).subscribe(
      data => this.laMissionAstreinte1 = data,
      error => console.log("exception" + error)
    )
  }

  /** Select Type activité via l'id */
  theTypeActivity1 = new TypeActivity();
  selectedTypeUpdate1() {

    this._service.selectTypeActivityById(this.selectedTypeUpdateValue1).subscribe(
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
    this._service.selectMissionById(this.selectedProjectAstreint2).subscribe(
      data => this.laMissionAstreinte2 = data,
      error => console.log("exception" + error)
    )
  }

  theTypeActivity2 = new TypeActivity();

  /** Select Type activité via l'id */
  selectedTypeUpdate2() {

    this._service.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
      data => this.theTypeActivity2 = data,
      error => console.log("exception" + error)
    )
    this.astreinte2.TypeActivity = this.theTypeActivity2;
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
    this._service.selectMissionById(this.selectedProjectAstreint3).subscribe(
      data => this.laMissionAstreinte3 = data,
      error => console.log("exception" + error)
    )
  }

  theTypeActivity3 = new TypeActivity();

  /** Select Type activité via l'id */

  selectedTypeUpdate3() {
    this._service.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
      data => this.theTypeActivity3 = data,
      error => console.log("exception" + error)
    )
    this.astreinte3.TypeActivity = this.theTypeActivity3;
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

  activity = new Activity();
  activity2 = new Activity();
  activity3 = new Activity();
  activity4 = new Activity();

  typeActivity = new TypeActivity();
  typeActivity2 = new TypeActivity();
  typeActivity3 = new TypeActivity();
  typeActivity4 = new TypeActivity();

  EnregisterEtEnvoyer() {

    /** FOR ACTIVITY  */
    // Faudra récupérer le type de l'activité dans le formulaire
    this._service.selectTypeActivityById(2).subscribe(
      data => this.typeActivity = data,
      error => console.log("exception" + error)
    )

    this._service.selectTypeActivityById(2).subscribe(
      data => this.typeActivity2 = data,
      error => console.log("exception" + error)
    )

    this._service.selectTypeActivityById(2).subscribe(
      data => this.typeActivity3 = data,
      error => console.log("exception" + error)
    )

    this._service.selectTypeActivityById(2).subscribe(
      data => this.typeActivity4 = data,
      error => console.log("exception" + error)
    )

    if (this.selectedOption != null) {
      console.log("Dans le if : " + this.selectedOption);
      ////// ###########################################################
      ////// ########################################################### Le projet n'est pas récupérer
      this._service.selectProjectByMissionId(this.selectedOption).subscribe(
        data => {
          this.ProjectActivity = data
          console.log("Premier");
        },
        error => console.log("exception" + error)
      )
      console.log("Subscribe " + this.ProjectActivity);
    }

    if (this.selectedOption2 != null) {
      this._service.selectProjectByMissionId(this.selectedOption2).subscribe(
        data => this.ProjectActivity2 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption3 != null) {
      this._service.selectProjectByMissionId(this.selectedOption3).subscribe(
        data => this.ProjectActivity3 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption4 != null) {
      this._service.selectProjectByMissionId(this.selectedOption4).subscribe(
        data => this.ProjectActivity4 = data,
        error => console.log("exception" + error)
      )
    }

    for (var i = 0; i < this.daysInMonth; i++) {
      /** ACTIVITY 1 */
      if (this.totalProjet1 != 0) {
        this.activity.collaboratorId = 2;
        console.log("ProjectId : " + this.ProjectActivity);
        this.activity.projectId = this.ProjectActivity.id;
        this.activity.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
        this.activity.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
        this.activity.TypeActivity = this.typeActivity;

        console.log(this.ProjectActivity.id)
        this._service.addAndUpdateActivity(this.activity, this.aujourdhui).subscribe(
          data => {
            console.log("activity 1 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )

      }

      /** ACTIVITY 2 */
      if (this.totalProjet2 != 0) {
        this.activity2.collaboratorId = 1;
        this.activity2.projectId = this.ProjectActivity2.id;
        this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay2[i])).valueAsNumber;
        this.activity2.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay2[i])).checked;
        this.activity2.TypeActivity = this.typeActivity2;

        this._service.addAndUpdateActivity(this.activity2, this.aujourdhui).subscribe(
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

        this.activity3.collaboratorId = 1;
        this.activity3.projectId = this.ProjectActivity3.id;
        this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay3[i])).valueAsNumber;
        this.activity3.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay3[i])).checked;
        this.activity3.TypeActivity = this.typeActivity3;

        this._service.addAndUpdateActivity(this.activity3, this.aujourdhui).subscribe(
          data => {
            console.log("activity  3 ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )

      }

      /** ACTIVITY 4 */

      if (this.totalProjet4 != 0) {

        this.activity4.collaboratorId = 1;
        this.activity4.projectId = this.ProjectActivity4.id;
        this.activity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay4[i])).valueAsNumber;
        this.activity4.remote = (<HTMLInputElement>document.getElementById(this.remotePerDay4[i])).checked;
        this.activity4.TypeActivity = this.typeActivity4;

        this._service.addAndUpdateActivity(this.activity, this.aujourdhui).subscribe(
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

        this._service.selectProjectByMissionId(2).subscribe(
          data => this.projectAstreinte1 = data,
          error => console.log("exception" + error)
        )

        this.astreinte1.collaboratorId = 1;
        this.astreinte1.projectId = this.selectedProjectAstreint1;
        this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay1[i])).valueAsNumber;
        this.astreinte1.TypeActivity = this.theTypeActivity1;

        console.log(this.astreinte1.collaboratorId)
        console.log("id du cadsqdq :" + this.astreinte1.projectId)
        console.log(this.astreinte1.duration)
        console.log(this.astreinte1.TypeActivity)


        this._service.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte  ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ASTREINTE 2  */

      if (this.totalAstreinte2 != 0) {

        this._service.selectProjectByMissionId(2).subscribe(
          data => this.projectAstreinte2 = data,
          error => console.log("exception" + error)
        )

        this.astreinte2.collaboratorId = 1;
        this.astreinte2.projectId = this.selectedProjectAstreint1;
        this.astreinte2.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay2[i])).valueAsNumber;
        this.astreinte2.TypeActivity = this.theTypeActivity2;

        this._service.addAndUpdateActivity(this.astreinte2, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte  ajouté");
          },
          error => {
            console.log("erreur ajout non-effectué")
          }
        )
      }

      /** ASTREINTE 3 */

      if (this.totalAstreinte3 != 0) {
        this.astreinte3.collaboratorId = 1;
        this.astreinte3.projectId = this.selectedProjectAstreint3;
        this.astreinte3.duration = (<HTMLInputElement>document.getElementById(this.astreintePerDay3[i])).valueAsNumber;
        this.astreinte3.TypeActivity = this.theTypeActivity3;

        this._service.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
          data => {
            console.log("astreinte  ajouté");
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
    this._route.navigate(['/utilisateur']);
  }

  test() {
    console.log("type :" + this.typeAstreinte)
  }

  totalActivity!: number;

  totalAllActivity() {
    this.totalActivity = this.totalProjet1 + this.totalProjet2 + this.totalProjet3 + this.totalProjet4;
  }
}