import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/z-model/Activity/activity';
import { JoursFerie } from 'src/app/z-model/Activity/jours-ferie';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _http: HttpClient) { }

  searchActivity(date1: Date, date2: Date, lastName: String): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/searchActivity/' + date1 + '/' + date2 + '/' + lastName);
  }


  selectActivityById(id: number): Observable<Activity> {
    return this._http.get<Activity>(environment.activityBaseUrl + '/activity/lister/' + id);
  }

  addAndUpdateActivity(activity: Activity, startDate: string): Observable<Activity> {
    return this._http.post<Activity>(environment.activityBaseUrl + '/activity/update/' + startDate, activity);
  }


  addAndUpdateActivity2(activity: Activity): Observable<Activity> {
    return this._http.post<Activity>(environment.activityBaseUrl + '/activity/ajouter/' , activity);
  }



  DeleteActivityById(id: number): Observable<Activity> {
    return this._http.delete<Activity>(environment.activityBaseUrl + '/activity/supprimer/' + id);
  }



  searchActivityByidCollMonthYear(month: number, year: number, idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/searchActivityByidCollMonthYear/' + month + '/' + year + '/' + idColl);
  }

  activityGroupByProject(month: number, year: number, idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/activityGroupByProject/' + month + '/' + year + '/' + idColl);
  }

  astreinteGroupByProject(month: number, year: number, idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/astreinteGroupByProject/' + month + '/' + year + '/' + idColl);
  }
  astreinteGroupByTypeActivity(month: number, year: number, idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/astreinteGroupByTypeActivity/' + month + '/' + year + '/' + idColl);
  }

  astreinteGroupByTypeActivityAndProjet(month: number, year: number, idColl: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/astreinteGroupByTypeActivityAndProjet/' + month + '/' + year + '/' + idColl);
  }

  /** FOR ACTIVITY */
  searchTheActivityOfCollaboratorOfProject(month: number, year: number, idColl: number, idProject: number): Observable<Activity[]> {
      return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/searchTheActivityOfCollaboratorOfProject/' + month + '/' + year + '/' + idColl + '/' + idProject);
  }

  /** FOR ASTREINTE */
  searchTheAstreinteOfCollaboratorOfProject(month: number, year: number, idColl: number, idProject: number, idType: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(environment.activityBaseUrl + '/activity/searchTheAstreinteOfCollaboratorOfProject/' + month + '/' + year + '/' + idColl + '/' + idProject + '/' + idType);
}


  /** FOR ACTIVITY */
  checkActivityEmpty(month: number, year: number, idColl: number, idProject: number): Observable<boolean> {
    return this._http.get<boolean>(environment.activityBaseUrl + '/activity/checkActivityEmpty/' + month + '/' + year + '/' + idColl + '/' + idProject);
}


  /** FOR ACTIVITY */
  checkAstreinteEmpty(month: number, year: number, idColl: number, idProject: number, idType: number): Observable<boolean> {
    return this._http.get<boolean>(environment.activityBaseUrl + '/activity/checkAstreinteEmpty/' + month + '/' + year + '/' + idColl + '/' + idProject + '/' + idType);
}


checkJoursFeriées(): Observable<JoursFerie[]> {
  return this._http.get<JoursFerie[]>(environment.activityBaseUrl + '/jourferie/lister/' );
}


}
