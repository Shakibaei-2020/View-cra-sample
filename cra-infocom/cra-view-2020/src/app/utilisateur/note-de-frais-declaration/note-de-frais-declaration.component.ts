import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/y-service/Activity/activity.service';
import { ExpenseService } from 'src/app/y-service/Expense/expense.service';
import { TypeExpenseService } from 'src/app/y-service/Expense/type-expense.service';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Activity } from 'src/app/z-model/Activity/activity';
import { Expense } from 'src/app/z-model/Expense/expense';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { CollaboratorService } from 'src/app/y-service/Collaborator/collaborator.service';
import { FeedBack } from 'src/app/z-model/feed-back';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-note-de-frais-declaration',
  templateUrl: './note-de-frais-declaration.component.html',
  styleUrls: ['./note-de-frais-declaration.component.css']
})
export class NoteDeFraisDeclarationComponent implements OnInit {

  expense = new Expense();
  dateExpense!: string;
  dateRequest !: string;
  inputedTypeExpense = new TypeExpense();
  typeExpense = new TypeExpense();
  allTypeExpense!: TypeExpense[];
  idOfExpenseType!: number;

  expensesOfCollab!: Expense[];

  constructor(
    private _route: Router,
    private _ExpenseService: ExpenseService,
    private _TypeExpenseService: TypeExpenseService,
    private _ActivityService: ActivityService,
    private _CollaboratorService: CollaboratorService,


  ) { }
  pipeDate = new DatePipe('fr-FR');

  monthSelected!: number;
  yearSelected!: number;


  nbActivityWithId = new Array();
  allActivityToEdit!: Activity[];

  valueOfDaysActivity1 = new Array();
  activity1ToEdit!: Activity[];

  valueOfDaysActivity2 = new Array();
  activity2ToEdit!: Activity[];


  valueOfDaysActivity3 = new Array();
  activity3ToEdit!: Activity[];


  valueOfDaysActivity4 = new Array();
  activity4ToEdit!: Activity[];


  aujourdhui = new Date();

  totalActivity1 = 0;
  totalActivity2 = 0;
  totalActivity3 = 0;
  totalActivity4 = 0;
  allSumDays = new Array();
  totalofTotal = 0;

  /** expense */
  expenseRequestId = new Array();
  dateExpenseToUpdated = new Array();
  expenseBillable = new Array();
  expenseCostHT = new Array();
  expenseCostTVA = new Array();
  dateExpenseRequest = new Array();
  expenseStatus = new Array();
  expenseType = new Array();
  newCostTTC = new Array();


  ngOnInit(): void {




    this.monthSelected = this.aujourdhui.getMonth() + 1;
    this.yearSelected = this.aujourdhui.getFullYear();


    this.tabJours = [];
    this.newDate.setMonth(this.monthSelected - 1);
    this.newDate.setFullYear(this.yearSelected)
    this.month = this.newDate.getMonth() + 1;
    this.year = this.newDate.getFullYear();
    this.day = this.newDate.getDay();
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
    }

    /** id du collaborateur connecté suite à la connexion */
    this.expense.collaboratorId = 2;

    /** select all expense en-cours */
    this._ExpenseService.listExpenseByCollabId(2).subscribe(
      data => {
        this.expensesOfCollab = data;

        this.expensesOfCollab.forEach(
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
      error => console.log("exception " + error),
    )

    /** on recupere tous les types d'expense pour le <select> */
    this._TypeExpenseService.selectAllTypeExpense().subscribe(
      data => this.allTypeExpense = data,
      error => console.log("exception" + error)
    )

    this.selectAllActivitys()

    /** date request mis à la date d'aujourd'hui */
    this.dateRequest = this.formatageDate()

  }

  panierRepas!: number;
  selectAllActivitys() {
    this.nbActivityWithId = [];
    this.allActivityToEdit = [];
    this._ActivityService.activityGroupByProject(this.monthSelected, this.yearSelected, this.expense.collaboratorId).subscribe(
      data => {
        this.allActivityToEdit = data;
        for (var i = 0; i < this.allActivityToEdit.length; i++) {
          this.nbActivityWithId.push(this.allActivityToEdit[i].projectId);
        }
        this.activity1Info();
        this.activity2Info();
        this.activity3Info();
        this.activity4Info();
      }
    )
  }

  getTotalFromActivity1!: number;
  activity1Info() {
    this.valueOfDaysActivity1 = [];
    if (this.nbActivityWithId[0] !== undefined) {
      this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearSelected, this.expense.collaboratorId, this.nbActivityWithId[0]).subscribe(
        data => {
          this.activity1ToEdit = data;
          for (var i = 0; i < this.tabJours.length; i++) {
            this.valueOfDaysActivity1.push(this.activity1ToEdit[i].duration);
          }
          this.calculeTotalActivity1(this.valueOfDaysActivity1);
        },
        error => console.log("exception" + error)
      )
    }
  }

