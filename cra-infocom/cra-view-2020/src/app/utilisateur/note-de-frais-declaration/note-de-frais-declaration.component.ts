import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Expense } from 'src/app/z-model/Expense/expense';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';

@Component({
  selector: 'app-note-de-frais-declaration',
  templateUrl: './note-de-frais-declaration.component.html',
  styleUrls: ['./note-de-frais-declaration.component.css']
})
export class NoteDeFraisDeclarationComponent implements OnInit {

  expense = new Expense();
  dateExpense = new Date();
  dateRequest !: string;
  inputedTypeExpense = new TypeExpense();
  typeExpense = new TypeExpense();
  allTypeExpense!: TypeExpense[];
  idOfExpenseType!: number;

  constructor(private _route: Router, private _service: NgserviceService) { }

  ngOnInit(): void {


    /** id du collaborateur connecté suite à la connexion */
    this.expense.collaboratorId = 2;


    /** on recupere tous les types d'expense pour le <select> */
    this._service.selectAllTypeExpense().subscribe(
      data => this.allTypeExpense = data,
      error => console.log("exception" + error)
    )

    /** date request mis à la date d'aujourd'hui */
    this.dateRequest = this.formatageDate()
  }


  /** On recupere l'expense selectioné a chaque <select> */
  getExpenseType(){
    console.log(this.idOfExpenseType)
    this._service.selectTypeExpenseById(this.idOfExpenseType).subscribe(
      data => { this.typeExpense = data; },
      error => console.log("exception" + error),
    )
    setTimeout(() => {
      console.log(this.typeExpense)
    }, 50);
  }

  /** Ajout de la note de frais */
  addExpense() {
    this.expense.status = 'en-cours';
    this.expense.typeExpense = this.typeExpense;
    this._service.addAndUpdateExpense(this.expense, this.dateExpense, this.dateRequest).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
  }

  /** retour vers l'accueil utilisateur */
  retour() {
    this._route.navigate(['/utilisateur']);
  }

  /** formatage de la date YYYY-MM-DD */
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
