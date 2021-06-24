import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/z-model/Activity/activity';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _http: HttpClient) { }

  searchActivity(date1: Date, date2: Date, lastName: String): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/searchActivity/" + date1 + "/" + date2 + "/" + lastName);
  }


  selectActivityById(id: number): Observable<Activity> {
    return this._http.get<Activity>("http://localhost:8800/activity/lister/" + id);
  }

  addAndUpdateActivity(activity: Activity, startDate: string): Observable<Activity> {
    return this._http.post<Activity>("http://localhost:8800/activity/update/" + startDate, activity);
  }


  addAndUpdateActivity2(activity: Activity): Observable<Activity> {
    return this._http.post<Activity>("http://localhost:8800/activity/ajouter/" , activity);
  }

  

  DeleteActivityById(id: number): Observable<Activity> {
    return this._http.delete<Activity>("http://localhost:8800/activity/supprimer/" + id);
  }


  

  searchActivityByidCollMonthYear(month: number,year: number,idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/searchActivityByidCollMonthYear/" + month + "/" + year + "/" + idColl);
  }

  activityGroupByProject(month: number,year: number,idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/activityGroupByProject/" + month + "/" + year + "/" + idColl);
  }

  astreinteGroupByProject(month: number,year: number,idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/astreinteGroupByProject/" + month + "/" + year + "/" + idColl);
  }


  /** FOR ACTIVITY */
  searchTheActivityOfCollaboratorOfProject(month:number, year: number,idColl: number,idProject:number): Observable<Activity[]> {
      return this._http.get<Activity[]>("http://localhost:8800/activity/searchTheActivityOfCollaboratorOfProject/" +month + "/"+ year + "/" + idColl + "/" +idProject);
  }

  /** FOR ASTREINTE */
  searchTheAstreinteOfCollaboratorOfProject(month:number, year: number,idColl: number,idProject:number): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/searchTheAstreinteOfCollaboratorOfProject/" +month + "/"+ year + "/" + idColl + "/" +idProject);
}


  /** FOR ACTIVITY */
  checkActivityEmpty(month:number, year: number,idColl: number,idProject:number): Observable<boolean> {
    return this._http.get<boolean>("http://localhost:8800/activity/checkActivity1Empty/" +month + "/"+ year + "/" + idColl + "/" +idProject);
}


}
