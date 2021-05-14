import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-search-collaborateur',
  templateUrl: './search-collaborateur.component.html',
  styleUrls: ['./search-collaborateur.component.css']
})
export class SearchCollaborateurComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }


  goToEditCollab(){
    this._route.navigate(['/editCollaborateur']);
  }

}
