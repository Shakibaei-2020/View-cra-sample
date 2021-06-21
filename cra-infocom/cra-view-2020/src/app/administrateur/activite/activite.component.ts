import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

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
    private _ActivityService: ActivityService,
    private _CollaboratorService: CollaboratorService,
  ) { }

  ngOnInit(): void {

 
  }

  searchActivity() {


    this._CollaboratorService.selectCollabByName(this.firstNameCollab).subscribe(
      data => {
        this.collaboratorsWithThisName = data;
        console.log(this.collaboratorsWithThisName)

        for (var i = 0; i < this.collaboratorsWithThisName.length; i++) {
          this._ActivityService.searchActivityByidCollMonthYear(this.monthActivity, this.yearActivity, this.collaboratorsWithThisName[i].id).subscribe(
            data => {
              this.activitys = data;
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
