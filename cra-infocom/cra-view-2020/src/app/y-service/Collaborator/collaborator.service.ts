import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/z-model/Collaborator/collaborator';
import { FeedBack } from 'src/app/z-model/feed-back';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private _http: HttpClient) { }

  
  selectOneCollabById(id: number): Observable<Collaborator> {
    return this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/" + id);
  }

  selectCollabByName(lastName: String): Observable<Collaborator[]> {
    return this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister/Nom/" + lastName);
  }
  
  selectCollabByMail(email: String): Observable<Collaborator> {
    return this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/email/" + email);
  }

  selectAllCollab(): Observable<Collaborator[]> {
    return this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister");
  }

  addCollab(collaborator: Collaborator, dateEntre: string, dateSortie: string): Observable<Collaborator> {
    return this._http.post<Collaborator>("http://localhost:8900/collaborateurs/ajouter/" + dateEntre + "/" + dateSortie, collaborator);
  }

  updateCollab(collaborator: Collaborator): Observable<Collaborator> {
    return this._http.post<Collaborator>("http://localhost:8900/collaborateurs/update", collaborator);
  }

  deleteCollab(collaborator: Collaborator): Observable<Collaborator> {
    return this._http.delete<Collaborator>("http://localhost:8900/collaborateurs/supprimer" + collaborator);
  }

  deleteCollabById(id: number): Observable<Collaborator> {
    return this._http.delete<Collaborator>("http://localhost:8900/collaborateurs/supprimer/" + id);
  }

  selectCollabByLeaveId(id: number): Observable<Collaborator> {
    return this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/collab/leave/" + id);
  }

    selectCollabByProjectId(id: number): Observable<any> {
    return this._http.get<any>("http://localhost:8900/collaborateurs/collabsByProjectId/" + id);
  }

 
  sendMessage(feedBack: FeedBack): Observable<FeedBack> {
    return this._http.post<FeedBack>("http://localhost:8900/collaborateurs/sendMessage/" ,feedBack);
  }

  sendMessageWithAttachment(to:string,subject:string,body:string,file:File): Observable<FeedBack> {
    return this._http.get<FeedBack>("http://localhost:8900/collaborateurs/sendMailWithAttachment/" + to + "/" + subject + "/" + body + "/" + file);
  }


}
