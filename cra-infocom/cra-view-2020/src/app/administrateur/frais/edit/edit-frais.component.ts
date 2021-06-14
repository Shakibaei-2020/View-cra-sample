import { Component, OnInit, Input } from '@angular/core';
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
  collaborator = new Collaborator();
  allTypeExpense!: TypeExpense[];

  status = ["en-cours", "validé", "refusé"]

  /** collaborator inputs */
  expenseCostHT = "expenseCostHT";
  expenseCostTVA = "expenseCostTVA";
  dateExpense = "dateExpense";
  dateExpenseRequest = "dateExpenseRequest";
  expenseBillable = "expenseBillable";
  expenseType = "expenseType";
  expenseStatus = "expenseStatus";

  constructor(private _service: NgserviceService, private _route: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this._service.selectOneCollabById(2).subscribe(
      data => this.collaborator = data,
      error => console.log("exception" + error)
    )

    this._service.selectOneExpenseById(231).subscribe(
      data => this.expense = data,
      error => console.log("exception" + error)
    )

    this._service.selectAllTypeExpense().subscribe(
      data => this.allTypeExpense = data,
      error => console.log("exception" + error)
    )

  }

  pipeDate = new DatePipe('fr-FR');


  expenseToUpdate = new Expense();
  updatedExpense = new Expense();
  newTypeExpense = new TypeExpense();

  newDateExpense!: string;
  newDateRequest!: string;

  updateExpense() {

    /** on selectionne l'expense à mettre a jour */
    this._service.selectOneExpenseById(231).subscribe(
      data1=> {this.expenseToUpdate = data1;

        this.updatedExpense.id = this.expenseToUpdate.id;

        /** on select le type qu'on veut lui imposé */
        this._service.selectTypeExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseType)).value).subscribe(
          data2=>{this.newTypeExpense = data2;

            this.updatedExpense.typeExpense = this.newTypeExpense || this.expenseToUpdate.typeExpense
            this.newDateExpense = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateExpense)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';
            this.newDateRequest = this.pipeDate.transform(this.expenseToUpdate.dateRequest, 'yyyy-MM-dd') || '2000-02-14';
            this.updatedExpense.billable = !(<HTMLInputElement>document.getElementById(this.expenseBillable)).value || this.expenseToUpdate.billable;;
            this.updatedExpense.status = (<HTMLInputElement>document.getElementById(this.expenseStatus)).value || this.expenseToUpdate.status;
            this.updatedExpense.costHT = +(<HTMLInputElement>document.getElementById(this.expenseCostHT)).value || this.expenseToUpdate.costHT;
            this.updatedExpense.costTVA = +(<HTMLInputElement>document.getElementById(this.expenseCostTVA)).value || this.expenseToUpdate.costTVA;
            this.updatedExpense.costTTC = this.updatedExpense.costHT + this.updatedExpense.costTVA || this.expenseToUpdate.costTTC;

            /** on effectue la mise à jour */
            this._service.addAndUpdateExpense(this.updatedExpense, this.newDateExpense, this.newDateRequest).subscribe(
              data => {
                console.log("ajout effectué");
              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
            window.location.reload();
          },
          error=>console.log("exception"+error), 
        )
      },
      error=> console.log("exception"+ error),
    )

  }

  /** on supprimer l'expense selectionné */
  deleteExpense() {
    this.expense.id;
    this._service.deleteOneExpense(2).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur delete non-effectué")
      }
    )
  }


}
