import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from 'src/app/z-model/Mission/mission';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _http: HttpClient) { }


  selectMissionById(id: number): Observable<Mission> {
    return this._http.get<Mission>(environment.clientBaseUrl + '/mission/lister/' + id);
  }


  addAndUpdateMission(mission: Mission, startDate: string, endDate: string): Observable<Mission> {
    return this._http.post<Mission>(environment.clientBaseUrl + '/mission/update/' + startDate + '/' + endDate, mission);
  }


  deleteMission(id: number): Observable<Mission> {
    return this._http.delete<Mission>(environment.clientBaseUrl + '/mission/supprimer/' + id);
  }

  selectAllMission(): Observable<Mission[]> {
    return this._http.get<Mission[]>(environment.clientBaseUrl + '/mission/lister/');
  }


  selectLastIdMission(): Observable<number> {
    return this._http.get<number>(environment.clientBaseUrl + '/mission/lastId/');
  }

  /** SEARCH */


  searchMission(debut: Date, fin: Date, nameClient: string): Observable<Mission[]> {
    return this._http.get<Mission[]>(environment.clientBaseUrl + '/mission/searchMission/' + debut + '/' + fin + '/' + nameClient);
  }

  searchMissionByDate(debut: Date, fin: Date): Observable<Mission[]> {
    return this._http.get<Mission[]>(environment.clientBaseUrl + '/mission/searchDate/' + debut + '/' + fin );
  }

  searchMissionByClientName( nameClient: string): Observable<Mission[]> {
    return this._http.get<Mission[]>(environment.clientBaseUrl + '/mission/searchName/' + nameClient);
  }

  searchAllMission( ): Observable<Mission[]> {
    return this._http.get<Mission[]>(environment.clientBaseUrl + '/mission/lister/');
  }
}
