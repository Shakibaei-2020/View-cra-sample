import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})
export class EditCollaborateurComponent implements OnInit{

  message!:string;
  subscription!: Subscription;

  @Input() childMessage!: string;


  constructor(private _service:NgserviceService, private _route:Router) { 

  }



  ngOnInit() {
    console.log(this.childMessage)

  }




}
