import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/z-model/Expense/expense';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';
import { DatePipe } from '@angular/common';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})
export class EditCollaborateurComponent implements OnInit {


  collaborateur = new Collaborator();
  updatedCollaborateur = new Collaborator();


  expenses !: Expense[];
  expense = new Expense();


  leaves !: Leave[];
  leave = new Leave();

  date1 = new Date();
  date2 = new Date();

  nullDate = new Date(0);




  constructor(private _service: NgserviceService, private _route: Router) { }



  allTypeCollaborator!: TypeCollaborator[];
  updatedCollaborator = new Collaborator();
  typeCollaborator = new TypeCollaborator();



  /** Expense-[i] data */
  dateExpense = new Array();
  expenseBillable = new Array();
  expenseCostHT = new Array();
  expenseCostTVA = new Array();
  expenseStatus = new Array();
  expenseRequestId = new Array();

  /** leave-[i] data */
  leaveRequestId = new Array();
  leaveType = new Array();
  leaveStatus = new Array();
  leaveClientInformed = new Array();
  leaveStatusDebut = new Array();
  dateLeaveRequest = new Array();
  dateStartLeave = new Array();
  dateEndLeave = new Array();
  leaveStatusFin = new Array();

  allLeaveType!: TypeLeave[];
  status = ["en-cours", "validé", "refusé"]


