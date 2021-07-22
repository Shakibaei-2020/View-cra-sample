import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCollaborator } from 'src/app/z-model/Collaborator/type-collaborator';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeCollaboratorService {

  constructor(private _http: HttpClient) { }

  selectAllTypeCollaborator(): Observable<TypeCollaborator[]> {
    return this._http.get<TypeCollaborator[]>(environment.collaboratorBaseUrl + '/typescollaborateurs/lister/');

  }

  selectTypeCollaboratorById(id: number): Observable<TypeCollaborator> {
    return this._http.get<TypeCollaborator>(environment.collaboratorBaseUrl + '/typescollaborateurs/lister/' + id);
  }
}
