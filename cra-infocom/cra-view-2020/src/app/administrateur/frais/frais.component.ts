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
  status!: String;

  public expenses!: Expense[];




  constructor(private _service: NgserviceService, private _route: Router) { }

  ngOnInit(): void {
  }
  goToEditFrais() {
    this._route.navigate(['/editFrais']);
  }


  searchExpenses() {

    this._service.searchExpense(this.date1, this.date2, this.status).subscribe(
      data => {
        this.expenses = data;

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

  }




}
