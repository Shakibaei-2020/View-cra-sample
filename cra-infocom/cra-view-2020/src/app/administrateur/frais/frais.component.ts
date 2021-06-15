import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/Expense/expense';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
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



  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {

    /** select all type Expense */
    this._service.selectAllTypeExpense().subscribe(
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];

      this._service.searchExpense(this.date1, this.date2, this.searchStatus, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )

          
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];


      this._service.searchExpenseByDate(this.date1, this.date2).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];


      this._service.searchExpenseByDateName(this.date1, this.date2, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];


      this._service.searchExpenseByDateStatus(this.date1, this.date2, this.searchStatus).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];


      this._service.searchExpenseByName(this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;


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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];


      this._service.searchExpenseByStatus(this.searchStatus).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
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
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];

      
      this._service.searchExpenseByNameStatus(this.searchStatus, this.lastNameCollab).subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";


    } else if ((this.date1 === undefined && this.date2 === undefined) && (this.searchStatus === undefined || this.searchStatus === "")&& (this.lastNameCollab === undefined || this.lastNameCollab === "")) {
      
      this.expenseRequestId = [];
      this.dateExpense  = [];
      this.expenseBillable = [];
      this.expenseCostHT = [];
      this.expenseCostTVA  = [];
      this.dateExpenseRequest  = [];
      this.expenseStatus  = [];
      this.expenseType  = [];
      this.newCostTTC  = [];

      
      this._service.searchAllExpense().subscribe(
        data => {
          this.expenses = data;

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
              this._service.selectOneCollabById(item.collaboratorId).subscribe(
                data => {
                  if (item != null) {
                    item.nomCollab = data.lastName;
                    item.prenomCollab = data.firstName;
                    item.oldDateExpense =   this.pipeDate.transform( item.dateExpense, 'yyyy-MM-dd') || '2000-02-14' ;

                  }
                },
                error => console.log("exception" + error)
              )
            }
          )
        },
        error => console.log("exception" + error)
      )
      setTimeout(() => {
      }, 50);

      this.lastNameCollab = "";
      this.searchStatus = "";
      this.error = "";

    } else {
      this.error = "Merci de vérifier que les deux champs dates  ont été bien remplies.";
      this.nbResultat = 0;
    }
  }


  goToAccueil() {
    this._route.navigate(['/administrateur']);
  }


  TTCvalue!: number;
  updateTTC(i : number){
  this.TTCvalue =   +(<HTMLInputElement>document.getElementById(this.expenseCostHT[i])).value + +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[i])).value ;
  }


  deleteExpenseById(value: number) {
    this._service.deleteOneExpense(value).subscribe(
      data => {
        console.log("delete expense effectué");
      },
      error => {
        console.log("erreur delete expense non-effectué")
      }
    )
    window.location.reload();
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

  updateExpense(indexOfElement: number) {

    this._service.selectOneExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.expenseToUpdate = data1;
        this.updatedExpense.id = this.expenseToUpdate.id;
        this.updatedExpense.collaboratorId = this.expenseToUpdate.collaboratorId;
        this._service.selectTypeExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseType[indexOfElement])).value).subscribe(
          data2 => {
            this.newTypeExpense = data2;
            this.updatedExpense.typeExpense = this.newTypeExpense || this.expenseToUpdate.typeExpense
            this.newDateExpense = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateExpense[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';
            this.newDateRequest = this.pipeDate.transform(this.expenseToUpdate.dateRequest, 'yyyy-MM-dd') || '2000-02-14';
            this.updatedExpense.billable = !(<HTMLInputElement>document.getElementById(this.expenseBillable[indexOfElement])).value || this.expenseToUpdate.billable;;
            this.updatedExpense.status = (<HTMLInputElement>document.getElementById(this.expenseStatus[indexOfElement])).value || this.expenseToUpdate.status;
            this.updatedExpense.costHT = +(<HTMLInputElement>document.getElementById(this.expenseCostHT[indexOfElement])).value || this.expenseToUpdate.costHT;
            this.updatedExpense.costTVA = +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[indexOfElement])).value || this.expenseToUpdate.costTVA;
            this.updatedExpense.costTTC = this.updatedExpense.costHT + this.updatedExpense.costTVA || this.expenseToUpdate.costTTC;
            this.TTCvalue = this.updatedExpense.costTTC;
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
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )

  }

}
