import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/z-model/Client/client';
import { TypeClient } from 'src/app/z-model/Client/type-client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }

    /** TYPE */



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
  
    selectAllClient(): Observable<Client[]> {
      return this._http.get<Client[]>("http://localhost:8801/client/lister");
    } 
}
