import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeExpense } from 'src/app/z-model/Expense/type-expense';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService {

  constructor(private _http: HttpClient) { }

    selectTypeExpenseById(id: number): Observable<TypeExpense> {
      return this._http.get<TypeExpense>("http://localhost:7672/typesexpenses/lister/" + id);
    }
    selectAllTypeExpense(): Observable<TypeExpense[]> {
      return this._http.get<TypeExpense[]>("http://localhost:7672/typesexpenses/lister/");
    }
  
}
