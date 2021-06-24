import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/z-model/Expense/expense';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';
import { DatePipe } from '@angular/common';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { TypeCollaboratorService } from 'src/app/y-service/Collaborator/type-collaborator.service';
import { ExpenseService } from 'src/app/y-service/Expense/expense.service';
import { TypeExpenseService } from 'src/app/y-service/Expense/type-expense.service';
import { LeaveService } from 'src/app/y-service/Leave/leave.service';
import { TypeLeaveService } from 'src/app/y-service/Leave/type-leave.service';

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})
export class EditCollaborateurComponent implements OnInit {


  collaborateur = new Collaborator();
  expenses !: Expense[];
  expense = new Expense();
  leaves !: Leave[];
  leave = new Leave();
  nullDate = new Date(0);
  pipeDate = new DatePipe('fr-FR');

  constructor(
    private _service: NgserviceService,
    private _route: Router,

    private _CollaboratorService: CollaboratorService,
    private _TypeCollaboratorService: TypeCollaboratorService,

    private _ExpenseService: ExpenseService,
    private _TypeExpenseService: TypeExpenseService,


    private _LeaveService: LeaveService,
    private _TypeLeaveService: TypeLeaveService,

  ) { }



  allTypeCollaborator!: TypeCollaborator[];
  typeCollaborator = new TypeCollaborator();



  /** Collaborateur data */
  firstNameCollab!: string;
  dateEntryCollab!: string;
  dateOutCollab!: string;
  lastNameCollab!: string;
  emailCollab!: string;
  typeCollab!: string;

  /** Expense-[i] data */
  expenseRequestId = new Array();
  dateExpense = new Array();
  expenseBillable = new Array();
  expenseCostHT = new Array();
  expenseCostTVA = new Array();
  dateExpenseRequest = new Array();
  expenseStatus = new Array();
  expenseType = new Array();
  newCostTTC = new Array();

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
  joursEntiers = new Array();

  allLeaveType!: TypeLeave[];

  allExpenseType!: TypeExpense[];

  status = ["en-cours", "validé", "refusé"]


  ngOnInit() {


    /**  Collaborator info*/
    this._CollaboratorService.selectOneCollabById(2).subscribe(
      data => {
        this.collaborateur = data;

        this.collaborateur.oldDateOfEntry = this.pipeDate.transform(data.dateOfEntry, 'yyyy-MM-dd') || '2000-02-14';
        this.collaborateur.oldDateOfRelease = this.pipeDate.transform(data.dateOfRelease, 'yyyy-MM-dd') || '2000-02-14';

        this._TypeCollaboratorService.selectTypeCollaboratorById(this.collaborateur.typeCollaborator.id).subscribe(
          data => this.typeCollaborator = data,
          error => console.log("exception" + error)
        )
      },

      error => console.log("exception" + error)
    )

    /**select All Type of collaborators */
    this._TypeCollaboratorService.selectAllTypeCollaborator().subscribe(
      data => this.allTypeCollaborator = data,
      error => console.log("exception" + error)
    )


    /** get all collaborator data input  */

    this.firstNameCollab = "firstNameCollab";
    this.lastNameCollab = "lastNameCollab";
    this.emailCollab = "emailCollab";
    this.dateEntryCollab = "dateEntryCollab";
    this.dateOutCollab = "dateOutCollab";
    this.typeCollab = "typeCollab";


    /** get all request data input */
    this._ExpenseService.listExpenseByCollabId(2).subscribe(
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


      },
      error => console.log("exception" + error)
    )
    /** select all type Expense */
    this._TypeExpenseService.selectAllTypeExpense().subscribe(
      data => this.allExpenseType = data,
      error => console.log("exception" + error)
    )



    /** get all Leave request input */
    this._LeaveService.selectLeaveByCollabId(2).subscribe(
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
          this.joursEntiers.push("joursEntiers-" + i)
        }

