import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/Leave/leave';
import { Mission } from 'src/app/z-model/Mission/mission';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  date1!: Date;
  date2!: Date;
  clientName!: string;
  nbResultat!: number;
  error!: string;


  public missions!: Mission[];


  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {
  }

  searchMission() {


    if ((this.date1 != undefined && this.date2 != undefined) && (this.clientName != undefined && this.clientName != "")) {

      this._service.searchMission(this.date1, this.date2, this.clientName).subscribe(
        data => {
          this.missions = data;
          this.nbResultat = this.missions.length
        },
        error => console.log("exception" + error)
      )

      this.clientName = "";
      this.error ="";

    } else if ((this.date1 === undefined || this.date2 === undefined) &&  (this.clientName != undefined && this.clientName != "" )) {

      this._service.searchMissionByName( this.clientName).subscribe(
        data => {
          this.missions = data;
          this.nbResultat = this.missions.length
        },
        error => console.log("exception" + error)
      )
      this.clientName = "";
      this.error ="";


    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.clientName === undefined || this.clientName === "")) {
    
      this._service.searchMissionByDate( this.date1, this.date2).subscribe(
        data => {
          this.missions = data;
          this.nbResultat = this.missions.length
        },
        error => console.log("exception" + error)
      )

      this.clientName = "";
      this.error ="";

    }else if ((this.date1 === undefined && this.date2 === undefined) && (this.clientName === undefined || this.clientName == "") ){
      this._service.searchAllMission( ).subscribe(
        data => {
          this.missions = data;
          this.nbResultat = this.missions.length
        },
        error => console.log("exception" + error)
      )
    }else{

      this.error = "Un problème est survenue, merci de vérifier que les deux dates champs ont été bien remplies.";

    }



  }

  goGerer() {
    this._route.navigate(['/editMission']);

  }

  goToAddMission() {
    this._route.navigate(['/addMission']);

  }
  goToAccueil() {
    this._route.navigate(['/administrateur']);

  }
}
