import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { cpuUsage } from 'node:process';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';

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


isRemote!: Boolean;
remotePerDay = new Array();


activity1 = new Activity();
dureeProjet1!: number;
totalProjet1!: number;

activity2 = new Activity();
dureeProjet2!: number;
totalProjet2!: number;

activity3 = new Activity();
dureeProjet3!: number;
totalProjet3!: number;

activity4 = new Activity();
dureeProjet4!: number;
totalProjet4!: number;


aujourdhui = new Date();

nosDates!: number[];





  constructor(private _route:Router,private _service:NgserviceService) {}

  ngOnInit(): void {

    if(this.dt.getDay() == 6 || this.dt.getDay() == 0){

    }

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

  passIndexValue(index: any){
    console.log(index);
 }

  remplirProjet1(){
    this.dureeProjet1 = 1;
    this.totalProjet1 = this.daysInMonth;
  }


  remplirProjet2(){
    this.dureeProjet2 = 1;
    this.totalProjet2 = this.daysInMonth;
  }

  remplirProjet3(){
    this.dureeProjet3 = 1;
    this.totalProjet3 = this.daysInMonth;
  }
  
  remplirProjet4(){
    this.dureeProjet4 = 1;
    this.totalProjet4 = this.daysInMonth;
  }

  indexValSaisi!: number;

  tabAllInputedValue=new Array();
  j!: number;


  
  EnregisterEtEnvoyer(){

    var i;
    for (i = 0; i < this.daysInMonth; i++) {
          
    this.activity1.collaboratorId = 1;
    this.activity1.projectId = 2;
    this.activity1.typeActivityId = 2;
    this.activity1.duration = (<HTMLInputElement>document.getElementById(this.activitiesPerDay[i])).valueAsNumber;
    this.activity1.remote =  (<HTMLInputElement>document.getElementById(this.remotePerDay[i])).checked;
    

    console.log(this.activity1.remote);
     
  
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
