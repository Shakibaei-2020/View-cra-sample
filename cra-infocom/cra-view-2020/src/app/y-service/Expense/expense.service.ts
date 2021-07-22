import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/z-model/Expense/expense';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _http: HttpClient) { }


  listExpenseByCollabId(id: number): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/lister/expense/collab/' + id);
  }

  addAndUpdateExpense(expense: Expense, dateExpense: string, dateRequest: string): Observable<any> {
    return this._http.post<any>(environment.expenseBaseUrl + '/expenses/ajouter/' + dateExpense + '/' + dateRequest, expense);
  }

  addOneExpense(expense: Expense): Observable<Expense> {
    console.log(expense)
    return this._http.post<Expense>(environment.expenseBaseUrl + '/expenses/update', expense);
  }

  deleteOneExpense(id: number): Observable<Expense> {
    return this._http.delete<Expense>(environment.expenseBaseUrl + '/expenses/supprimer/' + id);
  }

  selectOneExpenseById(id: number): Observable<Expense> {
    return this._http.get<Expense>(environment.expenseBaseUrl + '/expenses/lister/' + id);
  }

  // SEARCH METHODS
  searchExpense(date1: Date, date2: Date, status: String, lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpense/' + date1 + '/' + date2 + '/' + status + '/' + lastNameCollab);
  }

  searchExpenseByDate(date1: Date, date2: Date): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByDate/' + date1 + '/' + date2);
  }

  searchExpenseByDateName(date1: Date, date2: Date, lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByDateName/' + date1 + '/' + date2 + '/' + lastNameCollab);
  }

  searchExpenseByDateStatus(date1: Date, date2: Date, status: string): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByDateStatus/' + date1 + '/' + date2 + '/' + status);
  }

  searchExpenseByName( lastNameCollab: String): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByName/' + lastNameCollab);
  }

  searchExpenseByStatus(status: String): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByStatus/' +  status);
  }

  searchExpenseByNameStatus( lastNameCollab: String, status : String): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/searchExpenseByNameStatus/' + lastNameCollab + '/' + status);
  }

  searchAllExpense(): Observable<Expense[]> {
    return this._http.get<Expense[]>(environment.expenseBaseUrl + '/expenses/lister');
  }



  /** FOR expense */
  checkExpenseExist(month: number, year: number, idColl: number): Observable<boolean> {
    return this._http.get<boolean>(environment.expenseBaseUrl + '/expenses/checkExpenseExist/' + month + '/' + year + '/' + idColl);
}

expenseToUpdate(month: number, year: number, idColl: number): Observable<Expense> {
  return this._http.get<Expense>(environment.expenseBaseUrl + '/expenses/expenseToUpdate/' + month + '/' + year + '/' + idColl);
}


}
