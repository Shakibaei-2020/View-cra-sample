import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../z-model/collaborator';
import { Expense } from '../z-model/expense';


@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

  constructor(private _http:HttpClient) {}

    fetchCollabListFromRemote():Observable<Collaborator[]>{
     return  this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister");
    }
 
  }

