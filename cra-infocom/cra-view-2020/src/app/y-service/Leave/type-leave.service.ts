import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeLeaveService {

  constructor(private _http: HttpClient) { }

  selectLeaveTypeById(id: number): Observable<TypeLeave> {
    return this._http.get<TypeLeave>(environment.leaveBaseUrl + '/typesdeconge/lister/' + id);
  }

  selectAllLeaveType(): Observable<TypeLeave[]> {
    return this._http.get<TypeLeave[]>(environment.leaveBaseUrl + '/typesdeconge/lister/');
  }
}