        this.leaves.forEach(
          (item) => {
            this._CollaboratorService.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
                  item.oldDateOfStartLeave = this.pipeDate.transform(item.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
                  item.oldDateOfEndLeave = this.pipeDate.transform(item.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';

                  if (item.clientInformed == true) {
                    item.clientInformedFR = "oui";
                  } else if (item.clientInformed == false) {
                    item.clientInformedFR = "non";
                  }
                }
              },
              error => console.log("exception" + error)
            )
          }
        )


      },
      error => console.log("exception" + error)
    )


    /** on recupere tous les types de congé*/
    this._TypeLeaveService.selectAllLeaveType().subscribe(
      data => this.allLeaveType = data,
      error => console.log("exception" + error)
    )
  }

  /** Collab commands */
  collaboratorToUpdate = new Collaborator();
  updatedCollaborator = new Collaborator();
  newDateEntry!: string;
  newDateOut!: string;
  idOfCollType!: number
  newTypeCollab = new TypeCollaborator();

  updateCollab() {

    /** id du collaborateur a recup */
    this._CollaboratorService.selectOneCollabById(this.collaborateur.id).subscribe(
      data1 => {
        this.collaboratorToUpdate = data1;

        this.updatedCollaborator.id = this.collaboratorToUpdate.id;

        this._TypeCollaboratorService.selectTypeCollaboratorById(+(<HTMLInputElement>document.getElementById(this.typeCollab)).value).subscribe(

          data2 => {
            this.newTypeCollab = data2;

            this.updatedCollaborator.firstName = (<HTMLInputElement>document.getElementById(this.firstNameCollab)).value || this.collaboratorToUpdate.firstName;
            this.updatedCollaborator.lastName = (<HTMLInputElement>document.getElementById(this.lastNameCollab)).value || this.collaboratorToUpdate.lastName;
            this.updatedCollaborator.email = (<HTMLInputElement>document.getElementById(this.emailCollab)).value || this.collaboratorToUpdate.email;
            this.newDateEntry = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEntryCollab)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.collaboratorToUpdate.dateOfEntry, 'yyyy-MM-dd') || '14-02-2000';
            this.newDateOut = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateOutCollab)).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.collaboratorToUpdate.dateOfRelease, 'yyyy-MM-dd') || '14-02-2000';
            this.updatedCollaborator.password = this.collaboratorToUpdate.password;
            this.updatedCollaborator.typeCollaborator = this.newTypeCollab || this.updatedCollaborator.typeCollaborator;

            this._CollaboratorService.addCollab(this.updatedCollaborator, this.newDateEntry, this.newDateOut).subscribe(
              data => {
                console.log("ajout effectué");
              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
            window.location.reload();
          },
          error => console.log("exception " + error)
        )
      },
      error => console.log("exception" + error)
    )
  }

  /** delete collaborateur by id */
  deleteCollab() {
    this._CollaboratorService.deleteCollabById(this.collaborateur.id).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }


  /** Expense commands */
  selectedExpense = new Expense();
  updatedExpense = new Expense();
  newDateRequest!: string;
  newDateExpense!: string;
  index!: number;
  date = new Date();
  expenseToUpdate = new Expense();
  newTypeExpense = new TypeExpense();

  /** expense  */
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


  /** Delete expense by id */
  deleteExpenseById(value: number) {
    this._ExpenseService.deleteOneExpense(value).subscribe(
      data => {
        console.log("delete expense effectué");
      },
      error => {
        console.log("erreur delete expense non-effectué")
      }
    )
    window.location.reload();
  }


  /** Leaves commands */

  leaveRequestToUpdated = new Leave();
  updatedLeave = new Leave();

  dateOfDemandLeave!: string;
  dateOfStartLeave!: string;
  dateOfEndLeave!: string;

  newTypeLeave = new TypeLeave();

  updateLeaveFromCollab(indexOfElement: number) {

    this._LeaveService.selectOneLeaveRequestById(+(<HTMLInputElement>document.getElementById(this.leaveRequestId[indexOfElement])).value).subscribe(
      data1 => {
        this.leaveRequestToUpdated = data1;

        this.updatedLeave.id = this.leaveRequestToUpdated.id;
        this.updatedLeave.collaboratorId = this.leaveRequestToUpdated.collaboratorId;

        this._TypeLeaveService.selectLeaveTypeById(+(<HTMLInputElement>document.getElementById(this.leaveType[indexOfElement])).value).subscribe(
          data2 => {
            this.newTypeLeave = data2;

            this.updatedLeave.leaveType = this.newTypeLeave || this.leaveRequestToUpdated.leaveType

            this.dateOfStartLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfStartLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfEndLeave = this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.pipeDate.transform(this.leaveRequestToUpdated.dateOfEndLeave, 'yyyy-MM-dd') || '2000-02-14';
            this.dateOfDemandLeave = this.pipeDate.transform(this.leaveRequestToUpdated.dateOfDemand, 'yyyy-MM-dd') || '2000-02-14';

            this.updatedLeave.clientInformed = (<HTMLInputElement>document.getElementById(this.leaveClientInformed[indexOfElement])).value === "true" ? true : false;




            this.updatedLeave.statusDebut = (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[indexOfElement])).value || this.leaveRequestToUpdated.statusDebut;
            this.updatedLeave.statusFin = (<HTMLInputElement>document.getElementById(this.leaveStatusFin[indexOfElement])).value || this.leaveRequestToUpdated.statusFin;
            this.updatedLeave.status = (<HTMLInputElement>document.getElementById(this.leaveStatus[indexOfElement])).value || this.leaveRequestToUpdated.status
            this.updatedLeave.nbJours = this.dayNumber || this.leaveRequestToUpdated.nbJours;

            this._LeaveService.addOrUpdateLeaveRequest(this.updatedLeave, this.dateOfDemandLeave, this.dateOfStartLeave, this.dateOfEndLeave).subscribe(
              data => {
                console.log("ajout effectué");
                window.location.reload();

              },
              error => {
                console.log("erreur ajout non-effectué")
              }
            )
          },
          error => console.log("exception" + error),
        )
      },
      error => console.log("exception" + error),
    )

  }

  deleteLeaveFromCollab(value: any) {
    this._LeaveService.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete leave effectué");
      },
      error => {
        console.log("erreur delete leave non-effectué")
      }
    )
    window.location.reload();
  }

  dayNumber!: number;
  newDateStartLeave!: Date;
  newDateEndLeave!: Date;

  howManyday(indexOfElement: number) {
    this.newDateStartLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateStartLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfStartLeave)
    this.newDateEndLeave = new Date(this.pipeDate.transform((<HTMLInputElement>document.getElementById(this.dateEndLeave[indexOfElement])).valueAsDate, 'yyyy-MM-dd') || this.dateOfEndLeave)
    var Diff_temps = this.newDateEndLeave.getTime() - this.newDateStartLeave.getTime();
    this.dayNumber = Diff_temps / (1000 * 3600 * 24);
  }


  goToSearch() {
    this._route.navigate(['/searchCollaborateur']);
  }

  joursEntiersChecked(i: number) {

    if (((<HTMLInputElement>document.getElementById(this.joursEntiers[i])).checked) === true) {
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).value = "";

      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).disabled = true;
      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).value = "";

    } else {
      (<HTMLInputElement>document.getElementById(this.leaveStatusDebut[i])).disabled = false;
      (<HTMLInputElement>document.getElementById(this.leaveStatusFin[i])).disabled = false;
    }
  }


  TTCvalue!: number;
  updateTTC(i: number) {
    this.TTCvalue = +(<HTMLInputElement>document.getElementById(this.expenseCostHT[i])).value + +(<HTMLInputElement>document.getElementById(this.expenseCostTVA[i])).value;
  }



  
}