  ngOnInit() {

    /**  */

    this._service.selectOneCollabById(2).subscribe(
      data => {
        this.collaborateur = data;

        this._service.selectTypeCollaboratorById(this.collaborateur.typeCollaborator.id).subscribe(
          data => this.typeCollaborator = data,
          error => console.log("exception" + error)
        )
      },

      error => console.log("exception" + error)
    )

    this._service.selectAllTypeCollaborator().subscribe(
      data => this.allTypeCollaborator = data,
      error => console.log("exception" + error)
    )

    /** Expense request */
    this._service.listExpenseByCollabId(2).subscribe(
      data => {
        this.expenses = data;

        for (var i = 0; i < this.expenses.length; i++) {

          this.expenseRequestId.push("expenseRequestId-" + i);
          this.dateExpense.push("dateExpense-" + i);
          this.expenseBillable.push("expenseBillable-" + i);
          this.expenseCostHT.push("expenseCostHT-" + i);
          this.expenseCostTVA.push("expenseCostTVA-" + i);
          this.expenseStatus.push("expenseStatus-" + i);
        }
      },
      error => console.log("exception" + error)
    )

    /** Leave request */
    this._service.selectLeaveByCollabId(2).subscribe(
      data => {
        this.leaves = data;

        for (var i = 0; i < this.leaves.length; i++) {

          this.leaveRequestId.push("leaveRequestId-" + i);
          this.leaveType.push("leaveType-" + i);
          this.leaveStatus.push("leaveStatus-" + i);
          this.leaveClientInformed.push("leaveClientInformed-" + i);
          this.leaveStatusDebut.push("leaveStatusDebut-" + i);
          this.dateLeaveRequest.push("dateLeaveRequest-" + i);
          this.dateStartLeave.push("dateStartLeave-" + i);
          this.dateEndLeave.push("dateEndLeave-" + i);
          this.leaveStatusFin.push("leaveStatusFin-" + i);

        }
      },
      error => console.log("exception" + error)
    )


    /** on recupere tous les types */
    this._service.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )


  }



  /** Collab commands */
  updateCollab() {


    this.updatedCollaborator.typeCollaborator = this.collaboratorType;

    this._service.addCollab(this.updatedCollaborator, this.date1, this.date2).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteCollab() {
    this._service.deleteCollabById(this.collaborateur.id).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

  idOfCollType!: number;
  collaboratorType = new TypeCollaborator();

  getCollType() {
    this._service.selectTypeCollaboratorById(this.idOfCollType).subscribe(
      data => { this.collaboratorType = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
    }, 50);
  }

  /** Expense commands */
  pipeDate = new DatePipe('fr-FR');



  selectedExpense = new Expense();
  updatedExpense = new Expense();
  newDateRequest!: string;
  newDateExpense!: string;

  index!: number;

  date = new Date();

  expenseToUpdate = new Expense();


  updateExpenseFromCollab(indexOfElement: number) {

    this._service.selectOneExpenseById(+(<HTMLInputElement>document.getElementById(this.expenseRequestId[indexOfElement])).value).subscribe(
      data => {
        this.expenseToUpdate = data;

        this.updatedExpense.id = this.expenseToUpdate.id;
        this.updatedExpense.collaboratorId = this.expenseToUpdate.collaboratorId;
        this.newDateRequest = this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';
        this.newDateExpense = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateExpense[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';
        this.updatedExpense.billable = !(<HTMLInputElement>document.getElementById(this.expenseBillable[indexOfElement])) || this.expenseToUpdate.billable;
        this.updatedExpense.costHT = +(<HTMLInputElement>document.getElementById(this.expenseCostHT[indexOfElement])).value || this.expenseToUpdate.costHT;
        this.updatedExpense.costTVA = +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[indexOfElement])).value || this.expenseToUpdate.costTVA;
        this.updatedExpense.status = (<HTMLInputElement>document.getElementById(this.expenseStatus[indexOfElement])).value || this.expenseToUpdate.status;;

        this._service.addAndUpdateExpense(this.updatedExpense, this.newDateExpense, this.newDateRequest).subscribe(
          data => {
            console.log("mise à jour effectué");
          },
          error => {
            console.log("erreur maj non-effectué")
          }
        )
        window.location.reload();
      },
      error => console.log("exception" + error),
    )
  }

  deleteExpenseFromCollab(value: number) {
    this._service.deleteOneExpense(value).subscribe(
      data => {
        console.log("delete expense effectué");
      },
      error => {
        console.log("erreur delete expense non-effectué")
      }
    )
  }


  /** Leaves commands */

  leaveRequestToUpdated = new Leave();
  updatedLeave = new Leave();

  dateOfDemandLeave!: string;
  dateOfStartLeave!: string;
  dateOfEndLeave!: string;

  newTypeLeave = new TypeLeave();

  updateLeaveFromCollab(indexOfElement: number) {


    this._service.selectOneLeaveRequestById(+(<HTMLInputElement>document.getElementById(this.leaveRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.leaveRequestToUpdated = data1;

        this.updatedLeave.id = this.leaveRequestToUpdated.id;
        this.updatedLeave.collaboratorId = this.leaveRequestToUpdated.collaboratorId;

        this._service.selectLeaveTypeById(+(<HTMLInputElement>document.getElementById(this.leaveType[indexOfElement])).value).subscribe(
          data2 => {
            this.newTypeLeave = data2;

            this.updatedLeave.leaveType =    this.newTypeLeave || this.leaveRequestToUpdated.leaveType
  
            this.dateOfStartLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfEndLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfDemandLeave = this.pipeDate.transform(this.expenseToUpdate.dateExpense, 'yyyy-MM-dd') || '2000-02-14';

            this.updatedLeave.clientInformed = !(<HTMLInputElement>document.getElementById(this.leaveClientInformed[indexOfElement])).value || this.leaveRequestToUpdated.clientInformed
            this.updatedLeave.statusDebut = (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[indexOfElement])).value || this.leaveRequestToUpdated.statusDebut
            this.updatedLeave.statusFin = (<HTMLInputElement>document.getElementById(this.leaveStatusFin[indexOfElement])).value || this.leaveRequestToUpdated.statusFin
            this.updatedLeave.status = (<HTMLInputElement>document.getElementById(this.leaveStatus[indexOfElement])).value || this.leaveRequestToUpdated.statusFin

            this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemandLeave, this.dateOfStartLeave, this.dateOfEndLeave).subscribe(
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

  deleteLeaveFromCollab(value: any) {
    this._service.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete leave effectué");
      },
      error => {
        console.log("erreur delete leave non-effectué")
      }
    )
  }


}
