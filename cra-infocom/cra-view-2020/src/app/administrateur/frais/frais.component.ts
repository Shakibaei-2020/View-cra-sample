import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {

  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {
  }
  goToEditFrais(){
    this._route.navigate(['/editFrais']);
  }

  
}
