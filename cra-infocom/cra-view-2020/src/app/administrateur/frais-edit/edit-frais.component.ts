import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';

@Component({
  selector: 'app-edit-frais',
  templateUrl: './edit-frais.component.html',
  styleUrls: ['./edit-frais.component.css']
})
export class EditFraisComponent implements OnInit {


  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  MajFrais(){
    this._route.navigate(['/searchFrais']);

  }

  deleteFrais(){
    this._route.navigate(['/searchFrais']);

  }

}
