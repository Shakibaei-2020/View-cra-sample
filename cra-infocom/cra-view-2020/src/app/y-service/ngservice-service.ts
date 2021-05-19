import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../z-model/collaborator';
import { TypeCollaborator } from '../z-model/type-collaborator';
import { Expense } from '../z-model/expense';


@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

  constructor(private _http:HttpClient) {}

    fetchCollabListFromRemote():Observable<Collaborator[]>{
     return  this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister");
    }
 

    addCollabToRemote(collaborator: Collaborator ):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/collaborateurs/ajouter",collaborator);
     }

     addTypeCollabToRemote(typeCollaborator: TypeCollaborator ):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/typescollaborateurs/ajouterTypeCollaborateur",typeCollaborator);
     }
  }

