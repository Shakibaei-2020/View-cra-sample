import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeActivityService {

  constructor(private _http: HttpClient) { }

  selectTypeActivityById(id: number): Observable<TypeActivity> {
    return this._http.get<TypeActivity>(environment.activityBaseUrl + '/typesactivity/lister/' + id);
  }

  findNormalActivity(): Observable<TypeActivity> {
    return this._http.get<TypeActivity>(environment.activityBaseUrl + '/typesactivity/Normal');
  }


  findPanierRepas(): Observable<TypeActivity> {
    return this._http.get<TypeActivity>(environment.activityBaseUrl + '/typesactivity/PanierRepas');
  }


  selectAllTypeActivity(): Observable<TypeActivity[]> {
    return this._http.get<TypeActivity[]>(environment.activityBaseUrl + '/typesactivity/lister/');
  }

  addNewTypeActivit(typeActivity: TypeActivity): Observable<TypeActivity> {
    return this._http.post<TypeActivity>(environment.activityBaseUrl + '/typesactivity/ajouter', typeActivity);
  }

}
