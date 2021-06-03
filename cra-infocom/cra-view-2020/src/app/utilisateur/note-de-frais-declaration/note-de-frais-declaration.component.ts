import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/expense';
import { TypeExpense } from 'src/app/z-model/type-expense';

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


  inputedTypeExpense= new TypeExpense();
  typeExpense = new TypeExpense();


  test(){
   console.log(this.inputedTypeExpense.id);

  }


  addExpense(){


    this._service.selectTypeExpenseById(this.inputedTypeExpense.id).subscribe(
      data=> this.typeExpense = data,
      error=>console.log("exception" +error)
    )

    this.expense.collaboratorId = 2;
    this.expense.status= 'en-cours';
    this.expense.typeExpense = this.typeExpense;

    /** a modifier a la date de la demande rentrée */
    this.dateRequest = this.dateExpense;

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
