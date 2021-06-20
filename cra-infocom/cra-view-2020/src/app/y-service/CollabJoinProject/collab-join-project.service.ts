import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollabJoinProjectService {

  constructor(private _http: HttpClient) { }

  

  addAndUpdateProjectCollaborator(projectCollab: ProjectCollaborator): Observable<ProjectCollaborator> {
    return this._http.post<ProjectCollaborator>("http://localhost:8900/projetCollaborator/affectCollaborator" , projectCollab);
  }

  
  addCollabToProject( idCollab:number,idProject:number):Observable<any>{
    return this._http.get<any>("http://localhost:8900/projetCollaborator/addCollabToProject/" + idCollab + "/" + idProject);
  }


  deleteAllCollabAffectedToProject(id: number): Observable<any> {
    return this._http.get<any>("http://localhost:8900/projetCollaborator/delete/" + id);
  }

  selectAllProjectCollabbyProjectId( id: number): Observable<ProjectCollaborator[]> {
    return this._http.get<ProjectCollaborator[]>("http://localhost:8900/projetCollaborator/collabsByProject/"+ id);
  }


  deleteCollabOfThisProject(idCollab: number, idProject:number): Observable<any> {
    return this._http.get<any>("http://localhost:8900/projetCollaborator/deleteCollabOfThisProject/" + idCollab + "/" + idProject );
  }



  selectCollabNotAffectedToProject(idProject:number):Observable<Collaborator[]>{
    return this._http.get<Collaborator[]>("http://localhost:8900/projetCollaborator/selectCollabNotAffectedToProject/" + idProject);
  }


}
