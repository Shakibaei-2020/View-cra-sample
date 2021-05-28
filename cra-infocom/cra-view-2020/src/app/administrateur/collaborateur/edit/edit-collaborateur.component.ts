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
export class EditCollaborateurComponent implements OnInit{


    collaborateur = new Collaborator();
    updatedCollaborateur = new Collaborator();


    expenses !: Expense[];
    updatedExpense = new Expense();
    expense = new Expense();


    leaves !: Leave[];
    updatedLeave = new Leave();
    leave = new Leave();
  


  constructor(private _service:NgserviceService, private _route:Router) { 
    

  }




  searchOneCollab(){

  
    }

    
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
    this.updatedCollaborateur.typeCollaborator = this.collaborateur.typeCollaborator;

    this._service.updateCollab(this.updatedCollaborateur).subscribe(
      data =>{
        console.log("ajout effectué");
        this._route.navigate(['listCollab']);
      },
      error =>{
        console.log("erreur ajout non-effectué")
      }
    )
  }

  deleteCollab(){
    this._service.deleteCollab(this.collaborateur).subscribe(
      data =>{
        console.log("delete effectué");
        this._route.navigate(['listCollab']);
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
          this._route.navigate(['listCollab']);
        },
        error =>{
          console.log("erreur update expense non-effectué")
        }
      )
      }
  
  
    deleteExpenseFromCollab(value :any) {
      console.log(value);
      this.expense.id = value;
      this._service.deleteOneExpense(this.expense).subscribe(
        data =>{
          console.log("delete expense effectué");
          this._route.navigate(['listCollab']);
        },
        error =>{
          console.log("erreur delete expense non-effectué")
        }
      )
      }
  

    /** Leaves commands */

  updateLeaveFromCollab(value :number) {
    console.log(value);
    this.updatedLeave.id = value;
    this._service.addOneLeaveRequest(this.updatedLeave).subscribe(
      data =>{
        console.log("update leave effectué");
      },
      error =>{
        console.log("erreur update leave non-effectué")
      }
    )
    }


  deleteLeaveFromCollab(value :any) {
    console.log(value);
    this.leave.id = value;
    this._service.deleteOneLeaveRequest(this.leave).subscribe(
      data =>{
        console.log("delete leave effectué");
      },
      error =>{
        console.log("erreur delete leave non-effectué")
      }
    )
    }

  





}
