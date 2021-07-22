import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from 'src/app/z-model/Leave/leave';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private _http: HttpClient) { }


  addOrUpdateLeaveRequest(leave: Leave, dateOfDemand: string, dateOfStartLeave: string, dateOfEndLeave: string): Observable<any> {
    return this._http.post<any>(environment.leaveBaseUrl + '/conge/update/' + dateOfDemand + '/' + dateOfStartLeave + '/' + dateOfEndLeave, leave);
  }

  deleteOneLeaveRequest(id: number): Observable<Leave> {
    return this._http.delete<Leave>(environment.leaveBaseUrl + '/conge/supprimer/' + id);
  }


  addLeaveRequest(leave: Leave): Observable<Leave> {
    return this._http.post<Leave>(environment.leaveBaseUrl + '/conge/ajouter/', leave);
  }


  selectOneLeaveRequestById(id: number): Observable<Leave> {
    return this._http.get<Leave>(environment.leaveBaseUrl + '/conge/lister/' + id);
  }

  selectLeaveByCollabId(id: number): Observable<Leave[]> {

    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/lister/leave/collab/' + id);
  }

/** SEARCH */

  searchLeave(dateDebut: string, dateFin: string, status: string, lastname: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeave/' + dateDebut + '/' + dateFin + '/' + status + '/' + lastname);
  }

  searchLeaveByDateName(dateDebut: string, dateFin: string,  lastname: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByDateName/' + dateDebut + '/' + dateFin + '/' + lastname);
  }

  searchLeaveByDateStatus(dateDebut: string, dateFin: string, status: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByDateStatus/' + dateDebut + '/' + dateFin + '/' + status );
  }

  searchLeaveByDate(dateDebut: string, dateFin: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByDate/' + dateDebut + '/' + dateFin );
  }

  searchLeaveByStatusName( status: string, lastname: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByStatusName/' +  status + '/' + lastname);
  }

  searchLeaveByName( lastname: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByName/' + lastname);
  }

  searchLeaveByStatus( status: string): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/searchLeaveByStatus/' + status);
  }

  searchAllLeave(): Observable<Leave[]> {
    return this._http.get<Leave[]>(environment.leaveBaseUrl + '/conge/lister');
  }

}
