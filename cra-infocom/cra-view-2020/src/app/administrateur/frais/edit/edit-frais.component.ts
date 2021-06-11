import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Expense } from 'src/app/z-model/Expense/expense';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-frais',
  templateUrl: './edit-frais.component.html',
  styleUrls: ['./edit-frais.component.css'],
  providers: [DatePipe],
})
export class EditFraisComponent implements OnInit {

  expense = new Expense();
  updatedExpense = new Expense();

  dateExpense = new Date();
  dateRequest !: string;

  allTypeExpense!:  TypeExpense[];

  status =  ["en-cours", "validé", "refusé"]

  date!: Date;

  constructor(private _service:NgserviceService, private _route:Router, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this._service.selectOneExpenseById(231).subscribe(
      data=> this.expense = data,
      error=>console.log("exception" +error)
      )
      
      this._service.selectAllTypeExpense().subscribe(
        data=> this.allTypeExpense = data,
        error=>console.log("exception" +error)
      )
  }


  idOfExpenseType!:number;
  expenseType = new TypeExpense();
  getExpenseType() {
    this._service.selectTypeExpenseById(this.idOfExpenseType).subscribe(
      data => { this.expenseType = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
    }, 50);
  }



  MajFrais(){
    this._route.navigate(['/searchFrais']);
  }


  updateExpense(){

    /** 
    this.updatedExpense.id = this.expense.id;
    this.updatedExpense.collaboratorId = this.expense.collaboratorId;
    this.updatedExpense.typeExpense = this.expenseType;
    
    this._service.addAndUpdateExpense(this.updatedExpense,this.dateExpense,this.dateRequest).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  window.location.reload(); */
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

  formatageDate() {
    var jour = new Date().getDay() + 6;
    var jour_toString = jour.toString();
    if (jour < 10) {
      jour_toString = "0" + jour_toString;
    }
    var mois = new Date().getMonth() + 1;
    var mois_toString = mois.toString();
    if (mois < 10) {
      mois_toString = "0" + mois_toString;
    }
    var annee = new Date().getFullYear();
    return annee + '-' + mois_toString + '-' + jour_toString;
  }



}
