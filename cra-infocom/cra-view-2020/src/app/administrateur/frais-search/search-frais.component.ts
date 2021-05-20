import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-search-frais',
  templateUrl: './search-frais.component.html',
  styleUrls: ['./search-frais.component.css']
})
export class SearchFraisComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }

  goToEditFrais(){
    this._route.navigate(['/editFrais']);
  }

  


}
