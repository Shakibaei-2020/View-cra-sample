import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { MissionService } from 'src/app/y-service/Mission/mission.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { ProjectService } from 'src/app/y-service/Project/project.service';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor( 
    private _service:NgserviceService,
    private _route:Router,
    private _MissionService: MissionService,
    private _ProjectService : ProjectService,

    ) { }

  missions!: Mission[];

  projectTitle!: string;
  missionOfproject!: number;


  ngOnInit(): void {

    this._MissionService.selectAllMission().subscribe(
      data=>this.missions = data,
      error=>console.log("exception" + error),
    )

  }

  missionToAdd = new Mission();
  projectToAdd= new Project();

  addProject(){
    this._MissionService.selectMissionById(this.missionOfproject).subscribe(
      data=>{this.missionToAdd = data;
      
        this.projectToAdd.projectTitle = this.projectTitle;
        this.projectToAdd.mission = this.missionToAdd;

      this._ProjectService.addAndUpdateProject(this.projectToAdd).subscribe(
        data=>console.log("ajout reussie"),
        error=>console.log("exception"+error)
      )
      },
      error=>console.log("exception"+error)
    )
    
  }


  goToSearch(){
    this._route.navigate(['searchProject']);

  }



}
