import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from 'src/app/z-model/Mission/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _http: HttpClient) { }

  
  selectMissionById(id: number): Observable<Mission> {
    return this._http.get<Mission>("http://localhost:8801/mission/lister/" + id);
  }


  addAndUpdateMission(mission: Mission, startDate: string, endDate: string): Observable<Mission> {
    return this._http.post<Mission>("http://localhost:8801/mission/update/" + startDate + "/" + endDate, mission);
  }


  deleteMission(id: number): Observable<Mission> {
    return this._http.delete<Mission>("http://localhost:8801/mission/supprimer/" + id);
  }

  selectAllMission(): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/lister/");
  }


  selectLastIdMission(): Observable<number> {
    return this._http.get<number>("http://localhost:8801/mission/lastId/");
  }

  /** SEARCH */

  
  searchMission(debut: Date, fin: Date, nameClient: string): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/searchMission/" + debut + "/" + fin + "/" + nameClient);
  }

  searchMissionByDate(debut: Date, fin: Date): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/searchDate/" + debut + "/" + fin );
  }

  searchMissionByClientName( nameClient: string): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/searchName/" + nameClient);
  }

  searchAllMission( ): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/lister/");
  }
}
