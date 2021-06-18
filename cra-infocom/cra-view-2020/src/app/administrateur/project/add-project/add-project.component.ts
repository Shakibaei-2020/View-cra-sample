import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Mission } from 'src/app/z-model/Mission/mission';
import { Project } from 'src/app/z-model/Project/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor( private _service:NgserviceService,private _route:Router) { }

  missions!: Mission[];

  projectTitle!: string;
  missionOfproject!: number;


  ngOnInit(): void {

    this._service.selectAllMission().subscribe(
      data=>this.missions = data,
      error=>console.log("exception" + error),
    )

  }

  missionToAdd = new Mission();
  projectToAdd= new Project();

  addProject(){
    this._service.selectMissionById(this.missionOfproject).subscribe(
      data=>{this.missionToAdd = data;
      
        this.projectToAdd.projectTitle = this.projectTitle;
        this.projectToAdd.mission = this.missionToAdd;

      this._service.addAndUpdateProject(this.projectToAdd).subscribe(
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
