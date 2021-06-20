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
import { TypeClient } from '../z-model/Client/type-client';
import { TypeCollaborator } from '../z-model/Collaborator/type-collaborator';
import { ProjectCollaborator } from '../z-model/ProjectCollaborator/project-collaborator';


@Injectable({
  providedIn: 'root'
})

export class NgserviceService {

  constructor(private _http: HttpClient) { }


}