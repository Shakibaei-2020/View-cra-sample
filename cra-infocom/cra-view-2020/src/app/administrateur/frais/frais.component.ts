import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { ExpenseService } from 'src/app/y-service/Expense/expense.service';
import { TypeExpenseService } from 'src/app/y-service/Expense/type-expense.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/Expense/expense';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css',
  '../button.scss']
})
export class FraisComponent implements OnInit {

  pipeDate = new DatePipe('fr-FR');

  date1!: Date;
  date2!: Date;
  searchStatus!: string;
  nbResultat!: number;
  lastNameCollab!: string;
  error!: string;


  /** expense */
  expenseRequestId = new Array();
  dateExpense = new Array();
  expenseBillable = new Array();
  expenseCostHT = new Array();
  expenseCostTVA = new Array();
  dateExpenseRequest = new Array();
  expenseStatus = new Array();
  expenseType = new Array();
  newCostTTC = new Array();

  allExpenseType!: TypeExpense[];
  expenses!: Expense[];

  status = ["en-cours", "validé", "refusé"]



  constructor(
    private _route: Router,
    private _CollaboratorService: CollaboratorService,
    private _ExpenseService: ExpenseService,
    private _TypeExpenseService: TypeExpenseService,

  ) { }

  ngOnInit(): void {

    /** select all type Expense */
    this._TypeExpenseService.selectAllTypeExpense().subscribe(
      data => this.allExpenseType = data,
      error => console.log("exception" + error)
    )

  }
  goToEditFrais() {
    this._route.navigate(['/editFrais']);
  }


