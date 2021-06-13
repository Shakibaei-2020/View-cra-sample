import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtUserService {

  constructor(private httpClient:HttpClient) { }

  public generateToken(request : any) {
    return this.httpClient.post<string>("http://localhost:9003/authentication/accueil/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token : string) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:9003/collaborator/collaborateurs/welcome", {headers, responseType: 'text' as 'json' });
  }
}
