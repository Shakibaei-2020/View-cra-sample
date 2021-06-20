import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Injectable({
  providedIn: 'root'
})
export class TypeLeaveService {

  constructor(private _http: HttpClient) { }

  selectLeaveTypeById(id: number): Observable<TypeLeave> {
    return this._http.get<TypeLeave>("http://localhost:8950/typesdeconge/lister/" + id);
  }

  selectAllLeaveType(): Observable<TypeLeave[]> {
    return this._http.get<TypeLeave[]>("http://localhost:8950/typesdeconge/lister/");
  }
}
