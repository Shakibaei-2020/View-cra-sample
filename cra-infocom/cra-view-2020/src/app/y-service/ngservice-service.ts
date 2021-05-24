import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../z-model/collaborator';
import { TypeCollaborator } from '../z-model/type-collaborator';
import { Expense } from '../z-model/expense';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Leave } from '../z-model/leave';


@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

 

  constructor(private _http:HttpClient) {}




/** START Controller for Collaborateur interactions */

   fetchOneCollabFromRemote(id: number):Observable<Collaborator>{
    return  this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/"+id);
   }

   fetchOneCollabByNameFromRemote(lastName :String):Observable<any>{
    return  this._http.get<any>("http://localhost:8900/collaborateurs/lister/N/{lastName}"+lastName);
   }

   fetchOneCollabByMailFromRemote(email :String):Observable<Collaborator>{
    return  this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/email/{email}"+email);
   }

    fetchCollabListFromRemote():Observable<Collaborator[]>{
     return  this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister");
    }
 
    addCollabToRemote(collaborator: Collaborator ):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/collaborateurs/ajouter",collaborator);
     }


     updateCollabToRemote(collaborator: Collaborator ):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/collaborateurs/update",collaborator);
     }

     deleteCollabToRemote(collaborator: Collaborator):Observable<Collaborator>{
      return this._http.delete<Collaborator>("http://localhost:8900/collaborateurs/supprimer"+ collaborator);
    }

    /** END Controller for Collaborateur interactions */


    /**START EXPENSE */

    
    /**END EXPENSE  */


    /**START LEAVE  */


    addLeaveRequestToRemote(leave: Leave ):Observable<any>{
      return  this._http.post<any>("http://localhost:8950/demandesdeconge/ajouter",leave);
    }
    

    fetchLeaveRequestOfOneFromRemote(id: number):Observable<Leave[]>{
      return  this._http.get<Leave[]>("http://localhost:8950/demandesdeconge/lister/"+id);
     }
  
   
    /**END LEAVE  */

  }