  activity2Info() {
    this.valueOfDaysActivity2 = [];
    if (this.nbActivityWithId[1] !== undefined) {
      this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearSelected, this.expense.collaboratorId, this.nbActivityWithId[1]).subscribe(
        data => {
          this.activity2ToEdit = data;
          for (var i = 0; i < this.tabJours.length; i++) {
            this.valueOfDaysActivity2.push(this.activity2ToEdit[i].duration);
          }
          this.calculeTotalActivity2(this.valueOfDaysActivity2);
        },
        error => console.log("exception" + error)
      )
    }

  }

  activity3Info() {
    this.valueOfDaysActivity3 = [];
    if (this.nbActivityWithId[2] !== undefined) {
      this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearSelected, this.expense.collaboratorId, this.nbActivityWithId[2]).subscribe(
        data => {
          this.activity3ToEdit = data;
          for (var i = 0; i < this.tabJours.length; i++) {
            this.valueOfDaysActivity3.push(this.activity3ToEdit[i].duration);
          }
          this.calculeTotalActivity3(this.valueOfDaysActivity3);
        },
        error => console.log("exception" + error)
      )
    }

  }

  activity4Info() {
    this.valueOfDaysActivity4 = [];
    if (this.nbActivityWithId[3] !== undefined) {
      this._ActivityService.searchTheActivityOfCollaboratorOfProject(this.monthSelected, this.yearSelected, this.expense.collaboratorId, this.nbActivityWithId[3]).subscribe(
        data => {
          this.activity4ToEdit = data;
          for (var i = 0; i < this.tabJours.length; i++) {
            this.valueOfDaysActivity4.push(this.activity4ToEdit[i].duration);
          }
          this.calculeTotalActivity4(this.valueOfDaysActivity4);
        },
        error => console.log("exception" + error)
      )
    }
  }



  calculeTotalActivity1(array = new Array) {
    this.totalActivity1 = array.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.allSumDays.push(this.totalActivity1)
    this.CalculeTotalTotal();
  }

  calculeTotalActivity2(array = new Array) {
    this.totalActivity2 = array.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.allSumDays.push(this.totalActivity2)
    this.CalculeTotalTotal();
  }

  calculeTotalActivity3(array = new Array) {
    this.totalActivity3 = array.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.allSumDays.push(this.totalActivity3)
    this.CalculeTotalTotal();
  }

  calculeTotalActivity4(array = new Array) {
    this.totalActivity4 = array.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.allSumDays.push(this.totalActivity4)
    this.CalculeTotalTotal();
  }

  CalculeTotalTotal() {
    this.panierRepas = this.totalActivity1 + this.totalActivity2 + this.totalActivity3 + this.totalActivity4;
  }





  newDate = new Date();
  tabJours!: number[];
  daysInMonth!: number;
  month!: number;
  day!: number;
  year!: number;

  updateDate() {

    this.tabJours = [];
    this.newDate.setMonth(this.monthSelected - 1);
    this.newDate.setFullYear(this.yearSelected)
    this.month = this.newDate.getMonth() + 1;
    this.year = this.newDate.getFullYear();
    this.day = this.newDate.getDay();
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    for (var i = 0; i < this.daysInMonth; i++) {
      this.tabJours[i] = i + 1;
    }

    this.selectAllActivitys();



  }





  /** On recupere l'expense selectioné a chaque <select> */
  getExpenseType() {
    console.log(this.idOfExpenseType)
    this._TypeExpenseService.selectTypeExpenseById(this.idOfExpenseType).subscribe(
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
    this.expense.costTTC = +this.expense.costHT + +this.expense.costTVA;

    this._ExpenseService.addAndUpdateExpense(this.expense, this.dateExpense, this.dateRequest).subscribe(
      data => {
        console.log("ajout effectué");
        window.location.reload();
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


  costTTC!: number;
  updateTTC() {
    this.costTTC = +this.expense.costHT + +this.expense.costTVA;
  }


  fieldArray: Array<any> = [];
  newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }



  fieldArrayJustificatif: Array<any> = [];
  newAttributeJustificatif: any = {};

  addFieldJustificatif() {
    this.fieldArrayJustificatif.push(this.newAttributeJustificatif)
    this.newAttributeJustificatif = {};
  }

  deleteFieldJustificatif(index: number) {
    this.fieldArrayJustificatif.splice(index, 1);
  }





  file = new Blob;

  Envoyer() {


    var costHT = this.expense.costHT.toString();
    var costTVA = this.expense.costTVA.toString();
    var costTTC = ((+this.expense.costHT) + (+this.expense.costTVA)).toString();
    var dateFrais = this.dateExpense.toString();
    var dateRequet = this.dateRequest.toString();
    var billiable = this.expense.billable.toString();
    var natureFrais = this.typeExpense.type;
    var panierRepas = this.panierRepas.toString();
    var statusFrais = "en-cours"

    console.log(costHT)

    var dlActivity1 = {
      content: [
        'First paragraph',
        'costHT : ' + costHT,
        'costTVA : ' + costTVA,
        'costTTC : ' + costTTC,
        'dateFrais : ' + dateFrais,
        'dateRequet :' + dateRequet,
        'billiable : ' + billiable,
        '',
        'natureFrais : ' + natureFrais,

        'statusFrais : ' + statusFrais,
        'panierRepas : ' + panierRepas,
      ]
    }
    const documentDefinition = {};

    pdfMake.createPdf(dlActivity1).getBlob;
  }




  feedBack = new FeedBack;

  EnvoyerMail() {
    this.feedBack.email = "mohashakibaei@outlook.fr";
    this.feedBack.name = "Mohammad";
    this.feedBack.feedback = "salut ca va ?";
    this._CollaboratorService.sendMessage(this.feedBack).subscribe()
  }



  TTCvalue!: number;
  allExpenseType!: TypeExpense[]
  status = ["en-cours", "validé", "refusé"]
  validation = "";
  notValidation = "";


  expenseToUpdate = new Expense;
  updatedExpense = new Expense;


  /** ng Model */
  typeOfExpense = new TypeExpense;
  statusOfExpense!: string;
  billableOfExpense!: boolean;
  costHTOfExpense!: number;
  costTTCOfExpense!: number;
  costTVAOfExpense!: number;
  dateOfExpense!: string;
  dateRequestOfExpense!: Date;



  oldExpense = new Expense;
  onInitModal(expense: Expense) {

    /** select all type Expense */
    this._TypeExpenseService.selectAllTypeExpense().subscribe(
      data => this.allExpenseType = data,
      error => console.log("exception" + error)
    )

    this._ExpenseService.selectOneExpenseById(expense.id).subscribe(
      data => {
        this.oldExpense = data;
        this.typeOfExpense = this.oldExpense.typeExpense;
        this.statusOfExpense = this.oldExpense.status;
        this.billableOfExpense = this.oldExpense.billable;
        this.costHTOfExpense = this.oldExpense.costHT;
        this.costTTCOfExpense = this.oldExpense.costTTC;
        this.costTVAOfExpense = this.oldExpense.costTVA;
        this.dateOfExpense = this.pipeDate.transform(this.oldExpense.dateExpense, 'yyyy-MM-dd') || this.dateOfExpense;
        this.dateRequestOfExpense = this.oldExpense.dateRequest;

      },
    )
  }


  updateExpense() {

    this.updatedExpense.id = this.oldExpense.id;
    this.updatedExpense.collaboratorId = this.oldExpense.collaboratorId
    this.updatedExpense.status = "en-cours"
    this.updatedExpense.typeExpense = this.typeOfExpense;
    this.updatedExpense.billable = this.billableOfExpense;
    this.updatedExpense.costHT = this.costHTOfExpense;
    this.updatedExpense.costTTC = (this.costHTOfExpense + this.costTVAOfExpense);
    this.updatedExpense.costTVA = this.costTVAOfExpense;
    this.updatedExpense.dateExpense = new Date(this.dateOfExpense);
    this.updatedExpense.dateRequest = this.dateRequestOfExpense;
    
    this._ExpenseService.addOneExpense(this.updatedExpense).subscribe();
  }

  deleteExpenseById() {
    this._ExpenseService.deleteOneExpense(this.oldExpense.id).subscribe();
  }

}

