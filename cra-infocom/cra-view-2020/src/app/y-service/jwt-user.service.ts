import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtUserService {

  constructor(private httpClient: HttpClient) { }

  public generateToken(request: any) {
    return this.httpClient.post<string>(environment.zuulBaseUrl + '/authentication/accueil/authenticate', request, {  responseType: 'text' as 'json' });
  }


  public welcome(token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>(environment.zuulBaseUrl + '/collaborator/collaborateurs/welcome', {headers, responseType: 'text' as 'json' });
  }
}
