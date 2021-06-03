import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { cpuUsage } from 'node:process';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Mission } from 'src/app/z-model/mission';
import { Project } from 'src/app/z-model/project';

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
tabJours=new Array();

activitiesPerDay = new Array();
remotePerDay = new Array();

  constructor(private _route:Router,private _service:NgserviceService) {}

  
  public missions!:Mission[];  
  public collaborateur!: Collaborator;

  ngOnInit(): void {

    this._service.selectAllMission().subscribe(
      data=> this.missions = data,
      error=>console.log("exception" +error)
      )

      this._service.selectOneCollabById(2).subscribe(
        data=> this.collaborateur = data,
        error=>console.log("exception" +error)
        )

    this.month = this.dt.getMonth()+1;
    this.year = this.dt.getFullYear();

   this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    var i;
    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;

      this.activitiesPerDay.push("jour-"+i);

      this.remotePerDay.push("remote-"+i);

    }
  }






  /** PROJECT 1 */

  dureeProjet1!: number;
  totalProjet1!: number;
  refinterne!: number;
  refClient!: number;
  laMission!: Mission;
  indexValSaisi!: number;
  tabAllInputedValue=new Array();
  j!: number;
  selectedOption!: number;
  theProject!: Project;
  isRemote!: Boolean;

  updatedAfterSelect(){

    this.refinterne = this.collaborateur.id;
    console.log(this.selectedOption);
    this._service.selectMissionById(this.selectedOption).subscribe(
      data=> this.laMission = data,
      error=>console.log("exception" +error)
      )
      this.refClient = this.laMission.client.id;
  }

  remplirRemoteP1(){
  this.isRemote = true;
  }
  
  remplirProjet1(){
    this.dureeProjet1 = 1;
    this.totalProjet1 = this.daysInMonth;
  }

  /** END PROJECT 1 */


    /** PROJECT 2 */


    
  dureeProjet2!: number;
  totalProjet2!: number;
  refinterne2!: number;
  refClient2!: number;
  laMission2!: Mission;
  indexValSaisi2!: number;
  tabAllInputedValue2=new Array();
  j2!: number;
  selectedOption2!: number;
  theProject2!: Project;
  isRemote2!: Boolean;

  updatedAfterSelect2(){

    this.refinterne2 = this.collaborateur.id;
    console.log(this.selectedOption2);
    this._service.selectMissionById(this.selectedOption2).subscribe(
      data=> this.laMission2 = data,
      error=>console.log("exception" +error)
      )
      this.refClient2 = this.laMission2.client.id;
  }

  remplirRemoteP2(){
  this.isRemote2 = true;
  }
  
  remplirProjet2(){
    this.dureeProjet2 = 1;
    this.totalProjet2 = this.daysInMonth;
  }


  /** END PROJECT 2*/


    /** PROJECT 3 */

  /** END PROJECT 3 */


    /** PROJECT 4 */

  /** END PROJECT 4 */



  /** COMMUN */
  aujourdhui = new Date();
  activity1 = new Activity();
  activity2 = new Activity();
  activity3 = new Activity();
  activity4 = new Activity();

  EnregisterEtEnvoyer(){

    console.log(this.selectedOption);
 
    this._service.selectProjectByMissionId( this.selectedOption).subscribe(
      data=> this.theProject = data,
      error=>console.log("exception" +error)
    )

    var i;
    for (i = 0; i < this.daysInMonth; i++) {
          
    this.activity1.collaboratorId = 1;
    this.activity1.projectId = this.theProject.id;
    this.activity1.typeActivityId = 2;
    this.activity1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
    this.activity1.remote =  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;



    this.activity2.collaboratorId = 1;
    this.activity2.projectId = this.theProject.id;
    this.activity2.typeActivityId = 2;
    this.activity2.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
    this.activity2.remote =  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;



    this.activity3.collaboratorId = 1;
    this.activity3.projectId = this.theProject.id;
    this.activity3.typeActivityId = 2;
    this.activity3.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
    this.activity3.remote =  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;

    this.activity4.collaboratorId = 1;
    this.activity4.projectId = this.theProject.id;
    this.activity4.typeActivityId = 2;
    this.activity4.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
    this.activity4.remote =  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
    
     this._service.addAndUpdateActivity(this.activity1,this.aujourdhui).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }
  }


}
