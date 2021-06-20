import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeActivity } from 'src/app/z-model/Activity/type-activity';

@Injectable({
  providedIn: 'root'
})
export class TypeActivityService {

  constructor(private _http: HttpClient) { }

  selectTypeActivityById(id: number): Observable<TypeActivity> {
    return this._http.get<TypeActivity>("http://localhost:8800/typesactivity/lister/" + id);
  }

  selectAllTypeActivity(): Observable<TypeActivity[]> {
    return this._http.get<TypeActivity[]>("http://localhost:8800/typesactivity/lister/");
  }

  
  addNewTypeActivit(typeActivity: TypeActivity): Observable<TypeActivity> {
    return this._http.post<TypeActivity>("http://localhost:8800/typesactivity/ajouter", typeActivity);
  }

}
