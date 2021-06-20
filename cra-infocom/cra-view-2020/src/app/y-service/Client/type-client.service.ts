import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeClient } from 'src/app/z-model/Client/type-client';

@Injectable({
  providedIn: 'root'
})
export class TypeClientService {

  constructor(private _http: HttpClient) { }

  selectAllTypeClient(): Observable<TypeClient[]> {
    return this._http.get<TypeClient[]>("http://localhost:8801/typeClient/lister/");

  } 
  
  selectTypeClientById(id: number): Observable<TypeClient> {
    return this._http.get<TypeClient>("http://localhost:8801/typeClient/lister/" + id);
  }
}
