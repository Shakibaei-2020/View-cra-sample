import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/z-model/Expense/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _http: HttpClient) { }


  listExpenseByCollabId(id: number): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/lister/expense/collab/" + id);
  }

  addAndUpdateExpense(expense: Expense, dateExpense: string, dateRequest: string): Observable<any> {
    return this._http.post<any>("http://localhost:7672/expenses/ajouter/" + dateExpense + "/" + dateRequest, expense);
  }

  addOneExpense(expense: Expense): Observable<Expense> {
    console.log(expense)
    return this._http.post<Expense>("http://localhost:7672/expenses/update", expense);
  }

  deleteOneExpense(id: number): Observable<Expense> {
    return this._http.delete<Expense>("http://localhost:7672/expenses/supprimer/" + id);
  }

  selectOneExpenseById(id: number): Observable<Expense> {
    return this._http.get<Expense>("http://localhost:7672/expenses/lister/" + id);
  }

  /** SEARCH METHODS*/
  searchExpense(date1: Date, date2: Date, status: String, lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpense/" + date1 + "/" + date2 + "/" + status + "/" + lastNameCollab);
  }

  searchExpenseByDate(date1: Date, date2: Date): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByDate/" + date1 + "/" + date2 );
  }
  
  searchExpenseByDateName(date1: Date, date2: Date,lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByDateName/" + date1 + "/" + date2 + "/" + lastNameCollab);
  }

  searchExpenseByDateStatus(date1: Date, date2: Date, status: string): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByDateStatus/" + date1 + "/" + date2 + "/" + status );
  }

  searchExpenseByName( lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByName/" + lastNameCollab);
  }

  searchExpenseByStatus(status: String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByStatus/" +  status);
  }

  searchExpenseByNameStatus( lastNameCollab: String, status : String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpenseByNameStatus/" + lastNameCollab + "/" + status);
  }

  searchAllExpense(): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/lister");
  }


  
  /** FOR expense */
  checkExpenseExist(month:number, year: number,idColl: number): Observable<boolean> {
    return this._http.get<boolean>("http://localhost:7672/expenses/checkExpenseExist/" +month + "/"+ year + "/" + idColl );
}

expenseToUpdate(month:number, year: number,idColl: number): Observable<Expense> {
  return this._http.get<Expense>("http://localhost:7672/expenses/expenseToUpdate/" +month + "/"+ year + "/" + idColl );
}


}
