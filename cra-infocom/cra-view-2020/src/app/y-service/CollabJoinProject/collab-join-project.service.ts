import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollabJoinProjectService {

  constructor(private _http: HttpClient) { }



  addAndUpdateProjectCollaborator(projectCollab: ProjectCollaborator): Observable<ProjectCollaborator> {
    return this._http.post<ProjectCollaborator>(environment.collaboratorBaseUrl + '/projetCollaborator/affectCollaborator', projectCollab);
  }


  addCollabToProject( idCollab: number, idProject: number): Observable<any>{
    return this._http.get<any>(environment.collaboratorBaseUrl + '/projetCollaborator/addCollabToProject/' + idCollab + '/' + idProject);
  }


  deleteAllCollabAffectedToProject(id: number): Observable<any> {
    return this._http.get<any>(environment.collaboratorBaseUrl + '/projetCollaborator/delete/' + id);
  }

  selectAllProjectCollabbyProjectId( id: number): Observable<ProjectCollaborator[]> {
    return this._http.get<ProjectCollaborator[]>(environment.collaboratorBaseUrl + '/projetCollaborator/collabsByProject/' + id);
  }


  deleteCollabOfThisProject(idCollab: number, idProject: number): Observable<any> {
    return this._http.get<any>(environment.collaboratorBaseUrl + '/projetCollaborator/deleteCollabOfThisProject/' + idCollab + '/' + idProject);
  }



  selectCollabNotAffectedToProject(idProject: number): Observable<any[]>{
    return this._http.get<any[]>(environment.collaboratorBaseUrl + '/projetCollaborator/selectCollabNotAffectedToProject/' + idProject);
  }


  selectProjectCollabByCollabId(idCollab: number): Observable<ProjectCollaborator[]>{
    return this._http.get<ProjectCollaborator[]>(environment.collaboratorBaseUrl + '/projetCollaborator/selectProjectCollabByCollabId/' + idCollab);
  }
}
