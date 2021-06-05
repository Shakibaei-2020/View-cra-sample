import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../z-model/Collaborator/collaborator';
import { Expense } from '../z-model/Expense/expense';
import { BehaviorSubject } from 'rxjs';
import { Leave } from '../z-model/Leave/leave';
import { Activity } from '../z-model/Activity/activity';
import { TypeActivity } from '../z-model/Activity/type-activity';
import { Client } from '../z-model/Client/client';
import { Mission } from '../z-model/Mission/mission';
import { Project } from '../z-model/Project/project';
import { TypeLeave } from '../z-model/Leave/type-leave';
import { TypeExpense } from '../z-model/Expense/type-expense';


@Injectable({
  providedIn: 'root'
})

export class NgserviceService {
  get(arg0: string, arg1: { responseType: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private _http: HttpClient) { }


  /****************************************************************************************** COLLABORATEUR SERVICES*************************************************************************/

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

  addCollab(collaborator: Collaborator, date1: Date, date2: Date): Observable<any> {
    return this._http.post<any>("http://localhost:8900/collaborateurs/ajouter/" + date1 + "/" + date2, collaborator);
  }

  updateCollab(collaborator: Collaborator): Observable<Collaborator> {
    return this._http.post<Collaborator>("http://localhost:8900/collaborateurs/update", collaborator);
  }

  deleteCollab(collaborator: Collaborator): Observable<Collaborator> {
    return this._http.delete<Collaborator>("http://localhost:8900/collaborateurs/supprimer" + collaborator);
  }

  deleteCollabById(id: number): Observable<any> {
    return this._http.delete<any>("http://localhost:8900/collaborateurs/supprimer/" + id);

  }

  /****************************************************************************************** NOTE DE FRAIS SERVICES*************************************************************************/

  searchExpense(date1: Date, date2: Date, status: String): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/searchExpense/" + date1 + "/" + date2 + "/" + status);
  }

  listExpenseByCollabId(id: number): Observable<Expense[]> {
    return this._http.get<Expense[]>("http://localhost:7672/expenses/lister/expense/collab/" + id);
  }

  addAndUpdateExpense(expense: Expense, dateExpense: Date, dateRequest: Date): Observable<any> {
    return this._http.post<any>("http://localhost:7672/expenses/ajouter/" + dateExpense + "/" + dateRequest, expense);
  }

  addOneExpense(expense: Expense): Observable<Expense> {
    return this._http.post<Expense>("http://localhost:7672/expenses/ajouter", expense);
  }

  deleteOneExpense(id: number): Observable<Expense> {
    return this._http.delete<Expense>("http://localhost:7672/expenses/supprimer/" + id);
  }

  selectOneExpenseById(id: number): Observable<Expense> {
    return this._http.get<Expense>("http://localhost:7672/expenses/lister/" + id);
  }

  /** TYPE **/

  selectTypeExpenseById(id: number): Observable<TypeExpense> {
    return this._http.get<TypeExpense>("http://localhost:7672/typesexpenses/lister/" + id);
  }

  /****************************************************************************************** CONGE SERVICES *******************************************************************************/


  addOrUpdateLeaveRequest(leave: Leave, dateOfDemand: Date, dateOfStartLeave: Date, dateOfEndLeave: Date): Observable<Leave> {
    return this._http.post<Leave>("http://localhost:8950/conge/update/" + dateOfDemand + "/" + dateOfStartLeave + "/" + dateOfEndLeave, leave);
  }

  deleteOneLeaveRequest(id: number): Observable<Leave> {
    return this._http.delete<Leave>("http://localhost:8950/conge/supprimer/" + id);
  }

  selectOneLeaveRequestById(id: number): Observable<Leave> {
    return this._http.get<Leave>("http://localhost:8950/conge/lister/" + id);
  }

  selectLeaveByCollabId(id: number): Observable<Leave[]> {

    return this._http.get<Leave[]>("http://localhost:8950/conge/lister/leave/collab/" + id);
  }

  searchLeave(dateDebut: Date, dateFin: Date, status: String): Observable<Leave[]> {
    return this._http.get<Leave[]>("http://localhost:8950/conge/searchLeave/" + dateDebut + "/" + dateFin + "/" + status);
  }

  /** TYPE **/
  selectLeaveTypeById(id: number): Observable<TypeLeave> {
    return this._http.get<TypeLeave>("http://localhost:8950/typesdeconge/lister/" + id);
  }


  /*************************************************************************************** ACTIVITY SERVICES *******************************************************************************/

  searchActivity(date1: Date, date2: Date, lastName: String): Observable<Activity[]> {
    return this._http.get<Activity[]>("http://localhost:8800/activity/searchActivity/" + date1 + "/" + date2 + "/" + lastName);
  }

  addNewTypeActivit(typeActivity: TypeActivity): Observable<TypeActivity> {
    return this._http.post<TypeActivity>("http://localhost:8800/typesactivity/ajouter", typeActivity);
  }

  selectActivityById(id: number): Observable<Activity> {
    return this._http.get<Activity>("http://localhost:8800/activity/lister/" + id);
  }

  addAndUpdateActivity(activity: Activity, startDate: string): Observable<Activity> {
    return this._http.post<Activity>("http://localhost:8800/activity/update/" + startDate, activity);
  }

  DeleteActivityById(id: number): Observable<Activity> {
    return this._http.delete<Activity>("http://localhost:8800/activity/supprimer/" + id);
  }

  /** TYPE **/

  selectTypeActivityById(id: number): Observable<TypeActivity> {
    return this._http.get<TypeActivity>("http://localhost:8800/typesactivity/lister/" + id);
  }

  selectAllTypeActivity(): Observable<TypeActivity[]> {
    return this._http.get<TypeActivity[]>("http://localhost:8800/typesactivity/lister/");
  }

  /*************************************************************************************** CLIENT SERVICES *******************************************************************************/


  selectClientByName(name: String): Observable<Client[]> {
    return this._http.get<Client[]>("http://localhost:8801/client/lister/Nom/" + name);
  }

  addAndupdateClient(client: Client): Observable<Client> {
    return this._http.post<Client>("http://localhost:8801/client/update", client);
  }

  deleteClient(id: number): Observable<Client> {
    return this._http.delete<Client>("http://localhost:8801/client/supprimer/" + id);
  }

  selectClientById(id: number): Observable<Client> {
    return this._http.get<Client>("http://localhost:8801/client/lister/" + id);
  }
  /*************************************************************************************** MISSIONS SERVICES *******************************************************************************/

  selectMissionById(id: number): Observable<Mission> {
    return this._http.get<Mission>("http://localhost:8801/mission/lister/" + id);
  }


  searchMission(date1: Date, date2: Date, nameClient: string): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/searchMission/" + date1 + "/" + date2 + "/" + nameClient);
  }


  addAndUpdateMission(mission: Mission, startDate: Date, endDate: Date): Observable<Mission> {
    return this._http.post<Mission>("http://localhost:8801/mission/update/" + startDate + "/" + endDate, mission);
  }


  deleteMission(id: number): Observable<Mission> {
    return this._http.delete<Mission>("http://localhost:8801/mission/supprimer/" + id);
  }

  selectAllMission(): Observable<Mission[]> {
    return this._http.get<Mission[]>("http://localhost:8801/mission/lister/");
  }

  /*************************************************************************************** PROJECT SERVICES *******************************************************************************/

  selectProjectByMissionId(id: number): Observable<Project> {
    return this._http.get<Project>("http://localhost:8801/project/foundProject/" + id);
  }
}

