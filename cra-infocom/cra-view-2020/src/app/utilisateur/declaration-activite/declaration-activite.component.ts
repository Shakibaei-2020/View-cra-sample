import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

@Component({
  selector: 'app-declaration-activite',
  templateUrl: './declaration-activite.component.html',
  styleUrls: ['./declaration-activite.component.css']
})
export class DeclarationActiviteComponent implements OnInit {

dt = new Date();

month!: number;
year!: number;
daysInMonth!: number;
tabJours=new Array();

calendar = document.querySelector("app-calendar")


nosDates!: number[];



  constructor() { 

  
  }

  


  ngOnInit(): void {



    this.month = this.dt.getMonth()+1;
    this.year = this.dt.getFullYear();

   this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    console.log(this.daysInMonth);


    var i;
    for (i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
    }



  }

  

}
