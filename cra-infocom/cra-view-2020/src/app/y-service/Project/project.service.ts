import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/z-model/Project/project';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }


  selectProjectByMissionId(id: number): Observable<Project> {
    return this._http.get<Project>(environment.clientBaseUrl + '/project/foundProject/' + id);
  }


  selectAllProjectByMissionId(id: number): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/foundProject/' + id);
  }


  SelectAllProjectForOneCollab(id: number): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/projectByCollab/' + id);
  }


  selectAllproject( ): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/lister/');
  }

  selectProjectById(id: number): Observable<Project> {
    return this._http.get<Project>(environment.clientBaseUrl + '/project/lister/' + id);
  }

  addAndUpdateProject2(project: Project): Observable<Project> {
    return this._http.post<Project>(environment.clientBaseUrl + '/project/update', project);
  }


  deleteProjectById(id: number): Observable<any> {
    return this._http.get<any>(environment.clientBaseUrl + '/project/supprimer/' + id);
  }

  majProjectTitle(idProject: number, newTitle: string): Observable<any> {
    return this._http.get<any>(environment.clientBaseUrl + '/project/majProjectTitle/' + idProject + '/' + newTitle);
  }


  addAndUpdateProject(project: Project): Observable<Project> {
    return this._http.post<Project>(environment.clientBaseUrl + '/project/ajouter', project);
  }


/** search  */


  searchProjectByProjectTitle( projectTitle: string): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/lister/ProjectTitle/' + projectTitle);
  }


  searchProjectByMissionTitle( missionTitle: string): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/lister/MissionTitle/' + missionTitle);
  }


  searchProjectByMissionProjectTitle( missionTitle: string, projectTitle: string): Observable<Project[]> {
    return this._http.get<Project[]>(environment.clientBaseUrl + '/project/lister/MissionProjectTitle/' + projectTitle + '/' + missionTitle );
  }


}
