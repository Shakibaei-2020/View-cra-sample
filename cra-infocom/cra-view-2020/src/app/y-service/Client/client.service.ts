import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }

    /** TYPE */



    selectClientByName(name: String): Observable<Client[]> {
      return this._http.get<Client[]>(environment.clientBaseUrl + '/client/lister/Nom/' + name);
    }

    addAndupdateClient(client: Client): Observable<Client> {
      return this._http.post<Client>(environment.clientBaseUrl + '/client/update', client);
    }

    deleteClient(id: number): Observable<Client> {
      return this._http.delete<Client>(environment.clientBaseUrl + '/client/supprimer/' + id);
    }

    selectClientById(id: number): Observable<Client> {
      return this._http.get<Client>(environment.clientBaseUrl + '/client/lister/' + id);
    }

    selectAllClient(): Observable<Client[]> {
      return this._http.get<Client[]>(environment.clientBaseUrl + '/client/lister');
    }
}
