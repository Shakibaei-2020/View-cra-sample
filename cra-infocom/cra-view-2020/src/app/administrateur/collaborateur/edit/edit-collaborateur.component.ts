import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/z-model/Expense/expense';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';
import { DatePipe } from '@angular/common';

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
  dateExpenseRequest = new Array();
  dateExpense = new Array();
  expenseBillable= new Array();
  expenseCostHT= new Array();
  expenseCostTVA= new Array();
  expenseStatus= new Array();

  /** leave-[i] data */
  leaveDateOfDemand = new Array();
  leaveDateOfStart= new Array();
  leaveDateOfEnd= new Array();
  leaveStatus= new Array();
  leaveInformed= new Array();

  ngOnInit() {

    /**  */

    this._service.selectOneCollabById(2).subscribe(
      data => {
        this.collaborateur = data;
        console.log(this.collaborateur.passward);

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

    this._service.listExpenseByCollabId(2).subscribe(
      data => this.expenses = data,
      error => console.log("exception" + error)
    )

    this._service.selectLeaveByCollabId(2).subscribe(
      data => this.leaves = data,
      error => console.log("exception" + error)
    )


    /** au lieu de 30 avoir la taille du tableau Expense*/
    for (var i = 0; i < 30; i++) {
    this.dateExpenseRequest.push("dateExpenseRequest-" + i);
    this.dateExpense.push("dateExpense-" + i);
    this.expenseBillable.push("expenseBillable-" + i);
    this.expenseCostHT.push("expenseCostHT-" + i);
    this.expenseCostTVA.push("expenseCostTVA-" + i);
    this.expenseStatus.push("expenseStatus-" + i);
    }

  /** au lieu de 30 avoir la taille du tableau Leave*/
  for (var i = 0; i < 30; i++) {

    this.leaveDateOfDemand.push("leaveDateOfDemand-" + i); 
    this.leaveDateOfStart.push("leaveDateOfStart-" + i);
    this.leaveDateOfEnd.push("leaveDateOfEnd-" + i);
    this.leaveStatus.push("leaveStatus-" + i);
    this.leaveInformed.push("leaveInformed-" + i);
  }


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



  selectedExpense = new Expense();
  updatedExpense= new Expense();
  newDateRequest!: Date;
  newDateExpense!: Date;

  updateExpenseFromCollab() {

    /**  
      this.updatedExpense.id = 192;
      this.newDateRequest = (<HTMLInputElement>document.getElementById(this.dateExpenseRequest[0])).valueAsDate;
      this.newDateExpense =  (<HTMLInputElement>document.getElementById(this.dateExpense[0])).valueAsDate;
      this.updatedExpense.billable =  (<HTMLInputElement>document.getElementById(this.expenseBillable[0])).defaultValue;
      this.updatedExpense.costHT =  (<HTMLInputElement>document.getElementById(this.expenseCostHT[0])).valueAsNumber;
      this.updatedExpense.costTVA =  (<HTMLInputElement>document.getElementById(this.expenseCostTVA[0])).valueAsNumber;
      this.updatedExpense.status =  (<HTMLInputElement>document.getElementById(this.expenseStatus[0])).value;

      this._service.addAndUpdateExpense(this.updatedExpense,this.newDateExpense,this.newDateRequest).subscribe(
        data =>{
          console.log("ajout effectué");
        },
        error =>{
          console.log("erreur ajout non-effectué")
        }
      )
    window.location.reload();
 */
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


  
  updatedLeave= new Leave();

  dateLeaveRequest!: string;
  dateStartLeave!: Date;
  dateEndLeave!: Date;

  updateLeaveFromCollab() {

    /**  
      this.updatedLeave.id = 192;
      this.dateLeaveRequest = (<HTMLInputElement>document.getElementById(this.leaveDateOfDemand[0])).valueAsDate;
      this.dateStartLeave =  (<HTMLInputElement>document.getElementById(this.leaveDateOfStart[0])).valueAsDate;
      this.dateEndLeave = (<HTMLInputElement>document.getElementById(this.leaveDateOfEnd[])).valueAsDate;

      this.updatedLeave.clientInformed =  (<HTMLInputElement>document.getElementById(this.leaveInformed[0])).defaultValue;
      this.updatedLeave.status =  (<HTMLInputElement>document.getElementById(this.leaveStatus[0])).valueAsNumber;

       this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateLeaveRequest, this.dateStartLeave, this.dateEndLeave).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
    window.location.reload();
*/
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
