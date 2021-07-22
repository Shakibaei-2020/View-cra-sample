import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeClient } from 'src/app/z-model/Client/type-client';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeClientService {

  constructor(private _http: HttpClient) { }

  selectAllTypeClient(): Observable<TypeClient[]> {
    return this._http.get<TypeClient[]>(environment.clientBaseUrl + '/typeClient/lister/');

  }

  selectTypeClientById(id: number): Observable<TypeClient> {
    return this._http.get<TypeClient>(environment.clientBaseUrl + '/typeClient/lister/' + id);
  }
}
