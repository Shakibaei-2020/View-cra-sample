import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  goToEditConge(){
    this._route.navigate(['/editConge']);
  }

}
