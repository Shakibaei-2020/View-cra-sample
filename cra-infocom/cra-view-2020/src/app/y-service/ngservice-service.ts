import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../z-model/collaborator';
import { Expense } from '../z-model/expense';
import { BehaviorSubject } from 'rxjs';
import { Leave } from '../z-model/leave';
import { Activity } from '../z-model/activity';
import { TypeActivity } from '../z-model/type-activity';


@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

 

  constructor(private _http:HttpClient) {}




/** START Controller for Collaborateur interactions */

   selectOneCollabById(id: number):Observable<Collaborator>{
    return  this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/"+id);
   }

   selectCollabByName(lastName :String):Observable<Collaborator[]>{
    return  this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister/Nom/"+lastName);
   }

   selectCollabByMail(email :String):Observable<Collaborator>{
    return  this._http.get<Collaborator>("http://localhost:8900/collaborateurs/lister/email/{email}"+email);
   }

    selectAllCollab():Observable<Collaborator[]>{
     return  this._http.get<Collaborator[]>("http://localhost:8900/collaborateurs/lister");
    }
 
    addCollab(collaborator: Collaborator, date1 :Date,date2:Date):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/collaborateurs/ajouter/" +date1 +"/"+ date2 , collaborator);
     }


     updateCollab(collaborator: Collaborator ):Observable<any>{
      return  this._http.post<any>("http://localhost:8900/collaborateurs/update",collaborator);
     }

     deleteCollab(collaborator: Collaborator):Observable<Collaborator>{
      return this._http.delete<Collaborator>("http://localhost:8900/collaborateurs/supprimer" +collaborator);
    }

    deleteCollabById(id: number):Observable<any>{
      return this._http.delete<any>("http://localhost:8900/collaborateurs/supprimer/"+id);

    }
    /** END Controller for Collaborateur interactions */


    /**START EXPENSE */

    searchExpense(date1 : Date, date2 :Date ,status :String):Observable<Expense[]>{
      return  this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpense/"+ date1 +"/"+date2 +"/"+status);
     }
     
     listExpenseByCollabId(id:number):Observable<Expense[]>{

            return  this._http.get<Expense[]>("http://localhost:7672/expenses/lister/expense/collab/"+id);

     }

     
    addAndUpdateExpense(expense: Expense, dateExpense :Date,dateRequest:Date):Observable<any>{
      return  this._http.post<any>("http://localhost:7672/expenses/ajouter/" +dateExpense +"/"+ dateRequest , expense);
     }

     addOneExpense(expense: Expense ):Observable<any>{
      return  this._http.post<any>("http://localhost:7672/expenses/ajouter",expense);
    }

    deleteOneExpense(id: number ):Observable<Expense>{
      return  this._http.delete<Expense>("http://localhost:7672/expenses/supprimer/" + id);
    }
    

    selectOneExpenseById(id: number):Observable<Expense>{
      return  this._http.get<Expense>("http://localhost:7672/expenses/lister/"+id);
     }
    
    /**END EXPENSE  */


    /**START LEAVE  */


    addOneLeaveRequest(leave: Leave ):Observable<any>{
      return  this._http.post<any>("http://localhost:8950/conge/ajouter",leave);
    }

    deleteOneLeaveRequest(leave: Leave ):Observable<any>{
      return  this._http.delete<Leave>("http://localhost:8950/conge/supprimer"+ leave);
    }
    

    selectOneLeaveRequestById(id: number):Observable<Leave>{
      return  this._http.get<Leave>("http://localhost:8950/conge/lister/"+id);
     }

     selectLeaveByCollabId(id:number):Observable<Leave[]>{

      return  this._http.get<Leave[]>("http://localhost:8950/conge/lister/leave/collab/"+id);
    }


  searchLeave(date1 : Date, date2 :Date ,status :String):Observable<Leave[]>{
  return  this._http.get<Leave[]>("http://localhost:8950/conge/searchLeave/" + date1+"/" +date2 +"/"+status);
 }

  
   
    /**END LEAVE  */


    /** START ACTIVITY */

    searchActivity(date1 : Date, date2 :Date ,lastName :String):Observable<Activity[]>{
      return  this._http.get<Activity[]>("http://localhost:8800/activity/searchActivity/"+ date1 +"/"+date2 +"/"+lastName);
     }


     addNewTypeActivit(typeActivity: TypeActivity ):Observable<TypeActivity>{
      return  this._http.post<TypeActivity>("http://localhost:8800/typesactivity/ajouter",typeActivity);
    }
     
     /** END ACTIVITY */





  }

