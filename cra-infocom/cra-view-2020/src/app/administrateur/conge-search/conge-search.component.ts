import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-conge-search',
  templateUrl: './conge-search.component.html',
  styleUrls: ['./conge-search.component.css']
})
export class CongeSearchComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  goToEditConge(){
    this._route.navigate(['/editConge']);
  }

}
