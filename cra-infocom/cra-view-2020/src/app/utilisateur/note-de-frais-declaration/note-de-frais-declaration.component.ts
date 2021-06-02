import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/expense';

@Component({
  selector: 'app-note-de-frais-declaration',
  templateUrl: './note-de-frais-declaration.component.html',
  styleUrls: ['./note-de-frais-declaration.component.css']
})
export class NoteDeFraisDeclarationComponent implements OnInit {

  constructor(private _route:Router,private _service:NgserviceService) { }

  ngOnInit(): void {
  }

  expense = new Expense();

  dateExpense = new Date();
  dateRequest = new Date();


  addExpense(){


    this.expense.collaboratorId = 2;
    this.expense.status= 'en-cours';
    this._service.addAndUpdateExpense(this.expense,this.dateExpense,this.dateRequest).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }
  

}