  searchExpenses() {

    if ((this.date1 != undefined && this.date2 != undefined) && (this.searchStatus != undefined && this.searchStatus != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];

      this._ExpenseService.searchExpense(this.date1, this.date2, this.searchStatus, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }


            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }

        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);
      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";
    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.searchStatus === undefined || this.searchStatus === "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByDate(this.date1, this.date2).subscribe(
        data => {
          this.expenses = data;

          if (this.expenses.length != 0) {


            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }


            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 != undefined && this.date2 != undefined) && (this.searchStatus === undefined || this.searchStatus === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByDateName(this.date1, this.date2, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }

            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }

                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 != undefined || this.date2 != undefined) && (this.searchStatus != undefined && this.searchStatus != "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByDateStatus(this.date1, this.date2, this.searchStatus).subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);


            }


            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 === undefined || this.date2 === undefined) && (this.searchStatus === undefined || this.searchStatus === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByName(this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;

          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }


            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 === undefined && this.date2 === undefined) && (this.searchStatus != undefined && this.searchStatus != "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByStatus(this.searchStatus).subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }


            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";

    } else if ((this.date1 === undefined || this.date2 === undefined) && (this.searchStatus != undefined && this.searchStatus != "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchExpenseByNameStatus(this.searchStatus, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {

            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);
            }

            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }


                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },

        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 === undefined && this.date2 === undefined) && (this.searchStatus === undefined || this.searchStatus === "") && (this.lastNameCollab === undefined || this.lastNameCollab === "")) {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];


      this._ExpenseService.searchAllExpense().subscribe(
        data => {
          this.expenses = data;
          if (this.expenses.length != 0) {


            for (var i = 0; i < this.expenses.length; i++) {
              this.expenseRequestId.push("expenseRequestId-" + i);
              this.dateExpense.push("dateExpense-" + i);
              this.expenseBillable.push("expenseBillable-" + i);
              this.expenseCostHT.push("expenseCostHT-" + i);
              this.expenseCostTVA.push("expenseCostTVA-" + i);
              this.dateExpenseRequest.push("dateExpenseRequest-" + i);
              this.expenseStatus.push("expenseStatus-" + i);
              this.expenseType.push("expenseType-" + i);
              this.newCostTTC.push("newCostTTC" + i);


            }

            this.nbResultat = this.expenses.length;

            this.expenses.forEach(
              (item) => {
                this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
                  data => {
                    if (item != null) {
                      item.nomCollab = data.lastName;
                      item.prenomCollab = data.firstName;
                      item.oldDateExpense = this.pipeDate.transform(item.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

                      if (item.billable == true) {
                        item.billableFR = "oui";
                      } else if (item.billable == false) {
                        item.billableFR = "non";
                      }

                    }
                  },
                  error => console.log("exception" + error)
                )
              }
            )
          } else {
            this.expenses = [];
            this.nbResultat = 0
          }
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if (this.nbResultat = 0) {

      this.expenses = [];

    } else {

      this.expenseRequestId = [];
      this.dateExpense = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA = [];
      this.dateExpenseRequest = [];
      this.expenseStatus = [];
      this.expenseType = [];
      this.newCostTTC = [];

      this.expenses = [];

      this.error = "Merci de vérifier que les deux champs dates  ont été bien remplies.";
      this.nbResultat = 0;
    }
  }



  goToAccueil() {
    this._route.navigate(['/administrateur']);
  }


  TTCvalue!: number;
  updateTTC(i: number) {
    this.TTCvalue = +(<HTMLInputElement>document.getElementById(this.expenseCostHT[i])).value + +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[i])).value;
  }


  deleteExpenseById(value: number, expensesTodel: Expense[], expense: Expense) {

    this._ExpenseService.deleteOneExpense(value).subscribe(
      data => {
        console.log("delete expense effectué");

        const index = expensesTodel.indexOf(expense);
        if (index > -1) {
          expensesTodel.splice(index, 1);

        }
      },
      error => {
        console.log("erreur delete expense non-effectué")
      }
    )
  }


  /** MAJ EXPENSE  */
  selectedExpense = new Expense();
  updatedExpense = new Expense();
  newDateRequest!: string;
  newDateExpense!: string;
  index!: number;
  date = new Date();
  expenseToUpdate = new Expense();
  newTypeExpense = new TypeExpense();

  validation!: string;
  notValidation!: string;


  updateExpense(indexOfElement: number) {


    this._ExpenseService.selectOneExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.expenseToUpdate = data1;
        this.updatedExpense.id = this.expenseToUpdate.id;
        this.updatedExpense.collaboratorId = this.expenseToUpdate.collaboratorId;
        this._TypeExpenseService.selectTypeExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseType[indexOfElement])).value).subscribe(
          data2 => {

            this.newTypeExpense = data2;
            this.updatedExpense.typeExpense = this.newTypeExpense || this.expenseToUpdate.typeExpense
            this.newDateExpense = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateExpense[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';
            this.newDateRequest = this.pipeDate.transform(this.expenseToUpdate.dateRequest, 'yyyy-MM-dd') || '2000-02-14';
            
            this.updatedExpense.billable = (<HTMLInputElement>document.getElementById(this.expenseBillable[indexOfElement])).value === "true" ? true : false;

            this.updatedExpense.status = (<HTMLInputElement>document.getElementById(this.expenseStatus[indexOfElement])).value || this.expenseToUpdate.status;
            this.updatedExpense.costHT = +(<HTMLInputElement>document.getElementById(this.expenseCostHT[indexOfElement])).value || this.expenseToUpdate.costHT;
            this.updatedExpense.costTVA = +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[indexOfElement])).value || this.expenseToUpdate.costTVA;
            this.updatedExpense.costTTC = this.updatedExpense.costHT + this.updatedExpense.costTVA || this.expenseToUpdate.costTTC;
            this.TTCvalue = this.updatedExpense.costTTC;

            this._ExpenseService.addAndUpdateExpense(this.updatedExpense, this.newDateExpense, this.newDateRequest).subscribe(
              data => {
                console.log("ajout effectué");
                this.validation = "Les mises à jour ont bien été effectuées.";
                this.notValidation = "";
              },
              error => {
                console.log("erreur ajout non-effectué");
                this.notValidation = "Les mises à jour n'ont pas été effectuées.";
                this.validation = "";
              }
            )
            //window.location.reload();
          },
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )

  }



}
