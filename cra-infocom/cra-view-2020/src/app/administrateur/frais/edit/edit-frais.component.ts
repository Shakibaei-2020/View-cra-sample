import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Expense } from 'src/app/z-model/expense';

@Component({
  selector: 'app-edit-frais',
  templateUrl: './edit-frais.component.html',
  styleUrls: ['./edit-frais.component.css']
})
export class EditFraisComponent implements OnInit {

  expense = new Expense();
  updatedExpense = new Expense();

  dateExpense = new Date();
  dateRequest = new Date();



  constructor(private _service:NgserviceService, private _route:Router) { }

  ngOnInit(): void {

    this._service.selectOneExpenseById(2).subscribe(
      data=> this.expense = data,
      error=>console.log("exception" +error)
      )
  }

  MajFrais(){
    this._route.navigate(['/searchFrais']);

  }


  updateExpense(){

    this.updatedExpense.id = this.expense.id;

    this._service.addAndUpdateExpense(this.updatedExpense,this.dateExpense,this.dateRequest).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteExpense(){

    this.expense.id;
    this._service.deleteOneExpense(2).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }


}
