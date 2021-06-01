import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/activity';
import { TypeActivity } from 'src/app/z-model/type-activity';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {

  typeActivity = new TypeActivity();

  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {
  }

  addNewTypeActivity(){
  
    this._service.addNewTypeActivit(this.typeActivity).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }
  

  


}
