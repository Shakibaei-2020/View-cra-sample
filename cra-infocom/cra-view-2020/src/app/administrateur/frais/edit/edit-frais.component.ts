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

  deleteFrais(){
    this._route.navigate(['/searchFrais']);

  }


  updateExpense(){

    this.updatedExpense.id = this.expense.id;

    this._service.addOneExpense(this.updatedExpense).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteExpense(){
    this._service.deleteOneExpense(this.expense).subscribe(
      data =>{
        console.log("delete effectué");
        this._route.navigate(['listCollab']);
      },
      error =>{
        console.log("erreur delete non-effectué")
      }
    )
  }


}
