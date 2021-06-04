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


  activitiesPerDay5 = new Array();
  activitiesPerDay6 = new Array();
  activitiesPerDay7 = new Array();
  activitiesPerDay8 = new Array();


  constructor(private _route: Router, private _service: NgserviceService) { }

  public missions!: Mission[];
  public collaborateur!: Collaborator;

  monthSelected!: number;
  yearInput!: number;

  retour(){
    this._route.navigate(['/utilisateur']);
  }

  updateMonth() {

    this.tabJours = [];

    this.dt.setMonth(this.monthSelected - 1);
    this.dt.setFullYear(this.yearInput)


    console.log(this.monthSelected);
    console.log(this.dt)

    this.month = this.dt.getMonth() + 1;
    this.year = this.dt.getFullYear();

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    var i;


    for (i = 0; i < this.daysInMonth; i++) {
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

      /** Astreinte */

      this.activitiesPerDay5.push("jourAstreinte1-" + i);
      this.activitiesPerDay6.push("jourAstreinte2-" + i);
      this.activitiesPerDay7.push("jourAstreinte3-" + i);
      this.activitiesPerDay8.push("jourAstreinte4-" + i);


    }

  }
  selectedType!: number;
  lesTypeActivity: TypeActivity[] = [];
  ngOnInit(): void {





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

      this.activitiesPerDay.push("jour-" + i);
      this.remotePerDay.push("remote-" + i);

      this.activitiesPerDay2.push("jour2-" + i);
      this.remotePerDay2.push("remote2-" + i);

      this.activitiesPerDay3.push("jour3-" + i);
      this.remotePerDay3.push("remote3-" + i);

      this.activitiesPerDay4.push("jour4-" + i);
      this.remotePerDay4.push("remote4-" + i);


      this.activitiesPerDay5.push("jourAstreinte1-" + i);
      this.activitiesPerDay6.push("jourAstreinte2-" + i);
      this.activitiesPerDay7.push("jourAstreinte3-" + i);
      this.activitiesPerDay8.push("jourAstreinte4-" + i);


    }
  }

  /** PROJECT 1 */
  dureeProjet1!: number;
  totalProjet1!: number;
  refinterne= new Number();
  refClient = new  Number();
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
    console.log("la 1ere ref"+this.refClient)
  }

  remoteRemplis= false;
  remplirRemoteP1() {

    if(this.remoteRemplis == true){
      this.isRemote = false;
      this.remoteRemplis = false;
    }else{
      this.isRemote = true;
      this.remoteRemplis = true;
    }
  }

  remplis = false;
  remplirProjet1() {
    
    if(this.remplis == true ){
      this.dureeProjet1 = 0;
      this.remplis = false;
    }else{
    this.dureeProjet1 = 1;
    this.remplis=true;
    }
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


  remoteRemplis2= false;
  remplirRemoteP2() {
    if(this.remoteRemplis2 == true){
      this.isRemote2 = false;
      this.remoteRemplis2 = false;
    }else{
      this.isRemote2 = true;
      this.remoteRemplis2 = true;
    }
  }
  
  remplis2 = false;
  remplirProjet2() {
    
    if(this.remplis2 == true ){
      this.dureeProjet2 = 0;
      this.remplis2 = false;
    }else{
    this.dureeProjet2 = 1;
    this.remplis2=true;
    }
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


  remoteRemplis3= false;
  remplirRemoteP3() {
    if(this.remoteRemplis3 == true){
      this.isRemote3 = false;
      this.remoteRemplis3 = false;
    }else{
      this.isRemote3 = true;
      this.remoteRemplis3 = true;
    }
  }
  
  remplis3 = false;
  remplirProjet3() {
    
    if(this.remplis3 == true ){
      this.dureeProjet3 = 0;
      this.remplis3 = false;
    }else{
    this.dureeProjet3 = 1;
    this.remplis3=true;
    }
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



  remoteRemplis4= false;
  remplirRemoteP4() {
    if(this.remoteRemplis4 == true){
      this.isRemote4 = false;
      this.remoteRemplis4 = false;
    }else{
      this.isRemote4 = true;
      this.remoteRemplis4 = true;
    }
  }
  
  remplis4 = false;
  remplirProjet4() {
    if(this.remplis4 == true ){
      this.dureeProjet4 = 0;
      this.remplis4 = false;
    }else{
    this.dureeProjet4 = 1;
    this.remplis4=true;
    }
    this.totalProjet4 = this.daysInMonth;
  }


/** ASTREINTE 1 */
dureeAstreinte1!: number;
totalAstreinte1!: number;
theProject5 = new Project();
laMission5 = new Mission();


remplis5 = false;
remplirAstreinte1() {
  if(this.remplis5 == true ){
    this.dureeAstreinte1 = 0;
    this.remplis5 = false;
  }else{
  this.dureeAstreinte1 = 1;
  this.remplis5=true;
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
selectedTypeUpdate(){
  console.log(this.selectedTypeUpdateValue);
  this._service.selectTypeActivityById(this.selectedTypeUpdateValue).subscribe(
    data => this.theTypeActivity = data,
    error => console.log("exception" + error)
  )    
  this.astreinte1.TypeActivity = this.theTypeActivity;
  console.log("valeur"+ this.astreinte1.TypeActivity.type);
}


/** ASTREINTE 2 */
theProject6 = new Project();
dureeAstreinte2!: number;
totalAstreinte2!: number;
laMission6 = new Mission();

remplis6 = false;

remplirAstreinte2() {
  if(this.remplis6 == true ){
    this.dureeAstreinte2 = 0;
    this.remplis6 = false;
  }else{
  this.dureeAstreinte2 = 1;
  this.remplis6=true;
  }
  this.totalAstreinte2 = this.daysInMonth;
}

selectedOption6!: number;

updatedAfterSelect6() {
  this._service.selectMissionById(this.selectedOption6).subscribe(
    data => this.laMission6 = data,
    error => console.log("exception" + error)
  )
}

selectedTypeUpdateValue2!: number;
theTypeActivity2 = new TypeActivity();
selectedTypeUpdate2(){
  console.log(this.selectedTypeUpdateValue2);
  this._service.selectTypeActivityById(this.selectedTypeUpdateValue2).subscribe(
    data => this.theTypeActivity2 = data,
    error => console.log("exception" + error)
  )    
  this.astreinte2.TypeActivity = this.theTypeActivity2;
  console.log("valeur"+ this.astreinte2.TypeActivity.type);
}



/** ASTREINTE 3 */
theProject7 = new Project();
dureeAstreinte3!: number;
totalAstreinte3!: number;
laMission7 = new Mission();

remplis7 = false;
remplirAstreinte3() {
  if(this.remplis7 == true ){
    this.dureeAstreinte3 = 0;
    this.remplis7 = false;
  }else{
  this.dureeAstreinte3 = 1;
  this.remplis7=true;
  }
  this.totalAstreinte3 = this.daysInMonth;
}

selectedOption7!: number;

updatedAfterSelect7() {
  this._service.selectMissionById(this.selectedOption7).subscribe(
    data => this.laMission7 = data,
    error => console.log("exception" + error)
  )
}


selectedTypeUpdateValue3!: number;
theTypeActivity3 = new TypeActivity();
selectedTypeUpdate3(){
  console.log(this.selectedTypeUpdateValue3);
  this._service.selectTypeActivityById(this.selectedTypeUpdateValue3).subscribe(
    data => this.theTypeActivity3 = data,
    error => console.log("exception" + error)
  )    
  this.astreinte3.TypeActivity = this.theTypeActivity3;
  console.log("valeur"+ this.astreinte3.TypeActivity.type);
}



/** ASTREINTE 4 */
theProject8 = new Project();
laMission8 = new Mission();

dureeAstreinte4!: number;
totalAstreinte4!: number;

remplis8 = false;
remplirAstreinte4() {
  if(this.remplis8 == true ){
    this.dureeAstreinte4 = 0;
    this.remplis8 = false;
  }else{
  this.dureeAstreinte4 = 1;
  this.remplis8=true;
  }
  this.totalAstreinte4 = this.daysInMonth;
}


selectedOption8!: number;

updatedAfterSelect8() {
  this._service.selectMissionById(this.selectedOption8).subscribe(
    data => this.laMission8 = data,
    error => console.log("exception" + error)
  )
}


selectedTypeUpdateValue4!: number;
theTypeActivity4 = new TypeActivity();
selectedTypeUpdate4(){
  console.log(this.selectedTypeUpdateValue4);
  this._service.selectTypeActivityById(this.selectedTypeUpdateValue4).subscribe(
    data => this.theTypeActivity4 = data,
    error => console.log("exception" + error)
  )    
  this.astreinte4.TypeActivity = this.theTypeActivity4;
  console.log("valeur"+ this.astreinte4.TypeActivity.type);
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

  astreinte1 = new Activity();
  astreinte2 = new Activity();
  astreinte3 = new Activity();
  astreinte4 = new Activity();

  TypeActivityAstreinte= new TypeActivity();

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

    /** Astreinte */

    if (this.selectedOption5 != null) {
      this._service.selectProjectByMissionId(this.selectedOption5).subscribe(
        data => this.theProject5 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption6 != null) {
      this._service.selectProjectByMissionId(this.selectedOption6).subscribe(
        data => this.theProject6 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption7 != null) {
      this._service.selectProjectByMissionId(this.selectedOption7).subscribe(
        data => this.theProject7 = data,
        error => console.log("exception" + error)
      )
    }

    if (this.selectedOption8 != null) {
      this._service.selectProjectByMissionId(this.selectedOption8).subscribe(
        data => this.theProject8 = data,
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

      /** astreinte  */

      if (this.theProject5 != null) {
        this.astreinte1.collaboratorId = 1;
        this.astreinte1.projectId = this.theProject5.id;
        this.astreinte1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay5[i])).valueAsNumber;
      }

      if (this.theProject6 != null) {
        this.astreinte2.collaboratorId = 1;
        this.astreinte2.projectId = this.theProject6.id;
        this.astreinte2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay6[i])).valueAsNumber;
      }

      if (this.theProject7 != null) {
        this.astreinte3.collaboratorId = 1;
        this.astreinte3.projectId = this.theProject7.id;
        this.astreinte3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay7[i])).valueAsNumber;
      }

      if (this.theProject8 != null) {
        this.astreinte4.collaboratorId = 1;
        this.astreinte4.projectId = this.theProject8.id;
        this.astreinte4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay8[i])).valueAsNumber;
      }




      /** activité  */

          
        /** 
        this._service.addAndUpdateActivity(this.activity1, this.aujourdhui).subscribe(
          data => {
            console.log("activity1 ajouté");
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
   
   */


              /** Astreinte  */


              this._service.addAndUpdateActivity(this.astreinte1, this.aujourdhui).subscribe(
                data => {
                  console.log("astreinte1 ajouté");
                },
                error => {
                  console.log("erreur ajout non-effectué")
                }
              )

              this._service.addAndUpdateActivity(this.astreinte2, this.aujourdhui).subscribe(
                data => {
                  console.log("astreinte3 ajouté");
                },
                error => {
                  console.log("erreur ajout non-effectué")
                }
              )

              this._service.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
                data => {
                  console.log("astreinte4 ajouté");
                },
                error => {
                  console.log("erreur ajout non-effectué")
                }
              )


              this._service.addAndUpdateActivity(this.astreinte3, this.aujourdhui).subscribe(
                data => {
                  console.log("astreinte5 ajouté");
                },
                error => {
                  console.log("erreur ajout non-effectué")
                }
              )


    }
  }
}



