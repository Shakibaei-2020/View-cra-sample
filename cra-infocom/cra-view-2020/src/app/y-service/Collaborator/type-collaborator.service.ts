import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';

@Injectable({
  providedIn: 'root'
})
export class TypeCollaboratorService {


  constructor(private _http: HttpClient) { }

  selectAllTypeCollaborator(): Observable<TypeCollaborator[]> {
    return this._http.get<TypeCollaborator[]>("http://localhost:8900/typescollaborateurs/lister/");

  } 
  
  selectTypeCollaboratorById(id: number): Observable<TypeCollaborator> {
    return this._http.get<TypeCollaborator>("http://localhost:8900/typescollaborateurs/lister/" + id);
  }
  

}
