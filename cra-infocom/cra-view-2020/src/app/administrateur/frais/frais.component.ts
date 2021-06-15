import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/Expense/expense';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {


  date1!: Date;
  date2!: Date;
  status!: string;
  nbResultat!: number;

  lastNameCollab!: string;

  error!: string;


  public expenses!: Expense[];




  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {
  }
  goToEditFrais() {
    this._route.navigate(['/editFrais']);
  }


  searchExpenses() {

    if ((this.date1 != undefined && this.date2 != undefined) &&  (this.status != undefined  && this.status != "") &&  (this.lastNameCollab != undefined && this.lastNameCollab != "")) {

    this._service.searchExpense(this.date1, this.date2, this.status,this.lastNameCollab).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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

    console.log("s  ")

  }else if((this.date1 != undefined  && this.date2 != undefined) && (this.status === undefined || this.status === "" ) && (this.lastNameCollab === undefined || this.lastNameCollab === "")){

    this._service.searchExpenseByDate(this.date1, this.date2).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";


  }else if((this.date1 != undefined && this.date2 != undefined) && (this.status === undefined || this.status === "") && (this.lastNameCollab != undefined && this.lastNameCollab != "")){

    this._service.searchExpenseByDateName(this.date1, this.date2, this.lastNameCollab).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";


  }else if((this.date1 != undefined || this.date2 != undefined) && (this.status != undefined && this.status != "" ) && (this.lastNameCollab === undefined || this.lastNameCollab === "")){

    this._service.searchExpenseByDateStatus(this.date1, this.date2, this.status).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";


  }else if((this.date1 === undefined || this.date2 === undefined) && this.status === undefined && this.lastNameCollab != undefined){

    this._service.searchExpenseByName(this.lastNameCollab).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";


  }else if((this.date1 === undefined || this.date2 === undefined) && this.status != undefined && (this.lastNameCollab === undefined || this.lastNameCollab === "")){

    this._service.searchExpenseByStatus(this.status).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
  }else if((this.date1 === undefined || this.date2 === undefined) && this.status != undefined && (this.lastNameCollab != undefined)){
    this._service.searchExpenseByNameStatus(this.status,this.lastNameCollab).subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";


  }else if((this.date1 === undefined && this.date2 === undefined) && this.status === undefined && (this.lastNameCollab === undefined)){
    this._service.searchAllExpense().subscribe(
      data => {
        this.expenses = data;
        this.nbResultat = this.expenses.length;

        this.expenses.forEach(
          (item) => {
            this._service.selectOneCollabById(item.collaboratorId).subscribe(
              data => {
                if (item != null) {
                  item.nomCollab = data.lastName;
                  item.prenomCollab = data.firstName;
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
    this.status = "";
    this.error= "";

  }else{
    this.error = "Un problème est survenue, merci de vérifier que les deux champs dates  ont été bien remplies.";
    this.nbResultat = 0;

  }





  }


  goToAccueil(){
    this._route.navigate(['/administrateur']);

  }

}
