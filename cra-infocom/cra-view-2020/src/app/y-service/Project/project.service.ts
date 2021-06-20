import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/z-model/Project/project';
import { ProjectCollaborator } from 'src/app/z-model/ProjectCollaborator/project-collaborator';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  
  selectProjectByMissionId(id: number): Observable<Project> {
    return this._http.get<Project>("http://localhost:8801/project/foundProject/" + id);
  }


  selectAllProjectByMissionId(id: number): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/foundProject/" + id);
  }


  SelectAllProjectForOneCollab(id: number): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/projectByCollab/" + id);
  }


  selectAllproject( ): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/lister/");
  }

  selectProjectById(id: number): Observable<Project> {
    return this._http.get<Project>("http://localhost:8801/project/lister/" + id);
  }

  addAndUpdateProject2(project: Project): Observable<Project> {
    return this._http.post<Project>("http://localhost:8801/project/update" , project);
  }

  
  deleteProjectById(id: number): Observable<any> {
    return this._http.get<any>("http://localhost:8801/project/supprimer/" + id);
  }

  majProjectTitle(idProject: number, newTitle:string): Observable<any> {
    return this._http.get<any>("http://localhost:8801/project/majProjectTitle/" + idProject + "/" + newTitle);
  }


  addAndUpdateProject(project: Project): Observable<Project> {
    return this._http.post<Project>("http://localhost:8801/project/ajouter" , project);
  } 


/** search  */


  searchProjectByProjectTitle( projectTitle: string): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/lister/ProjectTitle/" + projectTitle);
  }


  searchProjectByMissionTitle( missionTitle: string): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/lister/MissionTitle/" + missionTitle);
  }


  searchProjectByMissionProjectTitle( missionTitle: string, projectTitle:string): Observable<Project[]> {
    return this._http.get<Project[]>("http://localhost:8801/project/lister/MissionProjectTitle/" + projectTitle + "/" + missionTitle );
  }


}
