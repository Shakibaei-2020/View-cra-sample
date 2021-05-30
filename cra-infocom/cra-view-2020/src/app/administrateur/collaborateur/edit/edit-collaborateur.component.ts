import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import { Collaborator } from 'src/app/z-model/collaborator';
import { Subscription } from 'rxjs';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/z-model/expense';
import { Leave } from 'src/app/z-model/leave';

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})
export class EditCollaborateurComponent implements OnInit {


    collaborateur = new Collaborator();
    updatedCollaborateur = new Collaborator();


    expenses !: Expense[];
    updatedExpense = new Expense();
    expense = new Expense();


    leaves !: Leave[];
    updatedLeave = new Leave();
    leave = new Leave();

    date1 = new Date();
    date2 = new Date();
  
    nullDate = new Date(0);




  constructor(private _service:NgserviceService, private _route:Router) { }





  ngOnInit() {



    this._service.selectOneCollabById(2).subscribe(
      data=> this.collaborateur = data,
      error=>console.log("exception" +error)
      )

      this._service.listExpenseByCollabId(2).subscribe(
        data=> this.expenses= data,
        error=>console.log("exception" +error)
        )

        this._service.selectLeaveByCollabId(2).subscribe(
          data=> this.leaves= data,
          error=>console.log("exception" +error)
          )

  }

  

  /** Collab commands */
  updateCollab(){

    this.updatedCollaborateur.id = this.collaborateur.id;
    this.updatedCollaborateur.passward = this.collaborateur.passward;
    this.updatedCollaborateur.typeCollaboratorId = this.collaborateur.typeCollaboratorId;



    this._service.addCollab(this.updatedCollaborateur,this.date1,this.date2).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }
  

  deleteCollab(){
    this._service.deleteCollabById(this.collaborateur.id).subscribe(
      data =>{
        console.log("delete effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

    /** Expense commands */


    updateExpenseFromCollab(value :any) {
      console.log(value);
      this.updatedExpense.id = value;
      this._service.addOneExpense(this.updatedExpense).subscribe(
        data =>{
          console.log("update expense effectué");
        },
        error =>{
          console.log("erreur update expense non-effectué")
        }
      )
      }
  
  
    deleteExpenseFromCollab(value :any) {
      console.log(value);
      this.expense.id = value;
      this._service.deleteOneExpense(this.expense.id).subscribe(
        data =>{
          console.log("delete expense effectué");
        },
        error =>{
          console.log("erreur delete expense non-effectué")
        }
      )
      }
  

    /** Leaves commands */

    dateLeaveRequest = new Date();
    dateStartLeave = new Date();
    dateEndLeave = new Date();

  updateLeaveFromCollab(value :number) {
    console.log(value);
    this.updatedLeave.id = value;
    this._service.addOrUpdateLeaveRequest(this.updatedLeave, this.dateLeaveRequest,this.dateStartLeave,this.dateEndLeave).subscribe(
      data =>{
        console.log("ajout effectué");
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
    }


  deleteLeaveFromCollab(value :any) {
    console.log(value);
    this.leave.id = value;
    this._service.deleteOneLeaveRequest(this.leave.id).subscribe(
      data =>{
        console.log("delete leave effectué");
      },
      error =>{
        console.log("erreur delete leave non-effectué")
      }
    )
    }
}
